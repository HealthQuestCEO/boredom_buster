/**
 * Boredom Busters Embeddable Widget
 * 
 * Usage:
 * <script src="https://yourusername.github.io/boredom-busters/widget.js"></script>
 * <div id="boredom-busters" data-api-key="your_site_key"></div>
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        apiEndpoint: 'https://your-api.com/api/boredom-busters',
        version: '1.0.0',
        cdnBase: 'https://yourusername.github.io/boredom-busters'
    };

    // Only run once
    if (window.BoredomBustersWidget) {
        return;
    }

    class BoredomBustersWidget {
        constructor(container, options = {}) {
            this.container = container;
            this.apiKey = options.apiKey || container.dataset.apiKey || 'demo';
            this.userId = this.generateUserId();
            this.currentScreen = 'spin';
            this.selectedActivity = null;
            this.timeLeft = 60;
            this.isTimerActive = false;
            this.streak = 0;
            this.lumoCoins = 0;
            this.isSpinning = false;

            this.activities = {
                "Move It!": [
                    "Turn up your favorite song and dance like no one is watching!",
                    "Waddle like a penguin, hop like a bunny, and crawl like a bear across the room.",
                    "Strike three different superhero poses, holding each for 20 seconds!",
                    "Do as many jumping jacks as you can until the timer runs out.",
                    "Blow up a balloon and try to keep it from touching the ground.",
                    "Jump rope with an imaginary rope for one whole minute!"
                ],
                "Create It!": [
                    "Draw a funny picture of Lumo. Only 60 seconds to get it done!",
                    "Grab a piece of paper and write down the first three sentences of a crazy story.",
                    "Fold a paper airplane and give it a test flight.",
                    "Make three different funny faces in a mirror.",
                    "Build the tallest tower you can with blocks, Legos, or any objects you can find.",
                    "Create a work of art on the fridge with magnetic letters and numbers."
                ],
                "Calm It!": [
                    "Imagine your belly is a balloon. Breathe in slowly to make it bigger, and breathe out slowly to make it smaller.",
                    "Name one thing you can see, hear, smell, feel, and taste right now.",
                    "Trace a simple maze on a piece of paper or on your screen with your finger, focusing only on the lines.",
                    "Stand by a window. Quietly look at three things you see and listen for three things you hear.",
                    "Take a small sip of water. Really focus on how it feels in your mouth and as you swallow it.",
                    "Close your eyes and hum a gentle, quiet tune for the whole minute."
                ]
            };

            this.init();
        }

        generateUserId() {
            let userId = localStorage.getItem('bb_widget_user_id');
            if (!userId) {
                userId = 'widget_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('bb_widget_user_id', userId);
            }
            return userId;
        }

        init() {
            this.loadStyles();
            this.loadUserData();
            this.render();
        }

        loadStyles() {
            if (document.getElementById('boredom-busters-styles')) return;

            const styles = `
                <style id="boredom-busters-styles">
                .bb-widget {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    max-width: 400px;
                    margin: 0 auto;
                    background: linear-gradient(135deg, #e0f2f7 0%, #b3e5fc 50%, #81c784 100%);
                    border-radius: 20px;
                    padding: 20px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                    text-align: center;
                }
                
                .bb-spinner {
                    width: 120px;
                    height: 120px;
                    border: 6px solid #ddd;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px auto;
                    background: white;
                    transition: transform 2s ease-in-out;
                }
                
                .bb-spinner.spinning {
                    animation: bb-spin 2s linear infinite;
                }
                
                @keyframes bb-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                
                .bb-button {
                    background: linear-gradient(45deg, #26d0ce, #1a73e8);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin: 10px 5px;
                }
                
                .bb-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                }
                
                .bb-button:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .bb-activity-card {
                    background: white;
                    border-radius: 15px;
                    padding: 20px;
                    margin: 15px 0;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
                }
                
                .bb-timer {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #26d0ce, #1a73e8);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 20px auto;
                    position: relative;
                }
                
                .bb-timer-inner {
                    width: 70px;
                    height: 70px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    font-weight: bold;
                }
                
                .bb-progress {
                    width: 100%;
                    height: 8px;
                    background: #ddd;
                    border-radius: 4px;
                    margin: 15px 0;
                    overflow: hidden;
                }
                
                .bb-progress-bar {
                    height: 100%;
                    background: linear-gradient(45deg, #4caf50, #8bc34a);
                    border-radius: 4px;
                    transition: width 1s ease;
                }
                
                .bb-emoji-button {
                    font-size: 32px;
                    background: none;
                    border: none;
                    padding: 10px;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.2s;
                    margin: 0 5px;
                }
                
                .bb-emoji-button:hover {
                    background: #f0f0f0;
                    transform: scale(1.1);
                }
                
                .bb-emoji-button.selected {
                    background: #fff3cd;
                    transform: scale(1.2);
                }
                
                .bb-stats {
                    display: flex;
                    justify-content: space-around;
                    margin: 20px 0;
                }
                
                .bb-stat {
                    text-align: center;
                }
                
                .bb-stat-icon {
                    font-size: 20px;
                    margin-bottom: 5px;
                }
                
                .bb-stat-label {
                    font-size: 12px;
                    color: #666;
                }
                
                .bb-category-move { background: linear-gradient(45deg, #ff9800, #f44336); }
                .bb-category-create { background: linear-gradient(45deg, #9c27b0, #e91e63); }
                .bb-category-calm { background: linear-gradient(45deg, #2196f3, #00bcd4); }
                
                .bb-lumo {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(45deg, #4caf50, #8bc34a);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 15px;
                    font-size: 30px;
                }
                
                .bb-lumo.excited {
                    animation: bb-bounce 0.6s infinite alternate;
                }
                
                @keyframes bb-bounce {
                    to { transform: translateY(-10px); }
                }
                </style>
            `;
            
            document.head.insertAdjacentHTML('beforeend', styles);
        }

        loadUserData() {
            const savedStreak = localStorage.getItem(`bb_streak_${this.userId}`);
            const savedCoins = localStorage.getItem(`bb_coins_${this.userId}`);
            
            if (savedStreak) this.streak = parseInt(savedStreak);
            if (savedCoins) this.lumoCoins = parseInt(savedCoins);
        }

        saveUserData() {
            localStorage.setItem(`bb_streak_${this.userId}`, this.streak.toString());
            localStorage.setItem(`bb_coins_${this.userId}`, this.lumoCoins.toString());
        }

        async trackEvent(eventType, data = {}) {
            const eventData = {
                userId: this.userId,
                apiKey: this.apiKey,
                eventType: eventType,
                timestamp: new Date().toISOString(),
                website: window.location.hostname,
                widget: true,
                ...data
            };

            try {
                await fetch(`${CONFIG.apiEndpoint}/events`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': this.apiKey
                    },
                    body: JSON.stringify(eventData)
                });
            } catch (error) {
                console.log('Analytics tracking failed:', error);
            }

            // Also store locally
            const localEvents = JSON.parse(localStorage.getItem('bb_widget_events') || '[]');
            localEvents.push(eventData);
            localStorage.setItem('bb_widget_events', JSON.stringify(localEvents.slice(-50)));
        }

        spinForActivity() {
            this.isSpinning = true;
            this.trackEvent('spin');
            this.render();
            
            setTimeout(() => {
                const categories = Object.keys(this.activities);
                const randomCategory = categories[Math.floor(Math.random() * categories.length)];
                const categoryActivities = this.activities[randomCategory];
                const randomActivity = categoryActivities[Math.floor(Math.random() * categoryActivities.length)];
                
                this.selectedActivity = {
                    category: randomCategory,
                    description: randomActivity
                };
                
                this.isSpinning = false;
                this.currentScreen = 'activity';
                this.timeLeft = 60;
                this.render();

                this.trackEvent('activity_selected', {
                    category: randomCategory,
                    activity: randomActivity.split('.')[0]
                });
            }, 2000);
        }

        startTimer() {
            this.isTimerActive = true;
            this.trackEvent('timer_started');
            this.render();

            const interval = setInterval(() => {
                this.timeLeft--;
                this.render();

                if (this.timeLeft <= 0) {
                    clearInterval(interval);
                    this.isTimerActive = false;
                    this.currentScreen = 'reflection';
                    this.render();
                }
            }, 1000);
        }

        handleReflection(feeling, stillWantSnack) {
            this.trackEvent('completion', {
                category: this.selectedActivity.category,
                activity: this.selectedActivity.description.split('.')[0],
                feeling: feeling,
                stillWantSnack: stillWantSnack
            });

            if (feeling === '😃' && !stillWantSnack) {
                this.streak++;
                this.lumoCoins += 10;
                this.trackEvent('successful_redirection', {
                    newStreak: this.streak,
                    newCoins: this.lumoCoins
                });
            }
            
            this.saveUserData();
            this.currentScreen = 'reward';
            this.render();
        }

        resetToSpin() {
            this.currentScreen = 'spin';
            this.selectedActivity = null;
            this.timeLeft = 60;
            this.isTimerActive = false;
            this.render();
        }

        renderSpinScreen() {
            return `
                <div class="bb-lumo">🐉</div>
                <h1 style="margin: 15px 0; font-size: 24px; color: #333;">Boredom Busters</h1>
                <p style="margin: 15px 0; color: #666;">Need a quick dopamine hit?</p>
                
                <div class="bb-spinner ${this.isSpinning ? 'spinning' : ''}">
                    ${this.isSpinning ? 
                        '<div>🎯<br><small>Spinning...</small></div>' : 
                        '<div>🎲<br><small>Ready!</small></div>'
                    }
                </div>
                
                <button class="bb-button" onclick="window.bbWidget.spinForActivity()" ${this.isSpinning ? 'disabled' : ''}>
                    ${this.isSpinning ? 'Spinning...' : 'Spin for Activity! 🎯'}
                </button>
                
                <div class="bb-stats">
                    <div class="bb-stat">
                        <div class="bb-stat-icon">🔥</div>
                        <div class="bb-stat-label">Streak: ${this.streak}</div>
                    </div>
                    <div class="bb-stat">
                        <div class="bb-stat-icon">🪙</div>
                        <div class="bb-stat-label">Coins: ${this.lumoCoins}</div>
                    </div>
                </div>
            `;
        }

        renderActivityScreen() {
            const categoryClass = this.selectedActivity.category === "Move It!" ? 'bb-category-move' :
                                 this.selectedActivity.category === "Create It!" ? 'bb-category-create' : 'bb-category-calm';
            
            return `
                <div class="bb-lumo excited">🐉</div>
                
                <div class="${categoryClass}" style="display: inline-block; padding: 8px 16px; border-radius: 20px; color: white; font-weight: bold; margin-bottom: 15px;">
                    ${this.selectedActivity.category}
                </div>
                
                <div class="bb-activity-card">
                    <p style="font-size: 16px; line-height: 1.4; margin: 0;">${this.selectedActivity.description}</p>
                </div>
                
                <div class="bb-timer">
                    <div class="bb-timer-inner">${this.timeLeft}</div>
                </div>
                
                <div class="bb-progress">
                    <div class="bb-progress-bar" style="width: ${((60 - this.timeLeft) / 60) * 100}%"></div>
                </div>
                
                ${!this.isTimerActive ? 
                    '<button class="bb-button" onclick="window.bbWidget.startTimer()">Start Challenge! 🚀</button>' :
                    '<p style="color: #666;">You\'ve got this! Keep going! 💪</p><div style="font-size: 24px;">🎉</div>'
                }
            `;
        }

        renderReflectionScreen() {
            return `
                <div class="bb-lumo">🐉</div>
                <h2 style="margin: 15px 0; color: #333;">Awesome job! 🎉</h2>
                
                <div class="bb-activity-card">
                    <h3 style="margin-bottom: 15px;">How do you feel now?</h3>
                    <div>
                        <button class="bb-emoji-button" onclick="window.bbWidget.setFeeling('😐')">😐</button>
                        <button class="bb-emoji-button" onclick="window.bbWidget.setFeeling('😊')">😊</button>
                        <button class="bb-emoji-button" onclick="window.bbWidget.setFeeling('😃')">😃</button>
                    </div>
                </div>
                
                <div class="bb-activity-card">
                    <h3 style="margin-bottom: 15px;">Still want the snack?</h3>
                    <div>
                        <button class="bb-button" onclick="window.bbWidget.setSnackCraving(true)" style="background: linear-gradient(45deg, #f44336, #e91e63); margin: 5px;">Yes</button>
                        <button class="bb-button" onclick="window.bbWidget.setSnackCraving(false)" style="background: linear-gradient(45deg, #4caf50, #8bc34a); margin: 5px;">No</button>
                    </div>
                </div>
                
                <div id="bb-reflection-continue" style="display: none;">
                    <button class="bb-button" onclick="window.bbWidget.submitReflection()">Continue 🌟</button>
                </div>
            `;
        }

        renderRewardScreen() {
            return `
                <div class="bb-
