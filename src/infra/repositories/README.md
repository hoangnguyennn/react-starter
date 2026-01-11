## Repository

Thuộc lớp application.

Repository là adapter chuyển đổi dữ liệu và lỗi infra (apiClient) sang ngôn ngữ của app.

Nó:

- che dấu backend contract
- che dấu axios
- che dấu HTTP
- expose API mà app hiểu

Nó biết:

- domain model
- domain error
- cách mapping data

Nó không:

- expose axios
- expose HTTP status

### Mindset đúng

Khi backend đổi response type, chỉ cần sửa code ở Repository.
