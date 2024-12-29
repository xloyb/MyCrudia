

---

# MyCrudia Backend

## Setup Guide

### Prerequisites

1. Clone the repository:

   ```bash
   git clone https://github.com/xloyb/MyCrudia.git
   ```

2. Navigate to the `server` directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Setup the database configuration:

   - In the `.env` file, define your database connection URL using the following format:

     ```bash
     DATABASE_URL=mysql://root:password@ip:3306/dbname
     ```

   - Replace `root`, `password`, `ip`, and `dbname` with your actual database credentials.

5. Generate and push the database schema using Prisma:

   ```bash
   npx prisma migrate deploy
   ```

6. Run the application:

   ```bash
   npm run dev
   ```

---

## Technologies Used

The backend of MyCrudia uses the following technologies:

- **Node.js & Express**: For handling HTTP requests and routing.
- **Prisma ORM**: For interacting with the MySQL database with a simple and type-safe API.
- **JWT (JSON Web Tokens)**: For securing API routes and managing user authentication.
- **Rate Limiting**: Implemented using `express-rate-limit` to prevent abuse of the API.
- **Helmet**: To secure HTTP headers and prevent common security vulnerabilities.

---
