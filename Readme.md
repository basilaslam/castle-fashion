# Castle Fashion

Castle Fashion is a full-stack web application. This README will guide you through the setup and running of the project.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).
- MongoDB installed on your machine, or you can use MongoDB Docker container or MongoDB Atlas.

### MongoDB Installation

#### Option 1: Install MongoDB Locally

Follow the instructions from the official MongoDB installation guide: [Install MongoDB](https://docs.mongodb.com/manual/installation/).

#### Option 2: Use MongoDB Docker Container

1. Ensure you have Docker installed. You can download it from [Docker official website](https://www.docker.com/).
2. Start MongoDB using Docker:

    ```bash
    docker run -d -p 27017:27017 --name mongodb mongo:latest
    ```

#### Option 3: Use MongoDB Atlas

1. Sign up for MongoDB Atlas at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster and get the connection string.

## Project Setup

Clone the repository:

```bash
git clone <repository-url>
cd castle-fashion
```


## Backend Setup

1. Navigate to the backend directory: 
```cd backend```
2. Install dependencies: 
```npm install```
3. Create a ```.env``` file in the backend directory and add the following environment variables:

```
# Application environment
ENVIRONMENT=development
ENVIRONMENT_MAINTENANCE=false
PORT=3432

# Database connection strings
DB_CONNECTION_STRING=mongodb://127.0.0.1:27017/WEBCASTLE
DB_CONNECTION_STRING_LOCAL=mongodb://127.0.0.1:27017/WEBCASTLE

# JWT configuration
JWT_EXPIRY=24h
JWT_SECRET_KEY= # Secret key for JWT

# Headers
WEBCASTLE_ACCESS_KEY=
WEBCASTLE_SECRET_KEY=
WEBCASTLE_CRYPTO_KEY=

# Cloudinary configuration
CLOUDINARY_NAME=
CLOUDINARY_KEY=
CLOUDINARY_SECRET=
CLOUDINARY_PROJECT_NAME=
```
4. build and start the application: ```npm run build && npm start```

## Frontend Setup

1. Navigate to the frontend directory: 
```cd frontend```
2. Install dependencies: 
```npm install```
3. Create a ```.env``` file in the backend directory and add the following environment variables:

```
NEXTAUTH_SECRET= # Secret key for NextAuth
NEXTAUTH_URL="http://localhost:3000"
BACKEND_URL=# Url to backend
NEXT_PUBLIC_API_BASE_URL=Base Url to backend
AUTH_TRUST_HOST=true
```
4. build and start the application: ```npm run build && npm start```


## Running with Docker
Alternatively, you can run the entire application using Docker Compose.


1. Ensure you have Docker and Docker Compose installed.
```cd frontend```
2. Build and run the application: 
```docker-compose up --build```

## Accessing the Application
- The frontend will be available at http://localhost:3000.
- The backend API will be available at http://localhost:3432.

.

# Castle Fashion Project Report

## Overview

Castle Fashion is an ecommerce website developed using the latest technologies, including Next.js 14, Node.js with Express, and MongoDB. The application provides comprehensive CRUD functionalities for products and a robust admin panel for managing users and products. The backend is secured with JWT authentication and additional payload encryption, ensuring a high level of security. The frontend leverages the power of Next.js, including its built-in optimization features and Tailwind CSS for styling.

## Technologies Used

- **Frontend**: Next.js 14, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT, Next-Auth
- **State Management**: Zustand

## Features

### Admin Panel

- **User Management**: Admins can list all users.
- **Product Management**: Admins can create, list, edit, and delete all products.

### Product Management

- **CRUD Functionalities**: Complete Create, Read, Update, Delete operations for products.

### Security

- **Authentication**: Implemented with JWT.
- **Encryption**: Payloads sent to JWT are encrypted and decrypted for added security.
- **Modular Backend**: The backend architecture is modular, enhancing maintainability and scalability.

### Frontend Optimizations

- **Next.js Features**: Utilized Next.js built-in code splitting and optimization methods.
- **Image Optimization**: Used Next.js Image component for optimized image handling.
- **Data Fetching**: Implemented SSR (Server-Side Rendering) and callback functions for optimized data fetching.
- **Styling**: Tailwind CSS for efficient and responsive design.
- **State Management**: Zustand for managing the cart system.
- **SEO**: Next.js SEO tools for improved search engine optimization.


### Potential Enhancements

- **Performance Improvements**: Implementing SWR or TanStack Query for better data fetching and caching mechanisms.
- **Next.js Suspense**: Utilizing Next.js Suspense for streaming only the required components.


## Implementation Details

### Authentication

- **JWT Authentication**: Used for securing the backend. Tokens are encrypted to ensure the payload is secure.
- **Next-Auth**: Used for authentication on the frontend, specifically with credentials.

### Cart System

- **State Management**: The cart system is built using Zustand due to time constraints, but it provides a lightweight and efficient solution for state management.

### Code Optimization

- **Next.js Optimizations**: Leveraged Next.js’s built-in features for code splitting and optimization.
- **Additional Optimizations**: Used Image component, SSR, and callback functions for further performance improvements.

## Conclusion

Castle Fashion is a robust ecommerce platform with comprehensive features and advanced security measures. The use of modern technologies and best practices ensures a high level of performance and security. With potential enhancements like improved data fetching and caching, the project can be further optimized for better user experience and scalability.

## Recommendations

To further enhance the application, consider:

- **Implementing SWR or TanStack Query**: For better data fetching and caching.
- **Using Next.js Suspense**: For streaming only the required components, further optimizing the performance.
