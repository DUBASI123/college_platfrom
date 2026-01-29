# 🎓 College Platform

A full-stack web application for college students featuring dashboards, project management, mock interviews, study notes, and placement tracking.

**Live Demo:** Deploy using the [DEPLOYMENT.md](DEPLOYMENT.md) guide.

---

## 📋 Features

- **User Authentication**: Register, login, and logout with JWT-based auth
- **Dashboard**: View statistics and profile information
- **Projects**: Manage college, healthcare, and internship projects
- **Mock Interviews**: Track and enroll in mock interview sessions
- **Study Notes**: Organize notes by category (lecture, practical, placement prep)
- **Placements**: Track placement opportunities and applications
- **Responsive Design**: Works on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

**Frontend:**
- React 18.2.0
- React Router DOM v6
- Axios (HTTP client)
- CSS3 (responsive styling)

**Backend:**
- Node.js + Express 4.18.2
- MongoDB 5.0 (database)
- JWT (authentication)
- Bcryptjs (password hashing)

**DevOps:**
- Docker & Docker Compose (containerization)
- Render (backend hosting)
- Vercel (frontend hosting)
- MongoDB Atlas (cloud database)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- MongoDB running locally or MongoDB Atlas account
- Git installed

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd "c:\Users\dubas\Desktop\New folder"
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

### Running Locally

**Terminal 1 (Backend):**
```bash
cd backend
npm start
```
Backend runs on `http://localhost:5000`

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```
Frontend runs on `http://localhost:3000`

### Test the App

1. Open http://localhost:3000
2. Register a new account:
   - Name: Test User
   - Email: test@college.com
   - Password: Test@123
   - College ID: ENG001
   - Year: 4th Year
   - Department: Engineering

3. Login with your credentials
4. Explore Dashboard, Projects, Interviews, Notes, and Placements
5. Click Logout to return to login screen

---

## 🐳 Docker Setup (All-in-One)

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

This starts:
- MongoDB on port 27017
- Backend on port 5000
- Frontend on port 3000

Stop with:
```bash
docker-compose down
```

---

## 📦 Project Structure

```
college-platform/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Authentication & CORS
│   │   ├── config/          # Configuration files
│   │   └── index.js         # Entry point
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/           # React pages
│   │   ├── components/      # React components
│   │   ├── utils/           # Utilities (API client)
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile
│   ├── package.json
│   └── .env.example
├── docker-compose.yml
├── DEPLOYMENT.md            # Production deployment guide
└── README.md
```

---

## 🔐 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/college-platform
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

See `.env.example` files for templates.

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project

### Interviews
- `GET /api/interviews` - Get all interviews
- `POST /api/interviews/:id/enroll` - Enroll in interview

### Notes
- `GET /api/notes` - Get all notes
- `POST /api/notes` - Create new note

### Placements
- `GET /api/placements` - Get all placements
- `POST /api/placements/:id/mark-placed` - Mark as placed

### Dashboard
- `GET /api/dashboard/:id` - Get dashboard stats

---

## 🚀 Production Deployment

### Quick Deploy (Render + Vercel + MongoDB Atlas)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/college-platform.git
   git push -u origin main
   ```

2. **Follow [DEPLOYMENT.md](DEPLOYMENT.md)** for step-by-step:
   - MongoDB Atlas setup
   - Render backend deployment
   - Vercel frontend deployment

**Deployment typically takes 5-10 minutes total.**

---

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
# Kill process and restart
tasklist | findstr node
taskkill /IM node.exe /F
npm start
```

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend `.env`
- Clear browser cache and refresh

### Database connection errors
- Verify MongoDB is running locally OR
- Check MongoDB Atlas connection string in `.env`

### Docker issues
```bash
# Rebuild containers
docker-compose down
docker-compose up --build
```

---

## 📝 Features in Detail

### Dashboard
- View user statistics (total projects, interviews, notes)
- See recent activity
- Quick links to all features

### Projects
- Filter by category (college, healthcare, internship)
- Add new projects with GitHub/live links
- Track project progress

### Mock Interviews
- Filter by type (technical, HR, group)
- Enroll in interviews
- Track completion status

### Study Notes
- Organize by subject and category
- Filter by type (lecture, practical, placement prep)
- Add tags for easy searching

### Placements
- View available placement opportunities
- Track application status
- Mark yourself as placed

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support

For issues or questions:
1. Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
2. Review API documentation in this README
3. Check backend logs: `docker logs college-platform-backend`
4. Check frontend console (F12 in browser)

---

## 🎯 Roadmap

- [ ] Payment integration for premium features
- [ ] Real-time notifications
- [ ] Video interview support
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Mobile app (React Native)

---

**Built with ❤️ for college students worldwide**

🚀 **[Deploy Now](DEPLOYMENT.md)**

## Features

- **User Authentication**: Secure login and registration with JWT
- **Dashboard**: Personalized student dashboard with statistics
- **Projects**: Showcase college projects, healthcare projects, and internship work
- **Interviews**: Mock interviews, recorded sessions, and live interview preparation
- **Study Notes**: Lecture notes, practical notes, and placement preparation materials
- **Placements**: View placement opportunities and company details
- **Payments**: Secure payment processing for fees and courses
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Tech Stack

### Frontend
- React 18
- React Router DOM
- Axios for API calls
- CSS3 with Flexbox and Grid

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcryptjs for password hashing

### DevOps
- Docker & Docker Compose
- MongoDB in container
- Multi-stage builds for optimization

## Project Structure

```
.
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── utils/
│   ├── package.json
│   ├── Dockerfile
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (or Docker)
- npm or yarn

### Installation

#### Option 1: Using Docker (Recommended)

1. Clone the repository
2. Navigate to the project directory
3. Run Docker Compose:

```bash
docker-compose up --build
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: localhost:27017

#### Option 2: Local Setup

**Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your MongoDB connection string
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

The app will open at http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?category=college` - Filter by category
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Interviews
- `GET /api/interviews` - Get all interviews
- `GET /api/interviews/:id` - Get interview details
- `POST /api/interviews` - Create interview
- `POST /api/interviews/:id/enroll` - Enroll in interview

### Notes
- `GET /api/notes` - Get all notes
- `GET /api/notes?category=lecture` - Filter by category
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note

### Placements
- `GET /api/placements` - Get all placements
- `POST /api/placements/:id/mark-placed` - Apply to placement

### Dashboard
- `GET /api/dashboard/:userId` - Get user dashboard stats

## Environment Variables

**Backend (.env):**
```
MONGODB_URI=mongodb://localhost:27017/college-platform
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

**Frontend (.env):**
```
REACT_APP_API_URL=http://localhost:5000
```

## Deployment

### Docker Hub
```bash
# Build and push images
docker build -t yourusername/college-platform-backend ./backend
docker build -t yourusername/college-platform-frontend ./frontend
docker push yourusername/college-platform-backend
docker push yourusername/college-platform-frontend
```

### Cloud Platforms

**Vercel (Frontend):**
- Connect your GitHub repository
- Set environment variables
- Deploy with one click

**Heroku/Railway (Backend):**
- Push your code
- Set environment variables
- Configure MongoDB Atlas for production

**AWS/Azure/GCP:**
- Use ECS/Container Instances for Docker deployment
- Configure managed databases
- Set up CDN for static assets

## Features Overview

### For Students
- Create and manage projects
- Participate in mock interviews
- Share study notes
- Track placement opportunities
- Make online payments

### For Administrators
- Manage all platform content
- View analytics and statistics
- Handle payment processing
- Create interview sessions
- Manage placements

## Security Features
- Password hashing with Bcryptjs
- JWT token-based authentication
- Protected API routes
- Input validation
- CORS configuration

## Performance Optimizations
- MongoDB indexing
- API response caching
- Image optimization
- Code splitting in React
- Lazy loading components

## Offline Support
- Service worker configuration
- Offline data storage
- Sync when connection restored

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Support
For issues and questions, please create an issue on GitHub or contact support@college-platform.com

## Future Enhancements
- Mobile app (React Native)
- Video streaming integration
- Real-time notifications
- Advanced search and filtering
- Social features (following, messaging)
- AI-powered recommendations
- Advanced analytics dashboard
- Payment gateway integration (Stripe, PayPal)
