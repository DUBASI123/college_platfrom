# College Platform - Deployment Guide

This guide covers deploying your college platform to production using Render (backend) and Vercel (frontend) with MongoDB Atlas.

## Quick Start (Local Docker)

Run the entire stack locally with Docker Compose:

```bash
docker-compose up --build
```

Access:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **MongoDB**: localhost:27017

Stop with `docker-compose down`.

---

## Production Deployment

### Step 1: GitHub Setup

1. Create a GitHub account if you don't have one: https://github.com
2. Create a new repository named `college-platform`
3. Initialize local git:

```bash
cd "c:\Users\dubas\Desktop\New folder"
git init
git add .
git commit -m "Initial commit: College platform full stack"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/college-platform.git
git push -u origin main
```

---

### Step 2: MongoDB Atlas (Database)

1. Go to https://www.mongodb.com/cloud/atlas and sign up (free tier available)
2. Create a new Project
3. Create a Cluster (select free tier M0)
4. Under "Database Access", create a database user:
   - Username: `collegedbuser`
   - Password: generate a strong password, save it
5. Under "Network Access", add IP `0.0.0.0/0` (or restrict to Render IPs later)
6. Click "Connect" → "Connect your application"
7. Copy the connection string, replace `<password>` with your password:
   ```
   mongodb+srv://collegedbuser:<password>@cluster0.xxxxx.mongodb.net/college-platform?retryWrites=true&w=majority
   ```

**Save this connection string** — you'll use it in Render environment variables.

---

### Step 3: Deploy Backend to Render

1. Go to https://render.com and sign up (free tier available)
2. Click "New +" → "Web Service"
3. Select "Deploy an existing repository" → Connect your GitHub account
4. Select your `college-platform` repository
5. Configure:
   - **Name**: `college-platform-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Scroll down to "Environment" and add:
   - `MONGODB_URI`: Paste your Atlas connection string
   - `JWT_SECRET`: Generate a strong random string (e.g., `your_secret_key_12345_change_this`)
   - `NODE_ENV`: `production`
7. Click "Create Web Service"
8. Wait for deployment (2-3 minutes)
9. Once deployed, note the backend URL (e.g., `https://college-platform-backend.onrender.com`)

---

### Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com and sign up (free tier available)
2. Click "Add New…" → "Project"
3. Select "Import Git Repository" → Select your `college-platform` repo
4. Configure:
   - **Project Name**: `college-platform-frontend`
   - **Framework Preset**: React
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Under "Environment Variables", add:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your Render backend URL (e.g., `https://college-platform-backend.onrender.com`)
6. Click "Deploy"
7. Wait for deployment (1-2 minutes)
8. Once deployed, your app is live! Vercel provides a public URL.

---

### Step 5: Test Live Application

1. Open your Vercel frontend URL in a browser
2. Register a new account
3. Login with your credentials
4. You should see the Dashboard with Projects, Notes, Interviews, and Placements
5. Test logout — should return to login screen

---

## Troubleshooting

### Backend not responding
- Check Render logs: Dashboard → your service → "Logs"
- Verify `MONGODB_URI` is correct in Render environment variables
- Ensure MongoDB Atlas IP whitelist allows `0.0.0.0/0` or Render's IP

### Frontend can't reach backend
- Verify `REACT_APP_API_URL` is set to your Render backend URL in Vercel
- Check browser console (F12) for CORS errors
- Ensure backend CORS allows frontend domain

### Database connection errors
- Test MongoDB connection string locally first
- Verify username/password in connection string
- Check MongoDB Atlas cluster is running and accepting connections

---

## Custom Domain (Optional)

**Render Backend:**
1. Go to Render dashboard → Your service → Settings
2. Under "Custom Domain", add your domain
3. Follow DNS instructions

**Vercel Frontend:**
1. Go to Vercel project settings → "Domains"
2. Add your domain
3. Follow DNS instructions

---

## Security Best Practices

1. **Change JWT_SECRET** to a strong random value in production
2. **MongoDB Atlas**: Restrict IP access to Render backend IP after initial setup
3. **HTTPS**: Both Render and Vercel provide HTTPS by default
4. **Environment Variables**: Never commit `.env` files; use platform environment variables
5. **API Keys**: Store sensitive keys in environment variables, not in code

---

## Scaling & Optimization

- **Database**: Upgrade MongoDB cluster tier if needed
- **Backend**: Upgrade Render instance type for higher traffic
- **Frontend**: Vercel auto-scales; no action needed
- **Caching**: Add Redis for session caching (advanced)
- **CDN**: Both platforms include CDN by default

---

## Support & Resources

- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://docs.atlas.mongodb.com
- Express.js: https://expressjs.com
- React: https://react.dev

---

## Rollback & Updates

To update your deployed app:
1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your message"
   git push
   ```
3. Render and Vercel auto-redeploy on push
4. Monitor logs for errors

---

**Your college platform is now live! 🚀**
