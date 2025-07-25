# Simple REST API

A basic REST API built with Express.js using MVC architecture and MongoDB for data storage.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Update the MongoDB connection string in `.env`:

   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

3. Start the server:

   ```bash
   npm start
   ```

   Or for development with auto-restart:

   ```bash
   npm run dev
   ```

## API Endpoints

### Users

- **GET /api/users** - Get all users
- **GET /api/users/:id** - Get user by ID
- **POST /api/users** - Create a new user
- **PUT /api/users/:id** - Update user
- **DELETE /api/users/:id** - Delete user

## Example Usage

### Create a new user (POST)

```json
POST /api/users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "phone": "123-456-7890"
}
```

### Get all users (GET)

```
GET /api/users
```

### Get user by ID (GET)

```
GET /api/users/65f1234567890abcdef12345
```

### Update a user (PUT)

```json
PUT /api/users/65f1234567890abcdef12345
Content-Type: application/json

{
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "age": 31
}
```

### Delete a user (DELETE)

```
DELETE /api/users/65f1234567890abcdef12345
```

## Project Structure

```
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── userController.js    # User controller (handles HTTP requests & business logic)
├── models/
│   └── User.js              # User model (Mongoose schema)
├── routes/
│   └── userRoutes.js        # User routes
├── .env                     # Environment variables
├── package.json
├── server.js                # Main server file
└── README.md
```

## User Model

The User model includes the following fields:

- `name` (required) - User's full name
- `email` (required, unique) - User's email address
- `age` (optional) - User's age
- `phone` (optional) - User's phone number
- `createdAt` - Automatically generated timestamp
- `updatedAt` - Automatically updated timestamp

## Validation

- Name is required and must be a non-empty string
- Email is required, must be unique, and follow email format
- Age must be a positive number (if provided)
- All fields are validated both at the model level and service level

## Error Handling

- Comprehensive error handling for all routes
- Proper HTTP status codes
- Meaningful error messages
- Mongoose validation errors are properly formatted

## Response Format

All API responses follow this format:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message"
}
```
