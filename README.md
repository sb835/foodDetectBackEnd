# 🧠 Food Recognition Backend

Node.js + Express API for a food image recognition web app.  
Handles user registration, sign-in, and counts how many images each user analyzes.

---

## Features

-   User registration and sign-in
-   Secure password hashing with `argon2`
-   Tracks number of images submitted per user
-   Connects to a PostgreSQL database
-   CORS enabled for GitHub Pages frontend
-   Deployment-ready via Render.com

---

## Database

Uses **PostgreSQL**, hosted on Render.  
There are two tables:

-   `users`: Stores user name, email, registration timestamp, and number of image submissions
-   `login`: Stores hashed passwords (with `argon2`), separated from user data

Database connection is managed via **`knex.js`**  
and secured using **SSL (TLS required)**.

---

## Tech Stack

-   **Node.js**
-   **Express**
-   **PostgreSQL** (via `knex`)
-   **argon2** (password hashing)
-   **CORS** (for frontend communication)

---

## Deployment

This backend is deployed as a **web service on [Render](https://render.com)**.  
Deployment automatically performs:

1. GitHub repo pull
2. `npm install`
3. Server start via `npm start`

**Note:**  
Environment variables like `DATABASE_URL` are configured in the Render dashboard.

---

## ▶️ Getting Started (Local)

```bash
# 1. Clone the repository
git clone https://github.com/your-username/food-recognition-backend.git
cd food-recognition-backend

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```
