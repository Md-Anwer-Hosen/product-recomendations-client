# 🔵 CLIENT README (product-recommendations-client)

```markdown
# 💡 Product Recommendations Client

Frontend application for Product Recommendations platform.

Users can post product queries and receive recommendations from other users.

---

## 🌐 Live Website

https://product-recomendations-client.vercel.app

---

## 🛠️ Tech Stack

- React.js
- React Router v6
- TanStack Query
- Axios
- Firebase Authentication
- Tailwind CSS
- Vercel (Deployment)

---

## 🔐 Authentication

- Firebase Email/Password Authentication
- Google Login Support
- Secure token-based API communication
- Private route protection with redirect after login

---

## 📌 Features

- Create product queries
- View all queries
- Add recommendations
- View recommendations received
- View recommendations given
- Secure API communication
- Automatic redirect after login
- Protected routes

---

## ⚙️ Environment Variables

Create `.env.local`:

🧠 Architecture

axiosSecure → attaches Firebase token

axiosNormal → public API calls

PrivateRoute → redirects to login and back

React Query for server state management

🚀 Deployment

Deployed on:

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas
```

👨‍💻 Author

Md Anwer Hosen
Full-Stack Developer | CSE Student
