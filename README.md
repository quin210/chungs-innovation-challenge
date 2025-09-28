# 🏆 Chung's Innovation Challenge - Leaderboard

Trang web hiển thị bảng xếp hạng với giao diện hiện đại cho cuộc thi Chung's Innovation Challenge.

## ✨ Tính năng nổi bật

- 🎨 **Giao diện hiện đại**: Gradient background, glassmorphism effects
- 📊 **Thống kê trực quan**: Hiển thị tổng số đội, điểm cao nhất, điểm trung bình
- 🔄 **Auto-refresh**: Tự động cập nhật dữ liệu mỗi 2 phút
- 📱 **Responsive design**: Tương thích với mọi thiết bị
- 🏅 **Highlight top 3**: Làm nổi bật 3 vị trí đầu với màu vàng, bạc, đồng
- 🎯 **Real-time data**: Đọc trực tiếp từ file CSV

## 🚀 Cách sử dụng

### 1. Khởi động server:
```bash
node server.js
```

### 2. Mở trình duyệt và truy cập:
```
http://localhost:3000
```

### 3. Cập nhật dữ liệu:
- **Tự động**: Trang sẽ tự refresh mỗi 2 phút
- **Thủ công**: Click nút "Làm mới" hoặc F5
- **File CSV**: Chỉnh sửa `data/Leaderboard.csv` và refresh trang

## 📁 Cấu trúc project

```
📦 Chung's Innovation Challenge
├── 📄 index.html          # Trang chính với giao diện hiện đại
├── 🎨 styles.css          # CSS với animations và responsive design  
├── ⚡ script.js           # JavaScript với tính năng nâng cao
├── 🖥️ server.js          # Node.js server
├── 📊 data/
│   └── Leaderboard.csv    # Dữ liệu bảng xếp hạng
├── 🖼️ image/
│   ├── logo_competition.jpg
│   └── logo_organizer.png
└── 📖 README.md

```

## 📊 Format file CSV

File `data/Leaderboard.csv` có cấu trúc:
```csv
Team ,#sub1,#sub2,#sub3
Team Alpha,85.1,92.5,88.3
Team Beta,78.6,85.2,90.1
...
```

- **Team**: Tên đội thi
- **#sub1, #sub2, #sub3**: Điểm các lần nộp bài
- **Điểm cao nhất**: Tự động tính từ 3 điểm submission

## 🎯 Trạng thái đội thi

- 🏆 **Xuất sắc**: Điểm >= 80
- ⭐ **Tốt**: Điểm >= 70  
- 🔄 **Đang thi**: Điểm < 70
- ⏳ **Chưa nộp**: Chưa có điểm

## 🛠️ Yêu cầu hệ thống

- Node.js (version 12+)
- Trình duyệt web hiện đại (Chrome, Firefox, Safari, Edge)
- Port 3000 available

## 📝 Hướng dẫn cập nhật dữ liệu

1. **Chỉnh sửa file CSV**:
   - Mở `data/Leaderboard.csv`
   - Cập nhật điểm số hoặc thêm team mới
   - Lưu file

2. **Xem kết quả**:
   - Refresh trang web (F5)
   - Hoặc chờ auto-refresh (2 phút)
   - Hoặc click nút "Làm mới"

## 🎨 Customization

### Thay đổi màu sắc:
Chỉnh sửa CSS variables trong `styles.css`:
```css
:root {
    --primary-color: #667eea;    /* Màu chính */
    --secondary-color: #764ba2;  /* Màu phụ */
    --accent-color: #f093fb;     /* Màu nhấn */
    /* ... */
}
```

### Thay đổi tần suất auto-refresh:
Chỉnh sửa trong `script.js`:
```javascript
window.autoRefresh = new AutoRefresh(2); // 2 phút
```

## 🚀 Deploy lên GitHub Pages

### Cách 1: Automatic Deploy với GitHub Actions

1. **Push code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Chung's Innovation Challenge Leaderboard"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chungs-innovation-challenge.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Vào repository Settings → Pages
   - Source: "GitHub Actions"
   - GitHub Actions sẽ tự động deploy khi có commit mới

3. **Truy cập trang web:**
   ```
   https://YOUR_USERNAME.github.io/chungs-innovation-challenge
   ```

### Cách 2: Manual Deploy

1. **Upload files lên GitHub repository**
2. **Enable GitHub Pages** với source = "Deploy from a branch" → main
3. **Website sẽ available tại:** `https://YOUR_USERNAME.github.io/REPO_NAME`

## 📱 Live Demo

- **Local Development:** `http://localhost:3000`
- **GitHub Pages:** `https://YOUR_USERNAME.github.io/chungs-innovation-challenge`

## 🔄 Cập nhật dữ liệu trên GitHub Pages

1. **Chỉnh sửa file `data/Leaderboard.csv`** trên GitHub hoặc local
2. **Commit và push changes:**
   ```bash
   git add data/Leaderboard.csv
   git commit -m "Update leaderboard data"
   git push
   ```
3. **GitHub Actions sẽ tự động deploy** (2-3 phút)
4. **Trang web sẽ cập nhật** với dữ liệu mới

## 🎯 Features

### ✅ Hoạt động trên GitHub Pages:
- ✅ **Static hosting** - không cần server
- ✅ **Auto-deploy** với GitHub Actions
- ✅ **Real-time CSV reading** 
- ✅ **Responsive design**
- ✅ **Modern animations**
- ✅ **Auto-refresh data**

### ✅ Hoạt động Local Development:
- ✅ **Node.js server** với Express
- ✅ **Hot reload** khi development
- ✅ **Debug tools** và console logs
- ✅ **Development workflow**

## 📂 Repository Structure

```
📦 chungs-innovation-challenge/
├── 📄 index.html              # Main page
├── 🎨 styles.css              # Modern CSS with animations
├── ⚡ script.js               # JavaScript with GitHub Pages support
├── 🖥️ server.js               # Node.js server (local dev only)
├── 📊 data/
│   └── Leaderboard.csv        # Competition data
├── 🖼️ image/
│   ├── logo_competition.jpg
│   └── logo_organizer.png
├── 🔧 .github/workflows/
│   └── deploy.yml             # GitHub Actions workflow
├── 📋 package.json            # Project metadata
├── 🚫 .gitignore             # Git ignore rules
└── 📖 README.md              # This file
```

## 🎉 Demo

### GitHub Pages:
- 🌐 **Live URL:** `https://YOUR_USERNAME.github.io/chungs-innovation-challenge`
- 🔄 **Auto-deploy:** Every commit triggers new deployment
- 📊 **Data updates:** Edit CSV → Commit → Auto-deploy
- 📱 **Mobile-friendly:** Works on all devices

### Local Development:
- 🖥️ **Server:** `http://localhost:3000`
- 🔧 **Debug:** `http://localhost:3000/debug.html`

---
💻 Developed with ❤️ for Chung's Innovation Challenge  
🚀 Ready for GitHub Pages deployment!