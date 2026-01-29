# Installation & Running Instructions

## Prerequisites

- Node.js 18+ and npm
- MongoDB 5.0+ (or Docker)
- Git
- Code editor (VS Code recommended)

---

## Option 1: Quick Start with Docker (Recommended)

### Step 1: Install Docker
- Download from https://www.docker.com/products/docker-desktop
- Install and start Docker

### Step 2: Run the Project
```bash
# Navigate to project directory
cd "c:\Users\dubas\Desktop\New folder"

# Start all services
docker-compose up --build
```

This will start:
- **Frontend** at http://localhost:3000
- **Backend** at http://localhost:5000
- **MongoDB** at localhost:27017

### Step 3: Access the Application
1. Open browser to http://localhost:3000
2. Register a new account or use test credentials
3. Start using the platform!

### Stopping Services
```bash
docker-compose down
```

---

## Option 2: Local Development Setup

### Step 1: Install MongoDB

**Windows:**
1. Download from https://www.mongodb.com/try/download/community
2. Run installer
3. Choose "Install MongoDB as a Windows Service"
4. MongoDB starts automatically

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
sudo systemctl start mongodb
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (if not exists)
# Content:
# MONGODB_URI=mongodb://localhost:27017/college-platform
# JWT_SECRET=your_jwt_secret_key_here
# PORT=5000
# NODE_ENV=development

# Start backend server
npm run dev
```

Backend will start on http://localhost:5000

**Expected output:**
```
Server running on port 5000
MongoDB connected
```

### Step 3: Frontend Setup (New Terminal)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm start
```

Frontend will open at http://localhost:3000

**Expected output:**
```
Compiled successfully!
You can now view the app in the browser.
```

---

## Testing the Application

### 1. Register New Account
- Click "Register" link on login page
- Fill in the form:
  - Name: Your Name
  - Email: yourname@college.com
  - Password: Any secure password
  - College ID: COLL12345
  - Year: Select 4th Year
  - Department: Computer Science
- Click Register

### 2. Test Dashboard
- After login, see your dashboard
- View statistics and quick actions

### 3. Add a Project
- Go to Projects page
- Click "Add New Project"
- Fill in details:
  - Title: My Sample Project
  - Description: A great project
  - Category: College
  - Technologies: React, Node.js, MongoDB
  - Live Link: https://example.com
  - GitHub: https://github.com/example
- Click Create Project

### 4. Explore Other Sections
- **Interviews**: View interview opportunities
- **Notes**: Add and view study notes
- **Placements**: Check placement opportunities

---

## Project Setup on Windows (Step-by-step)

### Using Command Prompt or PowerShell

```bash
# 1. Navigate to project folder
cd "c:\Users\dubas\Desktop\New folder"

# 2. Run setup script
setup.bat

# 3. Start backend (Terminal 1)
cd backend
npm run dev

# 4. Start frontend (Terminal 2)
cd frontend
npm start
```

---

## Troubleshooting

### Port 3000 Already in Use
```powershell
# Kill process on port 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Port 5000 Already in Use
```powershell
# Kill process on port 5000
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### MongoDB Connection Error
```bash
# Check MongoDB is running
# Windows: Services > MongoDB Server
# macOS: brew services list
# Linux: systemctl status mongodb

# Or use Docker MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:5.0

# Update .env with correct URI if using Docker
MONGODB_URI=mongodb://localhost:27017/college-platform
```

### npm install fails
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -r node_modules
rm package-lock.json

# Install again
npm install
```

### Token/Login Issues
1. Clear browser localStorage:
   - Open DevTools (F12)
   - Application > Local Storage
   - Clear all entries
2. Refresh page
3. Try login again

### CORS Errors
- Check backend is running on port 5000
- Check frontend is on localhost:3000
- Check corsConfig.js has correct origins

---

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/college-platform
JWT_SECRET=your_jwt_secret_key_here_change_in_production
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

---

## File Locations

### Important Backend Files
- Entry point: `backend/src/index.js`
- Models: `backend/src/models/`
- Routes: `backend/src/routes/`
- Environment: `backend/.env`

### Important Frontend Files
- Entry point: `frontend/src/index.js`
- Main app: `frontend/src/App.js`
- Pages: `frontend/src/pages/`
- Components: `frontend/src/components/`
- Environment: `frontend/.env`

---

## Development Tips

### Adding New Features

1. **Add Backend Route:**
   - Create new file in `backend/src/routes/feature.js`
   - Export router from `backend/src/index.js`

2. **Add Frontend Page:**
   - Create component in `frontend/src/pages/Feature.js`
   - Add styling in `frontend/src/pages/Feature.css`
   - Add route in `frontend/src/App.js`

3. **Add Database Model:**
   - Create schema in `backend/src/models/Feature.js`
   - Use in routes with mongoose

### Debugging

```bash
# Check backend logs
# Terminal should show console.log outputs

# Check frontend console
# Press F12 in browser, go to Console tab

# Check network requests
# DevTools > Network tab, look for API calls
```

---

## Production Deployment

### Deploy Backend to Railway/Heroku
1. Create account on railway.app
2. Connect GitHub repository
3. Set environment variables:
   - MONGODB_URI=your_atlas_uri
   - JWT_SECRET=your_secret
4. Deploy

### Deploy Frontend to Vercel
1. Push code to GitHub
2. Connect to Vercel
3. Select frontend folder as root
4. Set REACT_APP_API_URL to production backend URL
5. Deploy

### Using Docker
```bash
# Build images
docker build -t college-backend ./backend
docker build -t college-frontend ./frontend

# Run containers
docker run -d -p 5000:5000 --name backend college-backend
docker run -d -p 3000:3000 --name frontend college-frontend
```

---

## Performance Tips

1. **Clear browser cache** if styles don't update
2. **Hard refresh** (Ctrl+Shift+R) if frontend doesn't reload
3. **Restart backend** if APIs return errors
4. **Check MongoDB** connection if data doesn't save
5. **Use DevTools** to monitor network requests

---

## Next Steps

After successful setup:
1. Customize colors/branding
2. Add your college logo
3. Configure payment gateway
4. Set up email notifications
5. Deploy to production
6. Monitor performance

---

## Support Resources

- Backend errors: Check `backend` terminal
- Frontend errors: Check browser console (F12)
- Database errors: Check MongoDB status
- Deployment: Read [README.md](README.md)
- Quick help: Check [QUICKSTART.md](QUICKSTART.md)

---

## Success Indicators

You'll know everything is working when:
1. ✅ Docker containers are all running (or local servers)
2. ✅ Frontend loads at http://localhost:3000
3. ✅ Can register a new account
4. ✅ Can login successfully
5. ✅ Dashboard shows statistics
6. ✅ Can create projects
7. ✅ Can view all pages without errors

---

Enjoy your complete college platform! 🎓🚀
