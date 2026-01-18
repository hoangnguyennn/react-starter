## Repository

Thuộc lớp infra.

Repository là adapter chuyển đổi HTTP response sang dạng app có thể hiểu được (che dấu HTTP context).

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
