# Galdunx Auth API

[![Node.js CI](https://github.com/kenresoft/galdunx-auth-api/actions/workflows/node.js.yml/badge.svg)](https://github.com/kenresoft/galdunx-auth-api/actions/workflows/node.js.yml)

Galdunx Auth API is a Node.js-based backend service providing user authentication using **JWT (JSON Web Token)** and secure password hashing. It leverages **TypeScript**, **Express.js**, and **Mongoose** to build a scalable and maintainable API. This project includes secure user registration, login functionality, and JWT-protected routes.

## Features

- User Registration with Email and Password
- Password Hashing with **bcryptjs**
- JWT-based Authentication for Session Management
- API Versioning for Scalable Growth
- Securely Protected Routes Using JWT
- Well-Structured Codebase Following TypeScript Best Practices
- MongoDB Integration via **Mongoose**

## Table of Contents

- [Galdunx Auth API](#galdunx-auth-api)
  - [Features](#features)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Usage](#usage)
  - [API Endpoints](#api-endpoints)
    - [Register User](#register-user)
    - [Login User](#login-user)
    - [Protected Route](#protected-route)
  - [Technologies Used](#technologies-used)
  - [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/kenresoft/galdunx-auth-api.git
    cd galdunx-auth-api
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and configure the environment variables as described in the [Environment Variables](#environment-variables) section.

4. Start the development server:

    ```bash
    npx nodemon src/server.ts
    ```

## Environment Variables

```plaintext
PORT=4000
JWT_SECRET=jwt_secret
JWT_REFRESH_SECRET=jwt_refresh_secret
MONGO_URI=mongodb://localhost:27017/auth-api
BCRYPT_SALT_ROUNDS=10
```

- PORT: Port on which the server will run (default: 5000).
- JWT_SECRET: Secret key used to sign JWT tokens.
- JWT_REFRESH_SECRET: Secret key used to sign JWT refresh tokens.
- MONGO_URI: MongoDB connection string.
- BCRYPT_SALT_ROUNDS: Salt rounds for password hashing.

## Usage

After setting up the environment, the API can be accessed via [http://localhost:4444/api/v1/auth](http://localhost:4444/api/v1/auth).

Test the API with tools like Postman or cURL.

## API Endpoints

### Register User

- URL: /api/v1/auth/register

- Method: `POST`

- Description: Registers a new user with an email and password.

### Login User

- URL: /api/v1/auth/login

- Method: `POST`

- Description: Authenticates the user and returns a JWT token.

### Protected Route

- URL: /api/v1/auth/home

- Method: `GET`

- Description: A protected route accessible only to authenticated users.

Headers:

```plaintext
Authorization: Bearer JWT_TOKEN
```

## Technologies Used

- Node.js: Backend runtime
- Express.js: Web framework for Node.js
- TypeScript: Type safety and improved developer experience
- JWT (jsonwebtoken): Token-based authentication
- bcryptjs: Password hashing
- Mongoose: MongoDB ORM for handling database operations
- dotenv: Manage environment variables

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
