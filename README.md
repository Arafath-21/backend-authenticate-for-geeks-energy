# Backend Developer Coding Exercise

This project is a basic web application that performs user registration, login, and CRUD operations on user data. It is built with Node.js, Express, MongoDB, and Bootstrap for the frontend.

## Features

1. **User Registration:**
   - Users can register by providing their name, email, phone number, profession, and password.
   - The password is stored in encrypted format for security.

2. **Login:**
   - Users can log in by validating their email and password.
   - Upon successful login, the user is redirected to the home page.

3. **Home Page:**
   - Displays a list of all registered users.
   - Users can update or delete their records from this page.

4. **API Endpoints:**
   - **User Registration**: Registers a new user.
   - **User Login**: Validates user credentials and allows access to the home page.
   - **List Users**: Lists all registered users.
   - **Update User**: Updates a selected user's details.
   - **Delete User**: Deletes a selected user record.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (using Mongoose as the ODM)
- **Frontend**: Bootstrap for user interface design
- **Security**: Password encryption using bcrypt

## Setup Instructions

### Prerequisites

- Node.js (v14 or above)
- MongoDB (Running locally or using a cloud service like MongoDB Atlas)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Arafath-21/backend-authenticate-for-geeks-energy.git
   ```

2. Navigate to the project directory:

   ```bash
   cd backend-authenticate-for-geeks-energy
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:

   - Create a `.env` file in the root of the project.
   - Add the following environment variables:
     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

5. Run the application:

   ```bash
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`.

### API Endpoints

- **POST** `/api/register` - Register a new user.
- **POST** `/api/login` - User login.
- **GET** `/api/users` - Retrieve all registered users.
- **PUT** `/api/users/:id` - Update a user by ID.
- **DELETE** `/api/users/:id` - Delete a user by ID.

### Folder Structure

```
/src
|-- /controllers     # Contains route logic for user operations
|-- /models          # Mongoose models
|-- /routes          # API routes for user registration, login, and CRUD
|-- /middleware      # Authentication middleware for protected routes
|-- /connectDB       # MongoDB connection logic
|-- /utility         # Helper functions (e.g., for password hashing)
app.js               # Entry point for the application
```

## Future Improvements

- Add unit tests for API endpoints.
- Implement JWT-based authentication for secure routes.
- Add error handling and input validation for API requests.

---

This structure can help developers understand the purpose, setup, and usage of your project. Let me know if you'd like to tweak any specific sections!
