# Team Task Manager 🚀

A full-stack web application where users can create projects, assign tasks, and track progress with role-based access.

---

## 🔗 Live Demo

* Frontend: https://team-task-manager-5th4zqy1r-rishabh-sharmas-projects-58610397.vercel.app
* Backend API: https://team-task-manager-zsyi.onrender.com

---

## 🧑‍💻 Tech Stack

* **Frontend:** React (Vite)
* **Backend:** Node.js, Express
* **Database:** MongoDB Atlas
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## ✨ Features

* User Authentication (Signup/Login)
* Create and manage projects
* Assign tasks to users
* Track task status (To Do, In Progress, Done)
* Dashboard with task insights

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/R-Sharma04/team-task-manager.git
cd team-task-manager
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
MONGO_URI=your_mongodb_connection_string
```

Run backend:

```bash
node server.js
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Notes

* Backend is deployed on Render and may take a few seconds to start (free tier).
* MongoDB Atlas should allow access from all IPs (0.0.0.0/0).

---
