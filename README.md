# ECHO 💬
https://echo-srkd.onrender.com

### Real-Time Messaging Application

ECHO is a full-stack, real-time messaging application designed to make online communication simple, fast, and seamless. It enables users to connect with others, exchange messages and media, and stay updated through real-time communication.

Built using modern web technologies, ECHO combines a responsive React frontend with a Node.js and Express backend, Clerk authentication, MongoDB, and Socket.IO for real-time communication. The application is containerized using Docker and deployed on Render.

## ✨ Features

* **Authentication:** Secure user authentication and session management using Clerk.
* **User Profiles:** Access user information and discover other users.
* **Real-Time Messaging:** Send and receive messages without manually refreshing the page.
* **One-to-One Conversations:** Communicate privately with other users.
* **Online/Offline Status:** Check the availability of other users.
* **Conversation List:** Access your conversations from a centralized sidebar.
* **Media Sharing:** Share images and other supported media in conversations.
* **Unread Message Indicators:** Identify conversations with unread messages.
* **Dark Mode:** Enjoy a dark-themed interface.
* **Responsive UI:** Interact with the application through a modern React interface.

<h2 align="left">💻 Tech Stack</h2>

<p align="left">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,nodejs,express,mongodb,docker,git,github&perline=5" />
</p>

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge\&logo=vite\&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge\&logo=tailwindcss\&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge\&logo=socketdotio\&logoColor=white)

### Database & Authentication

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge\&logo=mongodb\&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge\&logo=clerk\&logoColor=white)

### Tools & Deployment

![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge\&logo=docker\&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge\&logo=render\&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge\&logo=git\&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)


## 🏗️ Architecture Overview

ECHO follows a client-server architecture.

1. **Frontend:** The React application provides the user interface and manages client-side state.
2. **Authentication:** Clerk handles user authentication and session management.
3. **Backend:** Express.js exposes API endpoints for application functionality.
4. **Database:** MongoDB stores application data, including user and messaging information.
5. **Real-Time Communication:** Socket.IO enables real-time message delivery and other supported live updates.
6. **Containerization:** Docker packages the application and its runtime dependencies.
7. **Deployment:** Render hosts the containerized application.

## 🚀 Getting Started

Follow these steps to run ECHO locally.

### Prerequisites

Ensure you have the following installed:

* Node.js and npm
* Git
* MongoDB or a MongoDB Atlas account
* A Clerk account and application
* Docker (optional, if running the application in a container)

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd ECHO
```

Replace the repository URL and directory name with your actual values.

### 2. Install Dependencies

Install the dependencies for the frontend and backend according to your repository structure.

For example, if they have separate `package.json` files:

```bash
cd frontend
npm install
```

Then install the backend dependencies:

```bash
cd ../backend
npm install
```

Adjust the directory names if your project uses a different structure.

### 3. Configure Environment Variables

Create the appropriate `.env` files for your frontend and backend.

Example backend configuration:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
```

Example frontend configuration:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

**Important:** These are illustrative variable names. Use the exact variable names expected by your application. Your backend may also require configuration for media storage, CORS, and other services.

Never commit secret keys, database credentials, or other sensitive environment variables to GitHub.

### 4. Run the Application

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in a separate terminal:

```bash
cd frontend
npm run dev
```

Open the local URL displayed by Vite in your terminal.

Check your `package.json` files for the actual development commands and adjust these instructions accordingly.

## 🐳 Docker Deployment

ECHO includes a Dockerfile to package the application and its runtime dependencies into a container.

To build the Docker image locally:

```bash
docker build -t echo-chat .
```

To run the container:

```bash
docker run -p 3000:3000 --env-file .env echo-chat
```

These commands assume your Dockerfile is in the current directory, your application listens on port `3000`, and the required environment variables are available in `.env`. Adjust them to match your actual configuration.

Docker Desktop is not required to deploy an application to Render. You can deploy a containerized application through Render using a Dockerfile in your repository.

## ☁️ Deployment

ECHO is deployed on **Render** using Docker.

The Dockerfile defines how the application environment is built, while Render manages the deployment and runs the resulting container.

Add your live application URL here:

**Live Demo:** https://echo-srkd.onrender.com

## 🤝 Contributing

Contributions, suggestions, and bug reports are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your changes.
5. Open a pull request.

## 📄 License

A license has not yet been specified.

---

**ECHO** — Bringing conversations closer, in real time. 💬

