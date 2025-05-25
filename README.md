# Task Management Application

A full-featured task management application built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

- User Authentication (Register/Login)
- Create, Read, Update, and Delete Tasks
- Task Categories and Priority Levels
- Due Date Management
- Task Status Tracking
- Responsive Modern UI

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Node.js + Express.js
- Database: MongoDB
- Authentication: JWT
- Styling: Tailwind CSS

## Project Structure

```
Task-manager/
├── client/             # React frontend
├── server/             # Node.js backend
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm start
   ```

The application will be available at `http://localhost:3000`

## Environment Variables

Create `.env` files in both client and server directories:

### Server (.env)
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Client (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
``` 