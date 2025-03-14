TaskFlow API

A RESTful Task Management API built with Next.js, TypeScript, MongoDB, and JWT authentication.

🚀 Features

User Authentication (Sign up, Login, JWT)

Task Management (CRUD operations)

MongoDB Integration with Mongoose

API Documentation (Postman & Swagger)

Hosted on Vercel

🛠️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/Dnaux-dev/task-manager

2️⃣ Install Dependencies

npm install

3️⃣ Set Up Environment Variables

Create a .env.local file and add:

MONGODB_URI=mongodb://localhost:27017/taskflow
JWT_SECRET=your_jwt_secret_key
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

4️⃣ Start the Development Server

npm run dev

✔ Your API will now run at http://localhost:3000/api.

📌 API Endpoints

Method

Endpoint

Description

Authentication

POST

/api/auth/signup

Register a new user

❌ No

POST

/api/auth/login

Login user (returns JWT)

❌ No

GET

/api/tasks

Get all tasks

✅ Yes

POST

/api/tasks

Create a new task

✅ Yes

GET

/api/tasks/:id

Get a task by ID

✅ Yes

PUT

/api/tasks/:id

Update a task

✅ Yes

DELETE

/api/tasks/:id

Delete a task

✅ Yes

🌍 Deploying to Vercel

1️⃣ Install Vercel CLI

npm install -g vercel

2️⃣ Deploy

vercel

✔ Your API will be hosted at https://your-vercel-url.vercel.app/api.

📜 API Documentation

This project includes API documentation using Postman & Swagger.

The postman collection is in the repo

Postman Documentation: Available at https://documenter.getpostman.com/view/43054358/2sAYkBs1am

🤝 Contributing

Pull requests are welcome. Please open an issue before making any changes.

✔ Your API is now fully documented and ready for submission! 🚀

