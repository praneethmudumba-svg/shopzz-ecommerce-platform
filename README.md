# ShopZ - E-Commerce Application

ShopZ is a modern e-commerce web application that enables users to browse products, manage their shopping cart, place orders, and securely complete purchases online. The platform provides an intuitive shopping experience along with powerful administration tools for managing products, orders, and users.

## Overview

The application is designed to deliver a seamless online shopping experience with features such as product catalog management, user authentication, shopping cart functionality, order processing, and administrative controls.

## Features

### Customer Features

- User Registration and Login
- Secure Authentication
- Product Browsing
- Product Search and Filtering
- Product Details View
- Shopping Cart Management
- Wishlist Functionality
- Checkout and Order Placement
- Order Tracking
- User Profile Management
- Order History

### Admin Features

- Admin Dashboard
- Product Management (Create, Read, Update, Delete)
- Category Management
- User Management
- Order Management
- Sales Monitoring and Reporting

## Technology Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap / Tailwind CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Authentication

- JSON Web Token (JWT)
- bcrypt.js

### Payment Gateway

- Stripe / Razorpay (Optional)

## Project Structure

```text
ShopZ/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

## Installation

### Prerequisites

Ensure the following software is installed:

- Node.js
- MongoDB
- Git

### Clone the Repository

```bash
git clone https://github.com/yourusername/shopz.git
cd shopz
```

### Install Dependencies

#### Backend

```bash
cd server
npm install
```

#### Frontend

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file inside the server directory and configure the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

### Start the Backend Server

```bash
npm run server
```

### Start the Frontend Application

```bash
npm start
```

The application will be available at:

```text
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/users/register | Register a new user |
| POST | /api/users/login | Authenticate user |
| GET | /api/users/profile | Get user profile |

### Products

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/products | Retrieve all products |
| GET | /api/products/:id | Retrieve product details |
| POST | /api/products | Create a product (Admin) |
| PUT | /api/products/:id | Update a product (Admin) |
| DELETE | /api/products/:id | Delete a product (Admin) |

### Orders

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/orders | Create a new order |
| GET | /api/orders/:id | Get order details |
| GET | /api/orders/myorders | Get user order history |

## Authentication Flow

1. User registers or logs in.
2. Credentials are validated by the server.
3. A JWT token is generated upon successful authentication.
4. Protected routes require a valid token.
5. Authorized users can access their respective resources.

## Future Enhancements

- Product Recommendations
- Multi-Vendor Marketplace Support
- Real-Time Notifications
- Discount and Coupon System
- Product Reviews and Ratings
- Advanced Analytics Dashboard
- Mobile Application Support

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push the branch.

```bash
git push origin feature-name
```

5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Author

ShopZ Development Team
For questions, suggestions, or contributions, please contact the project maintainers.

