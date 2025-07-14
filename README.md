#  SPA System

This project is a **Single Page Application (SPA)** built in **Vanilla JavaScript** that allows you to manage users and courses based on their access role.

---

##  Features

✅ User registration and login  
✅ Roles: `admin` and `user`  
✅ User CRUD (admin)  
✅ Course CRUD (admin)  
✅ Custom view for regular users  
✅ Manual routing via hash (`#/login`, `#/dashboard`, etc.)  
✅ Use of `json-server` as a local database (REST API simulation)  
✅ Reusable components (`Header`, `Sidebar`, `Modal`, `Table`)  

---

##  Technologies used

- HTML5  
- CSS3  
- JavaScript (ES Modules)  
- Vite (for development environment)

---

## 📁 Structure of the project

spa-system/  
│
├── src/  
│ ├── components/ → Header, Sidebar, Modal, User Table  
│ ├── pages/ → Views: login, register, dashboard, courses, etc.  
│ ├── services/ → API logic (fetching a json-server)  
│ ├── utils/ → Reusable functions (auth, storage)  
│ └── main.js → Main router    
│
├── db.json → Mock database (json-server)  
├── index.html → Base HTML  
├── vite.config.js → Vite configuration  
└── README.md → This file  

---

##  Installing and running locally

> Make sure you have **Node.js** installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/your-user/spa-system.git
cd spa-system
2. Install dependencies
bash
Copy code
npm install
3. Run json-server (to simulate the database)
bash
Copy code
npx json-server --watch db.json --port 3000
This will launch a REST server at http://localhost:3000.

4. Run Vite (development server)
In another terminal:

bash
Copy code
npm run dev
Open your browser to:
📍 http://localhost:5173

👤 Test Users
Admin
📧 admin@gmail.com

🔑 Admin123

Regular User
📧 user@gmail.com

🔑 User1234

---



## Available Paths

- #/login → Login Page

- #/register → Registration Page

- #/dashboard → Administrator Dashboard

- #/courses → Course Management (admin)

- #/users → User Management (admin)

- #/user-home → Regular User View

- #/ → Public Page if not logged in

.

📝 License
This project is for educational purposes only. You may freely adapt and modify it.
