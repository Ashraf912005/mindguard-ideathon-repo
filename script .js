// MindGuard Interactive JavaScript - Based on PPT Solution

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// AI Buddy Simulation - Core feature from PPT
class AIBuddy {
    constructor() {
        this.interventionMessages = [
            "Want a quick reset? You've been scrolling for 15 minutes!",
            "Time for a brain boost! Ready for a 2-minute challenge?",
            "Hey there! How about a mindful moment?",
            "Your focus streak is at risk. Want to protect it?",
            "Brain rot detected! Let's turn this into brain growth 🧠"
        ];
        this.currentMessage = 0;
        this.isActive = false;
        this.scrollTime = 0;
        this.interventionThreshold = 10; // seconds
        this.init();
    }

    init() {
        this.createBuddyInterface();
        this.startScrollTracking();
        this.setupInterventionDemo();
    }

    createBuddyInterface() {
        const buddyContainer = document.createElement('div');
        buddyContainer.className = 'ai-buddy-widget';
        buddyContainer.innerHTML = `
            <div class="buddy-avatar-widget">🤖</div>
            <div class="buddy-notification" id="buddyNotification">
                <div class="notification-content">
                    <h4>MindGuard AI</h4>
                    <p id="buddyMessage">Ready to help you grow! 🌱</p>
                    <div class="notification-actions">
                        <button class="btn-small primary" onclick="aiBuddy.acceptIntervention()">Let's go!</button>
                        <button class="btn-small secondary" onclick="aiBuddy.dismissIntervention()">Later</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(buddyContainer);
    }

    startScrollTracking() {
        let scrollTimer = null;
        let isScrolling = false;

        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                isScrolling = true;
                this.scrollTime = Date.now();
            }

            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                isScrolling = false;
                const scrollDuration = (Date.now() - this.scrollTime) / 1000;
                
                // Simulate intervention trigger after threshold
                if (scrollDuration > this.interventionThreshold && !this.isActive) {
                    this.triggerIntervention();
                }
            }, 1000);
        });
    }

    triggerIntervention() {
        this.isActive = true;
        const notification = document.getElementById('buddyNotification');
        const message = document.getElementById('buddyMessage');
        
        message.textContent = this.interventionMessages[this.currentMessage];
        notification.classList.add('show');
        
        // Cycle through messages
        this.currentMessage = (this.currentMessage + 1) % this.interventionMessages.length;
        
        // Auto-dismiss after 10 seconds if no interaction
        setTimeout(() => {
            if (this.isActive) {
                this.dismissIntervention();
            }
        }, 10000);
    }

    acceptIntervention() {
        this.isActive = false;
        const notification = document.getElementById('buddyNotification');
        notification.classList.remove('show');
        
        // Show positive feedback
        this.showPositiveFeedback();
        
        // Trigger healthy content replacement
        this.showHealthyContent();
    }

    dismissIntervention() {
        this.isActive = false;
        const notification = document.getElementById('buddyNotification');
        notification.classList.remove('show');
    }

    showPositiveFeedback() {
        const feedback = document.createElement('div');
        feedback.className = 'positive-feedback';
        feedback.innerHTML = `
            <div class="feedback-content">
                <span class="feedback-icon">🎉</span>
                <p>Great choice! +10 XP</p>
            </div>
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => {
            feedback.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            feedback.remove();
        }, 3000);
    }

    showHealthyContent() {
        const healthyContentModal = document.createElement('div');
        healthyContentModal.className = 'healthy-content-modal';
        healthyContentModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🧠 Brain Growth Time!</h3>
                    <button class="close-modal" onclick="this.closest('.healthy-content-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="content-tabs">
                        <button class="tab-btn active" onclick="aiBuddy.switchTab(this, 'tips')">💡 Quick Tips</button>
                        <button class="tab-btn" onclick="aiBuddy.switchTab(this, 'challenge')">🎯 Challenge</button>
                        <button class="tab-btn" onclick="aiBuddy.switchTab(this, 'mindful')">🧘 Mindful Break</button>
                    </div>
                    <div class="tab-content">
                        <div class="tab-pane active" id="tips">
                            <h4>💡 Did You Know?</h4>
                            <p>Taking regular breaks increases productivity by 23% and improves creative thinking!</p>
                            <div class="tip-action">
                                <button class="btn-small primary">Learn More</button>
                            </div>
                        </div>
                        <div class="tab-pane" id="challenge">
                            <h4>🎯 2-Minute Challenge</h4>
                            <p>Quick Desk Yoga: Stretch your neck, shoulders, and wrists</p>
                            <div class="challenge-timer">
                                <div class="timer-display">2:00</div>
                                <button class="btn-small primary" onclick="aiBuddy.startTimer()">Start Challenge</button>
                            </div>
                        </div>
                        <div class="tab-pane" id="mindful">
                            <h4>🧘 Mindful Breathing</h4>
                            <p>Take 5 deep breaths and center yourself</p>
                            <div class="breathing-guide">
                                <div class="breath-circle"></div>
                                <p class="breath-instruction">Click to start breathing exercise</p>
                                <button class="btn-small primary" onclick="aiBuddy.startBreathing()">Begin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(healthyContentModal);
        setTimeout(() => healthyContentModal.classList.add('show'), 100);
    }

    switchTab(button, tabName) {
        // Remove active class from all tabs and buttons
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    }

    startTimer() {
        let timeLeft = 120; // 2 minutes
        const display = document.querySelector('.timer-display');
        const button = document.querySelector('#challenge button');
        
        button.textContent = 'In Progress...';
        button.disabled = true;
        
        const timer = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            display.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                display.textContent = 'Complete! 🎉';
                button.textContent = 'Challenge Complete';
                this.updateStats('challenge');
            }
            timeLeft--;
        }, 1000);
    }

    startBreathing() {
        const circle = document.querySelector('.breath-circle');
        const instruction = document.querySelector('.breath-instruction');
        const button = document.querySelector('#mindful button');
        
        let breathCount = 0;
        const maxBreaths = 5;
        
        button.style.display = 'none';
        
        const breathCycle = () => {
            if (breathCount >= maxBreaths) {
                instruction.textContent = 'Great job! Feeling more centered? 😌';
                this.updateStats('mindful');
                return;
            }
            
            // Inhale
            instruction.textContent = 'Breathe in... 👃';
            circle.classList.add('expand');
            
            setTimeout(() => {
                // Exhale
                instruction.textContent = 'Breathe out... 😤';
                circle.classList.remove('expand');
                
                setTimeout(() => {
                    breathCount++;
                    if (breathCount < maxBreaths) {
                        breathCycle();
                    } else {
                        instruction.textContent = 'Perfect! You completed 5 mindful breaths 🌟';
                        this.updateStats('mindful');
                    }
                }, 2000);
            }, 3000);
        };
        
        breathCycle();
    }

    updateStats(activity) {
        // Simulate XP and streak updates
        const xpGain = activity === 'challenge' ? 25 : 15;
        this.showXPGain(xpGain);
        this.updateStreak();
    }

    showXPGain(xp) {
        const xpNotification = document.createElement('div');
        xpNotification.className = 'xp-notification';
        xpNotification.innerHTML = `+${xp} XP! 🌟`;
        
        document.body.appendChild(xpNotification);
        setTimeout(() => xpNotification.classList.add('show'), 100);
        setTimeout(() => xpNotification.remove(), 2000);
    }

    updateStreak() {
        // Find and update streak display if exists
        const streakElements = document.querySelectorAll('.stat-number');
        streakElements.forEach(el => {
            if (el.nextElementSibling && el.nextElementSibling.textContent.includes('Streak')) {
                const currentStreak = parseInt(el.textContent) || 0;
                el.textContent = currentStreak + 1;
            }
        });
    }

    setupInterventionDemo() {
        // Auto-trigger demo intervention after 30 seconds on page
        setTimeout(() => {
            if (!this.isActive) {
                this.triggerIntervention();
            }
        }, 30000);
    }
}

// Gamification System - From PPT Features
class GamificationEngine {
    constructor() {
        this.userStats = {
            level: 5,
            xp: 1250,
            streak: 7,
            challenges: 12,
            badges: ['🏆', '⚡', '🎯']
        };
        this.init();
    }

    init() {
        this.updateProgressRings();
        this.animateBadges();
        this.setupChallengeSystem();
    }

    updateProgressRings() {
        const progressRings = document.querySelectorAll('.progress-ring');
        progressRings.forEach(ring => {
            const fill = ring.querySelector('.ring-fill');
            if (fill) {
                // Animate ring fill based on current progress
                const progress = (this.userStats.xp % 1000) / 1000 * 100;
                setTimeout(() => {
                    fill.style.strokeDashoffset = `${100 - progress}`;
                }, 500);
            }
        });
    }

    animateBadges() {
        const badges = document.querySelectorAll('.badge.earned');
        badges.forEach((badge, index) => {
            setTimeout(() => {
                badge.classList.add('pulse');
                setTimeout(() => badge.classList.remove('pulse'), 600);
            }, index * 200);
        });
    }

    setupChallengeSystem() {
        this.createCommunityChallenge();
    }

    createCommunityChallenge() {
        const challengeWidget = document.createElement('div');
        challengeWidget.className = 'community-challenge-widget';
        challengeWidget.innerHTML = `
            <div class="challenge-header">
                <h4>🎯 Active Challenge</h4>
                <span class="challenge-time">23h left</span>
            </div>
            <div class="challenge-content">
                <h5>30-Day No Brain Rot</h5>
                <div class="challenge-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: 23%"></div>
                    </div>
                    <span class="progress-text">Day 7/30</span>
                </div>
                <div class="participant-info">
                    <span>👥 124 participants</span>
                    <span>🔥 Your streak: 7 days</span>
                </div>
            </div>
        `;
        
        // Add to body with delay for better UX
        setTimeout(() => {
            document.body.appendChild(challengeWidget);
            setTimeout(() => challengeWidget.classList.add('show'), 100);
        }, 5000);
    }
}

// Healthy Content Feed System
class HealthyContentFeed {
    constructor() {
        this.contentPool = [
            {
                type: 'tip',
                icon: '💡',
                title: 'Productivity Boost',
                content: 'The Pomodoro Technique: Work for 25 minutes, then take a 5-minute break. This increases focus by 40%!',
                category: 'Brain Boost'
            },
            {
                type: 'challenge',
                icon: '🎯',
                title: 'Quick Exercise',
                content: 'Do 10 jumping jacks right now! Physical activity increases cognitive function for up to 2 hours.',
                category: 'Health Challenge'
            },
            {
                type: 'mindful',
                icon: '🧘',
                title: 'Mindful Moment',
                content: 'Notice 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.',
                category: 'Mindfulness'
            },
            {
                type: 'learning',
                icon: '📚',
                title: 'Quick Learn',
                content: 'Fun fact: Your brain uses 20% of your body\'s energy despite being only 2% of your body weight!',
                category: 'Knowledge'
            }
        ];
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.createFeedContainer();
        this.populateFeed();
        this.setupAutoRefresh();
    }

    createFeedContainer() {
        const existingFeed = document.querySelector('.healthy-scroll-feed');
        if (existingFeed) return;

        const feedContainer = document.createElement('div');
        feedContainer.className = 'healthy-scroll-feed';
        feedContainer.innerHTML = `
            <div class="feed-header">
                <h4>🌱 Healthy Feed</h4>
                <button class="refresh-btn" onclick="healthyFeed.refreshFeed()">🔄</button>
            </div>
            <div class="feed-content" id="healthyFeedContent">
                <!-- Content will be populated here -->
            </div>
        `;
        
        document.body.appendChild(feedContainer);
    }

    populateFeed() {
        const feedContent = document.getElementById('healthyFeedContent');
        if (!feedContent) return;

        feedContent.innerHTML = '';
        
        // Show 3 random pieces of content
        const randomContent = this.getRandomContent(3);
        
        randomContent.forEach((item, index) => {
            const contentCard = document.createElement('div');
            contentCard.className = 'feed-card';
            contentCard.innerHTML = `
                <div class="card-header">
                    <span class="card-icon">${item.icon}</span>
                    <div class="card-meta">
                        <span class="card-category">${item.category}</span>
                        <span class="card-time">Just now</span>
                    </div>
                </div>
                <h5 class="card-title">${item.title}</h5>
                <p class="card-content">${item.content}</p>
                <div class="card-actions">
                    <button class="action-btn like" onclick="this.classList.toggle('active')">👍</button>
                    <button class="action-btn share">📤</button>
                    <button class="action-btn save">🔖</button>
                </div>
            `;
            
            feedContent.appendChild(contentCard);
            
            // Animate card appearance
            setTimeout(() => {
                contentCard.classList.add('show');
            }, index * 200);
        });
    }

    getRandomContent(count) {
        const shuffled = [...this.contentPool].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    refreshFeed() {
        const feedContent = document.getElementById('healthyFeedContent');
        const refreshBtn = document.querySelector('.refresh-btn');
        
        refreshBtn.classList.add('spinning');
        feedContent.classList.add('fade-out');
        
        setTimeout(() => {
            this.populateFeed();
            feedContent.classList.remove('fade-out');
            refreshBtn.classList.remove('spinning');
        }, 500);
    }

    setupAutoRefresh() {
        // Auto-refresh every 5 minutes
        setInterval(() => {
            this.refreshFeed();
        }, 300000);
    }
}

// Smart Break System
class SmartBreakSystem {
    constructor() {
        this.breakTypes = [
            { name: 'Eye Rest', duration: 30, instruction: 'Look at something 20 feet away for 30 seconds' },
            { name: 'Stretch Break', duration: 60, instruction: 'Stand up and stretch your arms and back' },
            { name: 'Hydration', duration: 15, instruction: 'Drink a glass of water' },
            { name: 'Deep Breathing', duration: 45, instruction: '5 deep breaths to reset your mind' }
        ];
        this.breakInterval = 25 * 60 * 1000; // 25 minutes
        this.init();
    }

    init() {
        this.startBreakTimer();
    }

    startBreakTimer() {
        setTimeout(() => {
            this.suggestBreak();
            this.startBreakTimer(); // Recursive call for continuous breaks
        }, this.breakInterval);
    }

    suggestBreak() {
        const randomBreak = this.breakTypes[Math.floor(Math.random() * this.breakTypes.length)];
        
        const breakNotification = document.createElement('div');
        breakNotification.className = 'smart-break-notification';
        breakNotification.innerHTML = `
            <div class="break-content">
                <div class="break-icon">⏰</div>
                <h4>Smart Break Time!</h4>
                <p><strong>${randomBreak.name}</strong></p>
                <p>${randomBreak.instruction}</p>
                <div class="break-timer-display">${randomBreak.duration}s</div>
                <div class="break-actions">
                    <button class="btn-small primary" onclick="smartBreaks.startBreak(${randomBreak.duration}, this.closest('.smart-break-notification'))">Start Break</button>
                    <button class="btn-small secondary" onclick="smartBreaks.skipBreak(this.closest('.smart-break-notification'))">Skip (5 min)</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(breakNotification);
        setTimeout(() => breakNotification.classList.add('show'), 100);
    }

    startBreak(duration, notification) {
        const timer = notification.querySelector('.break-timer-display');
        const actions = notification.querySelector('.break-actions');
        
        actions.innerHTML = '<button class="btn-small secondary" onclick="smartBreaks.skipBreak(this.closest(\'.smart-break-notification\'))">Skip</button>';
        
        let timeLeft = duration;
        const countdown = setInterval(() => {
            timer.textContent = `${timeLeft}s`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                timer.textContent = 'Complete! 🎉';
                actions.innerHTML = '<button class="btn-small primary" onclick="smartBreaks.completeBreak(this.closest(\'.smart-break-notification\'))">Done</button>';
            }
            timeLeft--;
        }, 1000);
    }

    completeBreak(notification) {
        notification.classList.add('completed');
        setTimeout(() => notification.remove(), 2000);
        
        // Show completion feedback
        aiBuddy.showXPGain(10);
    }

    skipBreak(notification) {
        notification.remove();
        // Shorter interval for next break suggestion
        setTimeout(() => this.suggestBreak(), 5 * 60 * 1000);
    }
}

// Progress Tracking and Analytics
class ProgressTracker {
    constructor() {
        this.dailyStats = {
            screenTimeReduced: 0,
            challengesCompleted: 0,
            breakssTaken: 0,
            mindfulMoments: 0
        };
        this.init();
    }

    init() {
        this.createProgressDashboard();
        this.updateDashboard();
    }

    createProgressDashboard() {
        const dashboard = document.createElement('div');
        dashboard.className = 'progress-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h4>📊 Today's Progress</h4>
                <button class="dashboard-toggle" onclick="this.closest('.progress-dashboard').classList.toggle('minimized')">−</button>
            </div>
            <div class="dashboard-content">
                <div class="progress-stat">
                    <span class="stat-icon">⏱️</span>
                    <div class="stat-info">
                        <span class="stat-value" id="screenTimeReduced">0 min</span>
                        <span class="stat-label">Screen time reduced</span>
                    </div>
                </div>
                <div class="progress-stat">
                    <span class="stat-icon">🎯</span>
                    <div class="stat-info">
                        <span class="stat-value" id="challengesCompleted">0</span>
                        <span class="stat-label">Challenges completed</span>
                    </div>
                </div>
                <div class="progress-stat">
                    <span class="stat-icon">☕</span>
                    <div class="stat-info">
                        <span class="stat-value" id="breaksTaken">0</span>
                        <span class="stat-label">Smart breaks taken</span>
                    </div>
                </div>
                <div class="progress-stat">
                    <span class="stat-icon">🧘</span>
                    <div class="stat-info">
                        <span class="stat-value" id="mindfulMoments">0</span>
                        <span class="stat-label">Mindful moments</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(dashboard);
        
        // Show dashboard after delay
        setTimeout(() => dashboard.classList.add('show'), 10000);
    }

    updateDashboard() {
        document.getElementById('screenTimeReduced').textContent = `${this.dailyStats.screenTimeReduced} min`;
        document.getElementById('challengesCompleted').textContent = this.dailyStats.challengesCompleted;
        document.getElementById('breaksTaken').textContent = this.dailyStats.breakssTaken;
        document.getElementById('mindfulMoments').textContent = this.dailyStats.mindfulMoments;
    }

    incrementStat(statName, value = 1) {
        if (this.dailyStats.hasOwnProperty(statName)) {
            this.dailyStats[statName] += value;
            this.updateDashboard();
        }
    }
}

// Initialize all systems when page loads
let aiBuddy, gamificationEngine, healthyFeed, smartBreaks, progressTracker;

document.addEventListener('DOMContentLoaded', function() {
    // Initialize core systems from PPT
    aiBuddy = new AIBuddy();
    gamificationEngine = new GamificationEngine();
    healthyFeed = new HealthyContentFeed();
    smartBreaks = new SmartBreakSystem();
    progressTracker = new ProgressTracker();
    
    // Demo interactions for showcasing features
    setupDemoInteractions();
    
    // Scroll animations for better UX
    setupScrollAnimations();
});

function setupDemoInteractions() {
    // CTA button interactions
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Early Access')) {
                e.preventDefault();
                showEarlyAccessModal();
            } else if (this.textContent.includes('Demo')) {
                e.preventDefault();
                startInteractiveDemo();
            }
        });
    });
}

function showEarlyAccessModal() {
    const modal = document.createElement('div');
    modal.className = 'early-access-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🚀 Get Early Access to MindGuard</h3>
                    <button class="close-modal" onclick="this.closest('.early-access-modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <p>Join thousands of users transforming their digital habits!</p>
                    <div class="access-form">
                        <input type="email" placeholder="Enter your email" class="form-input">
                        <button class="btn btn-primary">Request Access</button>
                    </div>
                    <div class="access-benefits">
                        <div class="benefit">✅ Free beta access</div>
                        <div class="benefit">✅ Exclusive features</div>
                        <div class="benefit">✅ Priority support</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 100);
}

function startInteractiveDemo() {
    // Trigger AI buddy intervention immediately
    aiBuddy.triggerIntervention();
    
    // Show demo tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'demo-tooltip';
    tooltip.innerHTML = `
        <div class="tooltip-content">
            <h4>🎯 Interactive Demo Started!</h4>
            <p>Watch how MindGuard intervenes in real-time to transform your digital habits.</p>
        </div>
    `;
    
    document.body.appendChild(tooltip);
    setTimeout(() => tooltip.classList.add('show'), 100);
    setTimeout(() => tooltip.remove(), 5000);
}

function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.problem-card, .feature-card, .business-card, .solution-feature');
    animateElements.forEach(el => observer.observe(el));
}

// Utility functions for feature demonstrations
function simulateScrollingBehavior() {
    // Simulate user scrolling patterns for demo
    let scrollCount = 0;
    const scrollInterval = setInterval(() => {
        window.scrollBy(0, 100);
        scrollCount++;
        
        if (scrollCount > 5) {
            clearInterval(scrollInterval);
            // Trigger intervention after simulated excessive scrolling
            setTimeout(() => aiBuddy.triggerIntervention(), 2000);
        }
    }, 1000);
}

// Export for external use if needed
window.MindGuardApp = {
    aiBuddy,
    gamificationEngine,
    healthyFeed,
    smartBreaks,
    progressTracker,
    simulateScrollingBehavior
};