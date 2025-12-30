# MERN eCommerce - Backend

A robust and scalable backend API for an eCommerce platform built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (Admin, User)
  - Password encryption with bcrypt
  - Password reset functionality

- **Product Management**
  - CRUD operations for products
  - Product search, filtering, and sorting
  - Category and subcategory management
  - Product reviews and ratings
  - Image upload and management

- **Order Management**
  - Create, read, update orders
  - Order status tracking
  - Order history for users

- **Shopping Cart**
  - Add/remove products
  - Update quantities
  - Cart persistence

- **Payment Integration**
  - Secure payment processing
  - Order confirmation

- **Admin Dashboard**
  - User management
  - Product management
  - Order management
  - Sales analytics

## 🛠️ Tech Stack

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer / Cloudinary
- **Validation:** Express Validator
- **Environment Variables:** dotenv
- **Security:** Helmet, CORS

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # Database configuration
├── controllers/
│   ├── authController.js   # Authentication logic
│   ├── productController.js # Product operations
│   ├── orderController.js  # Order management
│   └── userController.js   # User management
├── middleware/
│   ├── authMiddleware.js   # JWT verification
│   ├── errorMiddleware.js  # Error handling
│   └── uploadMiddleware.js # File upload handling
├── models/
│   ├── User.js            # User schema
│   ├── Product.js         # Product schema
│   ├── Order.js           # Order schema
│   └── Review.js          # Review schema
├── routes/
│   ├── authRoutes.js      # Auth endpoints
│   ├── productRoutes.js   # Product endpoints
│   ├── orderRoutes.js     # Order endpoints
│   └── userRoutes.js      # User endpoints
├── utils/
│   ├── generateToken.js   # JWT token generation
│   └── sendEmail.js       # Email utility
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore file
├── package.json          # Dependencies
└── server.js             # Entry point
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/preaus007/MERN-eCommerce.git
cd MERN-eCommerce/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend directory and add the following:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/ecommerce
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d

# Cloudinary (if using for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_email_password

# Payment Gateway (Stripe/PayPal)
STRIPE_SECRET_KEY=your_stripe_secret_key
# or
PAYPAL_CLIENT_ID=your_paypal_client_id

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:3000
```

### 4. Run the application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/auth/register` | Register new user | Public |
| POST | `/api/auth/login` | Login user | Public |
| POST | `/api/auth/logout` | Logout user | Private |
| POST | `/api/auth/forgot-password` | Send password reset email | Public |
| PUT | `/api/auth/reset-password/:token` | Reset password | Public |

### Users

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/users/profile` | Get user profile | Private |
| PUT | `/api/users/profile` | Update user profile | Private |
| GET | `/api/users` | Get all users | Admin |
| DELETE | `/api/users/:id` | Delete user | Admin |

### Products

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/products` | Get all products | Public |
| GET | `/api/products/:id` | Get product by ID | Public |
| POST | `/api/products` | Create product | Admin |
| PUT | `/api/products/:id` | Update product | Admin |
| DELETE | `/api/products/:id` | Delete product | Admin |
| POST | `/api/products/:id/reviews` | Create product review | Private |

### Orders

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/orders` | Create new order | Private |
| GET | `/api/orders/myorders` | Get user orders | Private |
| GET | `/api/orders/:id` | Get order by ID | Private |
| PUT | `/api/orders/:id/pay` | Update order to paid | Private |
| GET | `/api/orders` | Get all orders | Admin |
| PUT | `/api/orders/:id/deliver` | Update order to delivered | Admin |

### Cart

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/cart` | Get user cart | Private |
| POST | `/api/cart` | Add item to cart | Private |
| PUT | `/api/cart/:id` | Update cart item | Private |
| DELETE | `/api/cart/:id` | Remove item from cart | Private |

## 🔒 Security Features

- JWT authentication
- Password hashing with bcrypt
- HTTP-only cookies for tokens
- CORS configuration
- Helmet for security headers
- Input validation and sanitization
- Rate limiting
- XSS protection

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Dependencies

### Production Dependencies

```json
{
  "express": "^4.18.x",
  "mongoose": "^7.x.x",
  "dotenv": "^16.x.x",
  "bcryptjs": "^2.4.x",
  "jsonwebtoken": "^9.x.x",
  "express-async-handler": "^1.2.x",
  "cors": "^2.8.x",
  "helmet": "^7.x.x",
  "express-validator": "^7.x.x",
  "multer": "^1.4.x",
  "cloudinary": "^1.x.x",
  "nodemailer": "^6.x.x",
  "stripe": "^13.x.x"
}
```

### Development Dependencies

```json
{
  "nodemon": "^3.x.x",
  "jest": "^29.x.x",
  "supertest": "^6.x.x"
}
```

## 👤 Author

Touhedul Islam
- GitHub: [@preaus007](https://github.com/preaus007)
