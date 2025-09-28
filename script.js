// Chung's Innovation Challenge Leaderboard
// Enhanced with modern animations and statistics

class LeaderboardManager {
    constructor() {
        console.log('🚀 Khởi tạo LeaderboardManager...');
        this.data = [];
        this.loadingElement = document.getElementById('loading');
        this.leaderboardElement = document.getElementById('leaderboard');
        this.leaderboardBody = document.getElementById('leaderboard-body');
        this.totalTeamsElement = document.getElementById('total-teams');
        this.maxScoreElement = document.getElementById('max-score');
        this.avgScoreElement = document.getElementById('avg-score');
        
        console.log('🔍 Elements found:', {
            loading: !!this.loadingElement,
            leaderboard: !!this.leaderboardElement,
            leaderboardBody: !!this.leaderboardBody,
            totalTeams: !!this.totalTeamsElement,
            maxScore: !!this.maxScoreElement,
            avgScore: !!this.avgScoreElement
        });
        
        this.init();
    }

    async init() {
        try {
            await this.loadCSVData();
            await this.simulateLoading();
            this.renderLeaderboard();
            this.updateStatistics();
            this.showLeaderboard();
            this.addScrollAnimation();
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            this.showError();
        }
    }

    async loadCSVData() {
        try {
            console.log('🔄 Đang tải file CSV...');
            // Try different path formats for GitHub Pages
            const paths = [
                'data/Leaderboard.csv',
                './data/Leaderboard.csv',
                '/data/Leaderboard.csv'
            ];
            
            let csvText = null;
            let lastError = null;
            
            for (const path of paths) {
                try {
                    const response = await fetch(path);
                    console.log(`📡 Trying path ${path}: ${response.status}`);
                    
                    if (response.ok) {
                        csvText = await response.text();
                        console.log(`✅ Successfully loaded from ${path}`);
                        break;
                    }
                } catch (error) {
                    lastError = error;
                    console.log(`❌ Failed to load from ${path}:`, error.message);
                }
            }
            
            if (csvText) {
                console.log('📄 CSV content loaded:', csvText.substring(0, 100) + '...');
                this.parseCSV(csvText);
                console.log('✅ Data parsed successfully, teams:', this.data.length);
            } else {
                throw lastError || new Error('All paths failed');
            }
        } catch (error) {
            console.error('❌ Lỗi khi tải file CSV:', error);
            console.log('🔄 Fallback: Sử dụng dữ liệu mẫu');
            // Fallback: tạo dữ liệu mẫu nếu không tải được file
            this.createSampleData();
        }
    }

    parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(header => header.trim());
        
        this.data = [];
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= headers.length && values[0].trim()) {
                const row = {};
                headers.forEach((header, index) => {
                    row[header] = values[index] ? values[index].trim() : '';
                });
                
                // Tính điểm cao nhất từ các submission
                const sub1 = parseFloat(row['#sub1']) || 0;
                const sub2 = parseFloat(row['#sub2']) || 0;
                const sub3 = parseFloat(row['#sub3']) || 0;
                const maxScore = Math.max(sub1, sub2, sub3);
                
                row['Max Score'] = maxScore > 0 ? maxScore.toFixed(1) : '0';
                
                // Chỉ thêm team có tên
                if (row['Team']) {
                    this.data.push(row);
                }
            }
        }
        
        // Sắp xếp theo điểm cao nhất
        this.data.sort((a, b) => {
            const aScore = parseFloat(a['Max Score']) || 0;
            const bScore = parseFloat(b['Max Score']) || 0;
            return bScore - aScore;
        });
    }

    createSampleData() {
        // Sử dụng dữ liệu thật từ CSV làm fallback
        console.log('📊 Sử dụng dữ liệu mẫu từ CSV...');
        this.data = [
            { 'Team': 'NULL', '#sub1': '85.1', '#sub2': '', '#sub3': '', 'Max Score': '85.1' },
            { 'Team': '27', '#sub1': '83.8', '#sub2': '', '#sub3': '', 'Max Score': '83.8' },
            { 'Team': 'ACVcoders', '#sub1': '83.6', '#sub2': '', '#sub3': '', 'Max Score': '83.6' },
            { 'Team': 'camgbi', '#sub1': '83.5', '#sub2': '', '#sub3': '', 'Max Score': '83.5' },
            { 'Team': 'AITrio', '#sub1': '81.4', '#sub2': '81.4', '#sub3': '', 'Max Score': '81.4' },
            { 'Team': 'NoCap', '#sub1': '77.6', '#sub2': '', '#sub3': '', 'Max Score': '77.6' },
            { 'Team': 'Xtreme', '#sub1': '75.2', '#sub2': '', '#sub3': '', 'Max Score': '75.2' },
            { 'Team': 'NaN', '#sub1': '74.6', '#sub2': '', '#sub3': '', 'Max Score': '74.6' },
            { 'Team': 'TP BANK', '#sub1': '72.7', '#sub2': '', '#sub3': '', 'Max Score': '72.7' },
            { 'Team': 'Kanami', '#sub1': '71.7', '#sub2': '', '#sub3': '', 'Max Score': '71.7' }
        ];
        
        this.data.sort((a, b) => parseFloat(b['Max Score']) - parseFloat(a['Max Score']));
        console.log('✅ Đã load', this.data.length, 'teams từ dữ liệu mẫu');
    }

    async simulateLoading() {
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1500));
    }

    renderLeaderboard() {
        this.leaderboardBody.innerHTML = '';
        
        this.data.forEach((team, index) => {
            const row = this.createTeamRow(team, index + 1);
            this.leaderboardBody.appendChild(row);
        });

        // Add staggered animation to rows
        this.animateRows();
    }

    createTeamRow(team, rank) {
        const row = document.createElement('tr');
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        if (rankClass) {
            row.classList.add(rankClass);
        }

        // Rank column
        const rankCell = document.createElement('td');
        rankCell.innerHTML = `<span class="rank-badge">${rank}</span>`;
        row.appendChild(rankCell);

        // Team name column
        const nameCell = document.createElement('td');
        const teamName = team['Team'] || 'Unknown Team';
        nameCell.innerHTML = `<span class="team-name">${teamName}</span>`;
        row.appendChild(nameCell);

        // Score columns
        const scoreColumns = ['#sub1', '#sub2', '#sub3'];
        scoreColumns.forEach(column => {
            const cell = document.createElement('td');
            const score = team[column] || '-';
            const displayScore = score && score !== '-' && parseFloat(score) > 0 ? parseFloat(score).toFixed(1) : '-';
            cell.innerHTML = `<span class="score">${displayScore}</span>`;
            row.appendChild(cell);
        });

        // Max Score column
        const maxScoreCell = document.createElement('td');
        const maxScore = team['Max Score'] || '0';
        const displayMaxScore = parseFloat(maxScore) > 0 ? parseFloat(maxScore).toFixed(1) : '-';
        maxScoreCell.innerHTML = `<span class="score" style="background: linear-gradient(45deg, #ffd700, #ffed4e);">${displayMaxScore}</span>`;
        row.appendChild(maxScoreCell);

        // Status column
        const statusCell = document.createElement('td');
        const maxScoreNum = parseFloat(team['Max Score'] || '0');
        let statusClass, statusText;
        if (maxScoreNum >= 80) {
            statusClass = 'status-completed';
            statusText = 'Xuất sắc';
        } else if (maxScoreNum >= 70) {
            statusClass = 'status-active';
            statusText = 'Tốt';
        } else if (maxScoreNum > 0) {
            statusClass = 'status-active';
            statusText = 'Đang thi';
        } else {
            statusClass = 'status-pending';
            statusText = 'Chưa chấm';
        }
        statusCell.innerHTML = `<span class="status-badge ${statusClass}">${statusText}</span>`;
        row.appendChild(statusCell);

        return row;
    }

    updateStatistics() {
        const totalTeams = this.data.length;
        const scores = this.data.map(team => parseFloat(team['Max Score'] || '0'));
        const maxScore = Math.max(...scores);
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;

        // Animate counter updates
        this.animateCounter(this.totalTeamsElement, totalTeams);
        this.animateCounter(this.maxScoreElement, maxScore);
        this.animateCounter(this.avgScoreElement, Math.round(avgScore * 10) / 10);
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current * 10) / 10;
        }, 50);
    }

    animateRows() {
        const rows = this.leaderboardBody.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.style.opacity = '0';
            row.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                row.style.transition = 'all 0.5s ease-out';
                row.style.opacity = '1';
                row.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    showLeaderboard() {
        console.log('🎯 Hiển thị leaderboard...');
        this.loadingElement.style.display = 'none';
        this.leaderboardElement.style.display = 'block';
        
        // Update status indicator
        const statusIndicator = document.getElementById('status-indicator');
        if (statusIndicator) {
            statusIndicator.innerHTML = `
                <i class="fas fa-circle" style="color: #43e97b;"></i>
                <span>Đã cập nhật</span>
            `;
        }
        
        // Trigger entrance animation
        setTimeout(() => {
            this.leaderboardElement.style.opacity = '1';
            this.leaderboardElement.style.transform = 'translateY(0)';
            console.log('✅ Leaderboard hiển thị thành công!');
        }, 100);
    }

    showError() {
        console.log('❌ Hiển thị lỗi...');
        this.loadingElement.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-exclamation-triangle" style="color: #fa709a;"></i>
            </div>
            <p>Không thể tải dữ liệu. Sử dụng dữ liệu mẫu.</p>
            <button onclick="window.location.reload()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Thử lại</button>
        `;
    }

    addScrollAnimation() {
        // Add scroll-based animations
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

        // Observe stat cards and table
        document.querySelectorAll('.stat-card, .table-container').forEach(el => {
            observer.observe(el);
        });
    }
}

// Enhanced animations and interactions
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.addParallaxEffect();
        this.addHoverEffects();
        this.addSmoothScrolling();
        this.addKeyboardNavigation();
    }

    addParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.header-section');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    addHoverEffects() {
        // Enhanced table row hover effects
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('tbody tr')) {
                const row = e.target.closest('tbody tr');
                row.style.transform = 'translateX(5px) scale(1.01)';
                row.style.zIndex = '10';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('tbody tr')) {
                const row = e.target.closest('tbody tr');
                row.style.transform = 'translateX(0) scale(1)';
                row.style.zIndex = '1';
            }
        });
    }

    addSmoothScrolling() {
        // Smooth scrolling for any anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    addKeyboardNavigation() {
        // Add keyboard navigation for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
}

// Theme Manager for future dark mode support
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        // Check for saved theme preference or default to light
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Auto-refresh functionality
class AutoRefresh {
    constructor(intervalMinutes = 2) {
        this.interval = intervalMinutes * 60 * 1000; // 2 phút tự động refresh
        this.isActive = false;
    }

    start() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.intervalId = setInterval(() => {
            console.log('🔄 Auto-refreshing leaderboard data...');
            // Tạo loading effect nhẹ khi refresh
            const loading = document.getElementById('loading');
            const leaderboard = document.getElementById('leaderboard');
            
            loading.style.display = 'block';
            leaderboard.style.opacity = '0.7';
            
            // Tải lại dữ liệu
            window.leaderboard = new LeaderboardManager();
        }, this.interval);
        
        console.log(`✅ Auto-refresh enabled: every ${intervalMinutes} minutes`);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.isActive = false;
            console.log('❌ Auto-refresh disabled');
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Chung\'s Innovation Challenge Leaderboard Loading...');
    
    try {
        // Initialize main components
        window.leaderboard = new LeaderboardManager();
        
        // Initialize other components with error handling
        try {
            window.animations = new AnimationManager();
        } catch (e) {
            console.warn('⚠️ AnimationManager failed to initialize:', e);
        }
        
        try {
            window.themeManager = new ThemeManager();
        } catch (e) {
            console.warn('⚠️ ThemeManager failed to initialize:', e);
        }
        
        // Start auto-refresh (every 2 minutes)
        try {
            window.autoRefresh = new AutoRefresh(2);
            window.autoRefresh.start();
        } catch (e) {
            console.warn('⚠️ AutoRefresh failed to initialize:', e);
        }
        
        // Add CSS for keyboard navigation
        const style = document.createElement('style');
        style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid #667eea;
                outline-offset: 2px;
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease-out;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('✅ Leaderboard initialized successfully!');
    } catch (error) {
        console.error('❌ Critical error during initialization:', error);
        // Fallback: show basic error message
        const loading = document.getElementById('loading');
        if (loading) {
            loading.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <h3 style="color: #fa709a; margin-bottom: 20px;">⚠️ Lỗi khởi tạo</h3>
                    <p style="margin-bottom: 20px;">Có lỗi xảy ra khi khởi tạo leaderboard.</p>
                    <button onclick="window.location.reload()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Tải lại trang</button>
                </div>
            `;
        }
    }
});

// Add error handling for uncaught errors
window.addEventListener('error', (e) => {
    console.error('Lỗi không mong muốn:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promise bị từ chối:', e.reason);
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LeaderboardManager, AnimationManager, ThemeManager };
}