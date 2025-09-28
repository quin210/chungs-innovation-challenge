# 🚀 Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Chuẩn bị Repository

### 1.1 Tạo GitHub Repository
1. Đăng nhập GitHub
2. Tạo repository mới: `chungs-innovation-challenge`
3. Set visibility: **Public** (để dùng GitHub Pages miễn phí)

### 1.2 Initialize Git (nếu chưa có)
```bash
cd "d:\ura\Chung' s_Innovation_Challenge"
git init
git add .
git commit -m "Initial commit: Chung's Innovation Challenge Leaderboard"
```

## Bước 2: Upload lên GitHub

### 2.1 Connect với GitHub Repository
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chungs-innovation-challenge.git
git push -u origin main
```

**Thay `YOUR_USERNAME` bằng username GitHub của bạn!**

### 2.2 Verify Upload
- Vào GitHub repository
- Kiểm tra tất cả files đã được upload
- Đặc biệt kiểm tra: `index.html`, `data/Leaderboard.csv`, `.github/workflows/deploy.yml`

## Bước 3: Enable GitHub Pages

### 3.1 Cấu hình Pages
1. Vào repository → **Settings** tab
2. Scroll xuống **Pages** section (bên trái)
3. **Source**: Chọn "**GitHub Actions**"
4. Click **Save**

### 3.2 Trigger First Deploy
- GitHub Actions sẽ tự động chạy sau khi enable Pages
- Xem tiến trình tại: **Actions** tab
- Đợi deploy hoàn thành (2-3 phút)

## Bước 4: Truy cập Website

### 4.1 URL của website
```
https://YOUR_USERNAME.github.io/chungs-innovation-challenge
```

### 4.2 Kiểm tra hoạt động
- ✅ Trang web load được
- ✅ Logo hiển thị
- ✅ Dữ liệu CSV được đọc
- ✅ Responsive trên mobile
- ✅ Animations hoạt động

## Bước 5: Cập nhật dữ liệu

### 5.1 Cập nhật CSV trực tiếp trên GitHub
1. Vào repository → `data/Leaderboard.csv`
2. Click **Edit** (icon bút chì)
3. Chỉnh sửa dữ liệu
4. **Commit changes** với message mô tả

### 5.2 Cập nhật từ máy tính
```bash
# Chỉnh sửa file data/Leaderboard.csv
git add data/Leaderboard.csv
git commit -m "Update leaderboard: Round 2 results"
git push
```

### 5.3 Auto-deploy
- GitHub Actions tự động chạy sau mỗi commit
- Website cập nhật sau 2-3 phút
- Không cần làm gì thêm!

## 🔧 Troubleshooting

### Lỗi thường gặp:

**1. "Pages build failed"**
- Kiểm tra file `index.html` có tồn tại
- Kiểm tra syntax HTML/CSS/JS
- Xem logs tại Actions tab

**2. "CSV không load được"**
- Kiểm tra file `data/Leaderboard.csv` có tồn tại
- Kiểm tra format CSV đúng
- Xem browser console (F12)

**3. "Website không cập nhật"**
- Đợi 2-3 phút sau khi commit
- Hard refresh (Ctrl+F5)
- Kiểm tra Actions có chạy thành công không

### Debug:
```
https://YOUR_USERNAME.github.io/chungs-innovation-challenge/debug.html
```

## 📋 Checklist Deploy

- [ ] Repository đã tạo và public
- [ ] Code đã push lên GitHub  
- [ ] GitHub Pages đã enable
- [ ] Actions đã chạy thành công
- [ ] Website accessible tại URL
- [ ] CSV data load được
- [ ] Mobile responsive OK
- [ ] Logo hiển thị đúng

## 🎯 Kết quả

Sau khi hoàn thành, bạn sẽ có:

✅ **Live website** tại `https://YOUR_USERNAME.github.io/chungs-innovation-challenge`  
✅ **Auto-deploy** mỗi khi commit  
✅ **Easy data updates** chỉ cần edit CSV  
✅ **Professional leaderboard** với animations và responsive design  
✅ **Zero server costs** - hoàn toàn miễn phí!

---
🚀 **Ready to deploy!** Follow these steps and your leaderboard will be live in 10 minutes!