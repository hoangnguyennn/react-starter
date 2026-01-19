# Tạo ra 1 build stage từ node 20
FROM node:20-slim AS build

# Set các biến môi trường
## Chỉ định thư mục pnpm, nói với hệ thống rằng pnpm được cài đặt ở đây
ENV PNPM_HOME="/pnpm"
## Thêm /pnpm vào PATH, giúp hệ thống tìm thấy lệnh pnpm, nếu không có dòng này, hệ thống sẽ báo "pnpm: command not found"
ENV PATH="$PNPM_HOME:$PATH"
# Chỉ định rằng lệnh build được thực hiện ở môi trường CI
ENV CI=true

# Đặt thư mục làm việc cho các lệnh tiếp theo là /app
# Sau lệnh này, khi gõ "RUN pnpm run build" nó sẽ hiểu là "cd /app && pnpm run build"
WORKDIR /app

# Bật corepack, nó sẽ hỗ trợ cài đặt pnpm với version được chỉ định trong package.json
RUN corepack enable

# Copy package.json và pnpm-lock.yaml từ host vào thư mục làm việc /app trong container
# Việc này giúp tận dụng cache của Docker, nếu package.json và pnpm-lock.yaml không thay đổi, Docker sẽ sử dụng lại layer này và không cần cài đặt lại các dependencies
COPY package.json pnpm-lock.yaml ./
# Cài đặt các dependencies trong ứng dụng
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Copy toàn bộ mã nguồn từ host vào thư mục làm việc /app trong container
COPY . .
# Chạy lệnh build được định nghĩa trong package.json
RUN pnpm run build

# Tạo ra 1 build stage mới, stage dùng để start nginx server
FROM nginx:alpine AS server
# Copy file cấu hình nginx từ host vào thư mục cấu hình nginx trong container
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# Copy tất cả các file build từ stage "build" sang thư mục /usr/share/nginx/html trong stage "server"
COPY --from=build /app/dist /usr/share/nginx/html
# Chỉ định cổng mà nginx sẽ lắng nghe
EXPOSE 80