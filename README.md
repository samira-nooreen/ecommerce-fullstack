# 🛒 E-Commerce Shopping Cart Application

A Full Stack e-commerce web application that delivers a complete online shopping experience — from browsing products and managing carts to secure payments and order tracking.

## 🔗 Demo
**Live Demo:** [https://demo.example.com](https://3000-d35b2184-6134-4efe-a099-bf8d6662e947.orchids.cloud/)

## 🚀 Features
### 👤 User Features
- User registration & login using JWT-based authentication
- Browse products by category with search support
- Add, update, and remove items from the shopping cart
- Secure checkout using Razorpay payment gateway
- View order history and track order status

### 🛠 Admin Features
- Admin login with role-based access
- Add, update, and delete products
- Manage inventory and orders
- Admin dashboard for product and order management

## 🧩 Tech Stack
- **Frontend:** ReactJS, Next.js, Tailwind CSS, Framer Motion
- **Backend:** Spring Boot (Java), Spring Security, JWT
- **Database:** MySQL
- **Payments:** Razorpay API

## ⚙️ Setup & Installation
### Prerequisites
- Node.js & npm
- Java 17+
- MySQL

### Frontend Setup
```bash
npm install
npm run dev
```

### Backend Setup
1. Clone the backend repository
2. Update `application.properties` with your database and Razorpay credentials
3. Run with `mvn spring-boot:run`
