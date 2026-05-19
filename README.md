# AI-Powered SQL Injection Detection & Prevention System

## Project Overview
A beginner-friendly full stack cybersecurity dashboard built with React, Tailwind CSS, Node.js, Express, and MongoDB. The app helps users detect SQL injection attacks using regex-based detection and a simulated AI confidence score.

## Features
- Dark neon cybersecurity dashboard UI
- SQL query scanner with real-time detection
- User authentication with JWT and bcrypt
- Scan history and attack logs
- Admin panel with analytics charts
- Mobile-responsive layout
- Helmet security, CORS, and rate limiting

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Recharts, Framer Motion
- Backend: Node.js, Express, MongoDB Atlas, Mongoose
- Security: JWT, bcrypt, Helmet, rate limiting

## Folder Structure
- `frontend/` - React web app
- `backend/` - Express API server

## Setup Instructions

### 1. Clone the repo
```bash
cd "c:/Users/naman/OneDrive/Desktop/projects_/project panchu"
```

### 2. Backend setup
```bash
cd backend
npm install
```
Create a `.env` file from `.env.example` and set your MongoDB Atlas URI plus a JWT secret.

### 3. Frontend setup
```bash
cd ../frontend
npm install
```
Create a `.env` file from `.env.example` and set `VITE_API_URL`.

### 4. Run locally
```bash
cd backend
npm run dev
```
In a second terminal:
```bash
cd frontend
npm run dev
```

## API Routes
### Auth
- `POST /api/auth/signup` - register new users
- `POST /api/auth/login` - login and receive JWT token

### Scanner
- `POST /api/scan/query` - scan SQL text for injection
- `GET /api/scan/history` - get authenticated user's scan history

### Admin
- `GET /api/admin/logs` - get all attack logs (admin only)
- `GET /api/admin/analytics` - get admin metrics
- `POST /api/admin/block-ip` - block suspicious IP address (admin only)

## Deployment Guide
### Frontend
- Deploy to Vercel by connecting the `frontend/` directory
- Set `VITE_API_URL` in Vercel environment variables

### Backend
- Deploy to Render or any Node.js host
- Add environment variables: `MONGO_URI`, `JWT_SECRET`, `PORT`

### MongoDB Atlas
- Create a free cluster on MongoDB Atlas
- Add a database user and whitelist your IP / allow access from anywhere
- Use the connection string in `backend/.env`

## Notes
- A default admin account is seeded on first startup if none exists.
- This project is intentionally simple for learning and can be expanded with real ML detection later.
