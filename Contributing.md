# Contributing to Boredom Busters

Thank you for your interest in contributing! This project aims to help children develop healthier habits through fun, engaging activities.

## 🎯 Ways to Contribute

### 🎨 New Activities
We're always looking for new 60-second activities that are:
- **Age-appropriate** for children 6-12
- **Safe** to do indoors/outdoors
- **Engaging** and fun
- **Quick** to understand and execute
- **Accessible** with minimal materials

### 📱 Technical Improvements
- Bug fixes
- Performance optimizations
- Mobile responsiveness
- Accessibility improvements
- New features

### 🔬 Research & Data
- Analytics improvements
- A/B testing implementations
- Privacy enhancements
- Effectiveness studies

### 🌍 Internationalization
- Translations
- Cultural adaptations
- Local activity suggestions

## 🚀 Getting Started

### Prerequisites
- Basic knowledge of HTML, CSS, JavaScript
- Understanding of child development principles
- Familiarity with privacy requirements for children's apps

### Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/boredom-busters.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make changes
5. Test locally by opening `index.html` in your browser
6. Commit and push changes
7. Create a Pull Request

## 📝 Adding New Activities

### Activity Guidelines
Each activity should:
- Be completable in 60 seconds
- Require minimal setup/materials
- Be safe for children
- Have clear, simple instructions
- Fit into one of our three categories:

#### 🏃‍♀️ Move It! (Physical Activities)
- Get kids moving and active
- Help burn excess energy
- Improve physical coordination
- Examples: dancing, jumping, stretching

#### 🎨 Create It! (Creative Activities)
- Encourage creativity and imagination
- Develop fine motor skills
- Foster self-expression
- Examples: drawing, building, storytelling

#### 🧘‍♀️ Calm It! (Mindfulness Activities)
- Promote emotional regulation
- Teach mindfulness techniques
- Help with relaxation
- Examples: breathing exercises, sensory activities

### Adding an Activity

1. **Choose the right category** based on the guidelines above

2. **Write clear instructions** that a 6-year-old could understand:
   ```javascript
   // Good example:
   "Take three deep breaths. Make your belly go up and down like a balloon."
   
   // Avoid:
   "Practice diaphragmatic breathing techniques for optimal oxygenation."
   ```

3. **Test with kids** if possible - does it work? Is it fun?

4. **Add to the activities object** in `index.html`:
   ```javascript
   "Calm It!": [
       // ... existing activities
       "Your new activity instruction here!"
   ]
   ```

5. **Update the README** if needed

## 🔒 Child Safety & Privacy

### Safety Requirements
- No activities involving potentially dangerous objects
- No activities requiring children to go outside alone
- No activities that could cause injury if done incorrectly
- Consider noise levels (apartment-friendly options)

### Privacy Requirements
- No collection of personally identifiable information
- Anonymous user IDs only
- COPPA compliance for users under 13
- Transparent data practices

## 🧪 Testing Guidelines

### Manual Testing Checklist
- [ ] Works on mobile devices (iOS Safari, Android Chrome)
- [ ] Works on desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Accessible with keyboard navigation
- [ ] Readable with screen readers
- [ ] Timer functions correctly
- [ ] Data persists in localStorage
- [ ] All buttons and interactions work
- [ ] Text is legible and age-appropriate

### Activity Testing
- [ ] Instructions are clear to children
- [ ] Activity can be completed in 60 seconds
- [ ] Activity is engaging and fun
- [ ] Required materials are common/optional
- [ ] Activity is safe when unsupervised

## 📊 Analytics & Research Ethics

### Data Collection Principles
- **Minimal data collection** - only what's necessary for effectiveness measurement
- **Anonymous by default** - no personal information
- **Transparent** - users understand what data is collected
- **Secure** - data transmission and storage follow best practices
- **Research-ready** - structured for academic analysis

### Adding Analytics Events
When adding new features, consider what data might be useful for research:

```javascript
// Good analytics events:
trackEvent('activity_started', { 
    category: 'Move It!', 
    timeOfDay: 'afternoon' 
});

// Avoid collecting:
trackEvent('user_identified', { 
    name: 'John', 
    school: 'Elementary School' 
}); // NO - too personal
```

## 🎨 Design Guidelines

### Visual Design
- **Child-friendly** - bright, welcoming colors
- **Clear hierarchy** - obvious what to do next
- **Large touch targets** - easy for small fingers
- **Consistent branding** - follows HealthQuest style guide

### UX Principles
- **Simple navigation** - minimal cognitive load
- **Immediate feedback** - kids know their actions worked
- **Failure-friendly** - no "wrong" answers
- **Encouraging tone** - positive, supportive language

### Color Palette
- Primary: Teal (#26D0CE)
- Secondary: Green (#4CAF50)
- Accent: Blue (#1A73E8)
- Success: Light Green (#8BC34A)
- Warning: Orange (#FF9800)

## 🔄 Pull Request Process

### Before Submitting
1. **Test thoroughly** on multiple devices
2. **Check accessibility** with keyboard and screen reader
3. **Verify child-safety** of any new activities
4. **Update documentation** if needed
5. **Run any existing tests**

### PR Description Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New activity
- [ ] Bug fix
- [ ] Feature enhancement
- [ ] Documentation update

## Testing
- [ ] Tested on mobile
- [ ] Tested on desktop
- [ ] Verified accessibility
- [ ] Child-tested (if applicable)

## Child Safety Review
- [ ] No dangerous materials required
- [ ] Age-appropriate content
- [ ] Clear, simple instructions
```

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Academic papers (if applicable)
- Conference presentations

## ❓ Questions?

- **General questions**: Open a [GitHub Discussion](https://github.com/yourusername/boredom-busters/discussions)
- **Bug reports**: Create an [Issue](https://github.com/yourusername/boredom-busters/issues)
- **Feature requests**: Start with a Discussion to gauge interest
- **Direct contact**: your-email@example.com

## 📜 Code of Conduct

This project is committed to providing a welcoming environment for all contributors. We prioritize:

- **Child safety** above all else
- **Respectful communication** in all interactions
- **Evidence-based decisions** when possible
- **Inclusive design** considering diverse abilities and backgrounds
- **Privacy protection** especially for children

Thank you for helping make the internet a healthier place for kids! 🌟
