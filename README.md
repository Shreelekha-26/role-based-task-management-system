# 📌 Work Assignment System

A **role-based task management system** with **Admin** and **User** roles.  
Built using **Node.js**, **Express**, **MongoDB**, **JWT Authentication** (backend), and **React.js with Material-UI** (frontend).  

---

## 🚀 Features

### 🔑 Authentication
- User Registration & Login (JWT-based authentication)
- Role-based access control (Admin/User)

### 👨‍💼 Admin Features
- Create new tasks for users
- View all tasks
- Edit/Delete tasks
- Assign tasks to specific users by **username**
- Mark tasks as Completed/In Progress

### 👤 User Features
- View only assigned tasks
- Update task status
- Mark tasks as completed
- Track task progress with an interactive UI

---

## 🛠️ Tech Stack

**Frontend**:
- React.js
- Material-UI (MUI)
- Axios
- Framer Motion (animations)

**Backend**:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for frontend-backend connection

---




## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/your-username/work-assignment-system.git
cd work-assignment-system

📌Backend Setup
cd backend
npm install

📌Run Backend:
node server.js

📌Create .env file in backend folder:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/workassign?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
PORT=5000

3️⃣ Frontend Setup
cd ../frontend
npm install

📌Run Frontend:
npm start

📌 API Endpoints
Auth Routes
POST /api/auth/register → Register a new user
POST /api/auth/login → Login user
GET /api/auth/me → Get logged-in user details

Task Routes
POST /api/tasks → Create task (Admin only)
GET /api/tasks → Get all tasks (Admin only)
GET /api/tasks/mytasks → Get logged-in user tasks

🔑 Default Admin Credentials
You can register an account with role admin via Postman or MongoDB directly.

Example:
json format
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
