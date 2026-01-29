# Quick Start Guide

## Starting the Application

### Using Docker (Recommended)

1. **Build and run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

3. **Stop the application:**
   ```bash
   docker-compose down
   ```

### Using Local Development

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend runs on http://localhost:5000

2. **Frontend Setup (in new terminal):**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend opens at http://localhost:3000

3. **Make sure MongoDB is running:**
   - If local: `mongod`
   - If Docker: `docker run -d -p 27017:27017 mongo:5.0`

## Default Test Credentials

After registering, use these to test:
- **Email:** student@college.com
- **Password:** password123
- **College ID:** COLL12345
- **Year:** 4
- **Department:** Computer Science

## Testing Features

### 1. Authentication
- Register a new account
- Login with credentials
- Check localStorage for token

### 2. Dashboard
- View statistics after login
- Navigate through different sections

### 3. Projects
- Add a new project with technologies
- Filter by category (College, Healthcare, Internship)
- View all student projects

### 4. Interviews
- Browse mock interviews
- Enroll in interview sessions
- Filter by type (Mock, Recorded, Live)

### 5. Notes
- Create study notes
- Add tags and categories
- Filter by subject or type

### 6. Placements
- View company placement details
- Check CTC and requirements
- Apply to placements

## API Testing with Postman

### Base URL
```
http://localhost:5000/api
```

### Example Requests

**Register:**
```
POST /auth/register
{
  "name": "John Doe",
  "email": "john@college.com",
  "password": "password123",
  "collegeId": "COLL12345",
  "year": 4,
  "department": "CSE"
}
```

**Login:**
```
POST /auth/login
{
  "email": "john@college.com",
  "password": "password123"
}
```

**Get Dashboard:**
```
GET /dashboard/{userId}
Headers: Authorization: {token}
```

## Deployment

### Frontend Deployment (Vercel)
```bash
npm install -g vercel
vercel
```

### Backend Deployment (Railway/Heroku)
1. Add environment variables
2. Set MONGODB_URI to MongoDB Atlas connection
3. Deploy with platform CLI

### Docker Push to Registry
```bash
docker build -t yourusername/college-backend ./backend
docker push yourusername/college-backend

docker build -t yourusername/college-frontend ./frontend
docker push yourusername/college-frontend
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### MongoDB Connection Error
- Check MONGODB_URI in .env
- Ensure MongoDB is running
- Check firewall settings

### CORS Error
- Check corsConfig.js for allowed origins
- Ensure frontend URL is whitelisted

### Token Issues
- Clear localStorage and login again
- Check JWT_SECRET in .env matches backend

## Project File Structure

```
college-platform/
├── backend/
│   ├── src/
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, CORS
│   │   └── config/          # Configuration
│   ├── package.json
│   ├── .env
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── pages/           # React pages
│   │   ├── components/      # Reusable components
│   │   ├── utils/           # Helper functions
│   │   └── App.js           # Main component
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Next Steps

1. Customize the application with your college details
2. Set up MongoDB Atlas for production
3. Configure payment gateway (Stripe/PayPal)
4. Add more features like:
   - Video uploads
   - Real-time notifications
   - Advanced search
   - Social features

## Support

For issues, check:
1. Browser console for errors
2. Backend terminal logs
3. MongoDB connection status
4. Network tab in DevTools

Happy coding! 🎓
