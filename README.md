# Job Portal

## Overview
A modern, full-stack Job Portal web application for posting and searching jobs. Built with React (frontend), Node.js/Express (backend), and MongoDB (database). Features include job uploads, user profiles with avatar upload, and a beautiful, production-level UI.

## Features
- Post and browse job listings
- User registration and profile management
- Upload and update user avatars
- Responsive, modern UI with Tailwind CSS
- RESTful API with Express.js

## Tech Stack
- **Frontend:** React, Tailwind CSS, Vite
- **Backend:** Node.js, Express.js, Multer
- **Database:** MongoDB, Mongoose

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB (local or cloud)

### Installation
1. **Clone the repository:**
	```bash
	git clone <your-repo-url>
	cd Job\ portal
	```
2. **Install dependencies:**
	- For the backend:
	  ```bash
	  cd server
	  npm install
	  ```
	- For the frontend:
	  ```bash
	  cd ..
	  npm install
	  ```

### Running the App
1. **Start MongoDB** (if running locally):
	```bash
	mongod
	```
2. **Start the backend server:**
	```bash
	cd server
	npm start
	```
3. **Start the frontend (Vite) dev server:**
	```bash
	npm run dev
	```
4. Visit [http://localhost:5173](http://localhost:5173) in your browser.

## Folder Structure

```
Job portal/
├── public/
├── server/           # Express backend
│   ├── src/
│   └── ...
├── src/              # React frontend
│   ├── pages/
│   ├── components/
│   └── ...
├── package.json
├── vite.config.js
└── README.md
```

## API Endpoints
- `POST /api/jobs` - Upload a new job
- `GET /api/jobs` - Fetch all jobs
- `POST /api/users` - Register a new user
- `GET /api/profile?username=...` - Get user profile
- `POST /api/upload/:username` - Upload user avatar

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is open source and available under the [MIT License](LICENSE).