
### Live Link: https://book-catalogue-with-prisma.vercel.app/

### Application Routes:

#### User

- https://book-catalogue-with-prisma.vercel.app/api/v1/auth/signup (POST)
- https://book-catalogue-with-prisma.vercel.app/api/v1/auth/signin (POST)
- https://book-catalogue-with-prisma.vercel.app/api/v1/users (GET)(only admin)
- https://book-catalogue-with-prisma.vercel.app/api/v1/users/d99194e0-b125-463a-b6b7-1d9d3d337bc6 (Single GET) (only admin)
- https://book-catalogue-with-prisma.vercel.app/api/v1/users/f5c1d13b-8de2-43ec-a97c-fbcebcbf7191 (PATCH)(only admin)
- https://book-catalogue-with-prisma.vercel.app/api/v1/users/f5c1d13b-8de2-43ec-a97c-fbcebcbf7191 (DELETE) (only admin)
- https://book-catalogue-with-prisma.vercel.app/api/v1/profile (GET)(must send token in headers)

### Category

- https://book-catalogue-with-prisma.vercel.app/api/v1/categories/create-category (POST)
- https://book-catalogue-with-prisma.vercel.app/api/v1/categories (GET)
- https://book-catalogue-with-prisma.vercel.app/api/v1/categories/892d2315-eed8-4772-8107-6cffb3a10dd6 (Single GET)
- https://book-catalogue-with-prisma.vercel.app/api/v1/categories/eeb78652-8c49-4db9-90b2-60b8963366b1 (PATCH)
- https://book-catalogue-with-prisma.vercel.app/api/v1/categories/eeb78652-8c49-4db9-90b2-60b8963366b1 (DELETE)

### Books

- https://book-catalogue-with-prisma.vercel.app/api/v1/books/create-book (POST)
- https://book-catalogue-with-prisma.vercel.app/api/v1/books (GET)
- https://book-catalogue-with-prisma.vercel.app/api/v1/books/892d2315-eed8-4772-8107-6cffb3a10dd6/category (GET)
- https://book-catalogue-with-prisma.vercel.app/api/v1/books/9d0364e1-8741-41f9-8d4d-d7eab353d23d (GET)
- https://book-catalogue-with-prisma.vercel.app/api/v1/books/4de40728-7d0d-419d-81b4-95302df3b621 (PATCH)
- https://book-catalogue-with-prisma.vercel.app/api/v1/books/b8a03ab2-f651-4d20-a93b-2edf4f5baac9 (DELETE)

### Orders

- https://book-catalogue-with-prisma.vercel.app/api/v1/orders/create-order (POST)
- https://book-catalogue-with-prisma.vercel.app/api/v1/orders (GET) (if admin gets all orders, if customer gets customer specific orders)
- https://book-catalogue-with-prisma.vercel.app/api/v1/orders/c049b9f8-e539-4aa0-b47d-28f7f64ca816 (GET)