# Job-Search

This is a student-oriented blog CMS (Content Management System). Users may register, validate their email address, log in, create blogs, make comments, like blogs, and execute other user-related operations. Node.js, Express, and MongoDB are used to build the CMS.

You can view the project at <https://blog-cms-2f0u.onrender.com>

## Prerequisites

Before running the application, make sure you have [Node.js (v12 or higher)](https://nodejs.org/en) and [Git](https://git-scm.com/downloads) installed.

## Installation

1. Clone this repository using Git

   ```sh
   git clone https://github.com/Uju-Chinedum/Job-Search.git
   ```

2. Navigate to the project directory

   ```sh
   cd Job-Search
   ```

3. Install the required dependencies

   ``` sh
   npm install
   ```

4. Create a MongoDB database locally or via a cloud-based service. Make a note of the URL for the connection.

5. Create a `.env` file in the project root and add the following environment variables with your own values:\
   `MONGO_URI=<your-mongodb-connection-url>`\
   `JWT_SECRET=<your-key-to-tokenize-JWT>`\
   `JWT_LIFETIME=<how-long-you-want-it-to-last>`

## Running the Application

Once you have completed the installation, run the application by using `npm start`. This will start the Node.js server, and you should see the message "Server started on port `port`" in the console. The application will be available at <http://localhost:5000>.

## Routes

The application implements the following endpoints:

### Authentication

- **Register Admin - POST /api/v1/auth/register/admin**: Establishes a new admin account. Requests the admin's email address, password, and complete name.
- **Register Customer - POST /api/v1/auth/register/customer**: Establishes a new customer account. Requests the customer's email address, password, and complete name.
- **Register Worker - POST /api/v1/auth/register/job**: Establishes a new worker account. Requests the worker's email address, password, complete name, phone number, and whatsapp number.
- **Login - POST /api/v1/auth/login**: Uses a user's email address and password to log them in. Uses JWTs to verify users.
- **Logout - POST /api/v1/auth/logout**: The presently authenticated user is logged out by invalidating  token.

### User Operations

- **Get All Customers - GET /api/v1/user/customer**: This method returns a list of all registered customers. Sorting and pagination are supported. Authentication is required and only admins can do this operation
- **Get All Workers - GET /api/v1/user/job**: This method returns a list of all registered workers. Sorting and pagination are supported. Authentication is required and everyone can do this operation
- **Get Single Worker - GET /api/v1/user/:id**: This method gets the details of a single worker by their ID. Authentication is required
- **Show Current User - GET /api/v1/user/show-me**: This method gets the details of the currently logged in user. Authentication is required
- **Update User - PATCH /api/v1/user/update-user**: This method updates the profile details of the currently logged in user. Authentication is required
- **Update Password - PATCH /api/v1/user/update-password**: This method updates the password of the currently logged in user. Authentication is required
- **Delete User - DELETE /api/v1/user/delete-user**: This method deletes the account of the currently logged in user. Authentication is required

Visit the Swagger API documentation at <https://blog-cms-2f0u.onrender.com/api-docs> for detailed information on available endpoints and request/response formats.

## Important

To create a new customer/admin, the following fields are needed in the request body.

```txt
firstName       *
lastName        *
email           *
password        *
confirmPassword *
```

To create a new worker, the following fields are needed in the request body.

```txt
firstName       *
lastName        *
email           *
phone           *
whatsapp        *
password        *
confirmPassword *
```

## License

This project is licensed under the **[MIT License](https://mit-license.org/)**

## Resources

- [Node.js](nodejs.org) - Official website for Node.js
- [NPM](npmjs.com) - Official website for NPM
- [Express.js](expressjs.com) - Official website for Express.js
- [MongoDB](mongodb.com) - Official website for MongoDB
- [Mongoose.js](mongoosejs.com) - Official website for Mongoose
- [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js/blob/master/README.md) - Official website for Bcrypt.js
- [JSON Web Token](https://jwt.io) - Official website for JWT
