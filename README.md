# TestSomething — Worktree Demo

Demo **Task Board** với **2 Git worktree** (dùng plugin **Git Worktree Manager**).

## Tính năng theo nhánh

| Worktree | Thư mục | Nhánh | App |
|----------|---------|--------|-----|
| Gốc | `TestSomething` | `main` | Task Board — thêm, tick, xóa việc |
| Phụ | `TestSomething-wt-timer` | `feature/pomodoro-timer` | + **Pomodoro** 25p focus / 5p nghỉ |

Mở `index.html` trong trình duyệt để chạy.

## Git

```bash
git worktree list
git remote -v
```

- **origin** → `https://github.com/zozoitdd/TestSomething.git` (tạo repo trống trên tài khoản `zozoitdd` rồi `git push -u origin main feature/pomodoro-timer`)
- **github** → https://github.com/DuyHop32/TestSomething (đã push sẵn 2 nhánh)

## Worktree Manager

1. **Add Git Folder** → chọn thư mục `TestSomething`
2. Thấy 2 worktree → **Switch Worktree** để mở folder tương ứng
3. So sánh `app.js` / `index.html` giữa `main` và `feature/pomodoro-timer`
