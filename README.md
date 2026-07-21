# NexusMart Platform - Project Documentation

### A MERN Stack Web Application for Online Shopping and Order Management
**Prepared by:** Gajjala Sathwika (Full Stack Developer - Frontend, Backend, Database, Documentation)

---

## 1. Introduction

### 1.1 Project Title
**NexusMart (E-commerce)**

### 1.2 Team Members
| Name | Role |
| :--- | :--- |
| **Gajjala Sathwika** | Full Stack Developer (Frontend, Backend, Database, Documentation) |

*This is an individually developed project, with the sole contributor responsible for end-to-end design, development, testing, and deployment of the application.*

---

## 2. Project Overview

### 2.1 Purpose
**NexusMart** is a web-based e-commerce application designed to provide a seamless online shopping experience for customers and a robust management interface for administrators. The application allows users to browse products, filter by category, manage their shopping carts, and make secure transactions via Stripe integration. Administrators can manage product listings, categories, view user details, and monitor customer orders.

The goal of the project is to create a secure, responsive, and functional digital storefront that simplifies the transaction flow and provides end-to-end transparency from product browsing to order placement.

### 2.2 Key Features

#### User Registration & Profile Management
- Secure sign-up using email and password, with passwords hashed using `bcryptjs` before storage.
- User profile stores name, email, and role (`user` or `admin`).

#### Product Browsing & Filtering
- Customers can view all products or filter them dynamically by category (Fashion, Electronics, Mobiles, Groceries, Sports Equipments).
- Real-time search allows users to find products by name/keyword.

#### Cart & Checkout Management
- Dynamic shopping cart system managed using React Context API.
- Live calculations for subtotal, shipping, tax, and final amount.
- Secure payment integration using Stripe checkout simulation.

#### Order Management & History
- Users can view their past orders, order status, and cancel pending orders.
- Order details contain purchase details, billing address, and transaction status.

#### Admin Controls
- Dedicated dashboard for administrators to monitor site-wide metrics (total sales, users count, order count).
- Full product CRUD capability (Create, Read, Update, Delete) to manage catalog.
- Ability to manage categories and user profiles.

#### Role-Based Authentication
- JWT (JSON Web Token) based authentication ensures role-based endpoints and routes are protected.

---

## 3. Architecture

The application follows the MERN stack architecture (MongoDB, Express.js, React, Node.js) in a client-server model, where the React frontend acts as the client and the Express/Node.js backend acts as the server, communicating over RESTful APIs.

### 3.1 Frontend Architecture (React)
The frontend is built using React with Vite as the build tool, utilizing modular components and layouts.
- **Component-based structure**: Reusable components (`Header`, `HeroBanner`, `CategoryGrid`, `Cart`) are separated from page views and dashboards.
- **Routing**: React Router DOM handles navigation, featuring protected routes for user profiles and the administrative dashboard.
- **State management**: React Context API is used to manage cart items, totals, and user authentication state.
- **API communication**: Fetch/Axios requests to interface with the Node.js backend.
- **Styling**: Vanilla CSS styling for a responsive, modern checkout layout.

### 3.2 Backend Architecture (Node.js + Express.js)
The backend exposes a RESTful API built with Express.js running on Node.js. It is organized into three layers: models, middleware, and routes.
- **Models**: Mongoose schemas defining MongoDB models (`User`, `Product`, `Category`, `Order`).
- **Middleware**: Custom token verification middleware (`authMiddleware.js`) intercepts protected routes and checks roles (`admin` vs `user`).
- **Routes**: Modular routes handling requests for `/api/auth`, `/api/users`, `/api/products`, `/api/categories`, `/api/orders`, and `/api/payment`.
- **Security**: Passwords hashed with `bcryptjs`. JWT verification on headers.

### 3.3 Database (MongoDB)
MongoDB stores all application data as JSON-like documents across four main collections.

| Collection | Key Fields | Purpose |
| :--- | :--- | :--- |
| **users** | name, email, password, role | Stores user profiles and roles (`user` / `admin`) |
| **products** | name, description, price, category, imageUrl, stock | Stores items available in the catalog |
| **categories** | name, image | Configures product categories dynamically |
| **orders** | user_id, items, totalAmount, status, address, paymentStatus | Manages transactions and delivery status |

---

## 4. Setup Instructions

### 4.1 Prerequisites
- Node.js (v18 or later) and npm
- MongoDB (local installation via Compass or Atlas Cluster)
- Stripe Developer Account API keys

### 4.2 Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/sathwika075/E-commerce.git
   cd E-commerce
   ```
2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```
3. **Create a `.env` file inside the backend folder with the following variables:**
   ```env
   MONGO_URI=mongodb://localhost:27017/nexusmart
   PORT=5000
   JWT_SECRET=your_secret_key_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   ```
4. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```
5. **Create a `.env` file inside the frontend folder:**
   ```env
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
   ```

---

## 5. Folder Structure

### 5.1 Client (Frontend) Structure
```text
frontend/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx               # Routes and core layout logic
    ├── index.css             # Stylesheet for app UI
    ├── components/           # Reusable UI components
    │   ├── Header.jsx        # Navigation & auth status
    │   ├── HeroBanner.jsx    # Hero section banner
    │   ├── CategoryGrid.jsx  # Category selection cards
    │   ├── ProductList.jsx   # Product grid & search
    │   ├── Cart.jsx          # Shopping cart & Stripe checkout
    │   ├── Profile.jsx       # User order history
    │   └── AdminDashboard.jsx # Admin management tools
    └── context/
        └── CartContext.jsx   # State manager for checkout cart
```

### 5.2 Server (Backend) Structure
```text
backend/
├── index.js                  # Main server entry & seed setup
├── clearDb.js                # Database clean script
├── forceSeed.js              # Database force seeder script
├── middleware/
│   └── authMiddleware.js     # Admin & User authentication filters
├── models/
│   ├── User.js               # User model definition
│   ├── Product.js            # Product schema definition
│   ├── Category.js           # Category model definition
│   └── Order.js              # Order/Transaction schema
└── routes/
    ├── authRoutes.js         # Authentication endpoints
    ├── userRoutes.js         # User details & admin routes
    ├── productRoutes.js      # Product listing CRUD
    ├── categoryRoutes.js     # Category setup endpoints
    ├── orderRoutes.js        # Checkout and order logging
    └── paymentRoutes.js      # Stripe payment intent routes
```

---

## 6. Running the Application

### 6.1 Start the Backend Server
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`. On start, the script will automatically seed database credentials and products if empty.
- **Admin Email**: `admin@gmail.com`
- **Admin Password**: `admin123`

### 6.2 Start the Frontend Server
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`. Open this URL in your web browser.

---

## 7. API Documentation

All endpoints are prefixed with `/api`. Protected endpoints require an `Authorization` header in the format: `Bearer <token>`.

### 7.1 Authentication Routes — `/api/auth`
| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **POST** | `/register` | Register a new user | name, email, password |
| **POST** | `/login` | Authenticate and retrieve token | email, password |

### 7.2 Product Routes — `/api/products`
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Get all products (supports filtering/search) | Public |
| **GET** | `/:id` | Get specific product details | Public |
| **POST** | `/` | Create a new product | Admin only |
| **PUT** | `/:id` | Update product details | Admin only |
| **DELETE**| `/:id` | Remove a product from database | Admin only |

### 7.3 Order Routes — `/api/orders`
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **POST** | `/` | Create a new order | User |
| **GET** | `/my` | Get orders for logged-in user | User |
| **GET** | `/` | Get all orders | Admin |
| **PATCH**| `/:id` | Update order status / Cancel order | User / Admin |

---

## 8. Authentication & Authorization
- **Bcrypt Hashing**: User passwords hashed securely prior to write operations.
- **JWT tokens**: Issued on successful login with a 24-hour expiration window. Used by client for role authentication.
- **Role Verification**: Middleware validates the user's role before accessing administrative panels or performing updates on products.

---

## 9. User Interface
The UI has three custom views built with optimized styling:
- **Product Catalog Grid**: Detailed product showcase with search features.
- **Stripe Sandbox Checkout**: Clean card payment simulation screen.
- **Admin panel**: Sales counter dashboards and product editor widgets.

---

## 10. Testing
- **UI flow testing**: Registration, cart manipulation, and payment flows verified.
- **API testing**: Endpoints checked using DevTools and Postman to ensure role restrictions hold.
- **Database inspections**: Verifying collection integrity on MongoDB compass.

---

## 11. Known Issues
- **Stripe API Credentials**: Stripe checkout requires configured developer credentials in `.env` or defaults to sandbox testing.
- **No SMS/Email notification**: Customers currently only see order creation updates directly inside their browser profile pages.

---

## 12. Future Enhancements
- **Dynamic Stocks**: Support inventory tracking to auto-hide sold-out items.
- **Socket IO Integrations**: Real-time sales charts on the admin panel.
- **AWS S3 / Multer**: Image uploading capabilities directly from the Admin panel UI.
