# AI Talent Intelligence HRMS - Deployment Guide

This guide will walk you through deploying the frontend to Vercel and the backend to Render.

## Prerequisites
1. Accounts on:
   - [Vercel](https://vercel.com)
   - [Render](https://render.com)
2. GitHub/GitLab/Bitbucket account to host your code
3. A Google Gemini API Key (get one from [Google AI Studio](https://aistudio.google.com/))

---

## Step 1: Prepare Your Repository

First, make sure your project is pushed to a Git repository (GitHub, GitLab, or Bitbucket).

### Important Notes for Gitignore
Ensure your `.gitignore` includes:
```
node_modules/
__pycache__/
.venv/
.env
.next/
*.log
*.pyc
.DS_Store
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create a PostgreSQL Database on Render
1. Go to Render Dashboard → **New +** → **PostgreSQL**
2. Fill in details:
   - Name: `hrms-db`
   - Database: `hr_db`
   - User: `hr_user`
3. Click **Create Database**
4. Wait for it to deploy, then copy the **Internal Database URL** (it should start with `postgresql://`)

### 2.2 Deploy the Backend
1. Go to Render Dashboard → **New +** → **Web Service**
2. Connect your repository
3. Configure:
   - **Name**: `ai-hrms-backend`
   - **Region**: Choose one close to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port 10000`
4. Add Environment Variables:
   ```
   DATABASE_URL=<your-render-postgresql-internal-url>
   GEMINI_API_KEY=<your-gemini-api-key>
   JWT_SECRET=<a-random-secret-key-you-create>
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=1440
   ```
5. Click **Create Web Service** and wait for it to deploy
6. Once deployed, copy your backend URL (it will look like `https://ai-hrms-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **New Project**
2. Import your Git repository
3. Configure:
   - **Project Name**: `ai-hrms-frontend`
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js (should be detected automatically)
4. Add Environment Variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `<your-render-backend-url>` (from Step 2.6, e.g., `https://ai-hrms-backend.onrender.com`)
5. Click **Deploy** and wait for it to finish
6. Once deployed, you'll get your frontend URL (e.g., `https://ai-hrms-frontend.vercel.app`)

---

## Step 4: Test Your Deployment

1. Open your frontend URL
2. Use the demo credentials from `README.md` to log in:
   - Admin: `admin@hrms.com` / `admin123`
   - CEO: `ceo@hrms.com` / `ceo123`
   - Senior Manager: `manager@hrms.com` / `manager123`
   - HR Recruiter: `recruiter@hrms.com` / `recruiter123`
   - Employee: `employee@hrms.com` / `employee123`
   - Candidate: `candidate@hrms.com` / `candidate123`

---

## Troubleshooting

### Backend Issues
- If the backend fails to start, check the Render logs for errors
- Make sure `DATABASE_URL` starts with `postgresql://` (our code automatically converts it to `postgresql+asyncpg://`)

### Frontend Issues
- If the frontend can't connect to the backend, double-check `NEXT_PUBLIC_API_URL` in Vercel environment variables
- Remember to redeploy the frontend after changing environment variables

### CORS
The backend already has CORS configured to allow all origins, which is fine for deployment. You can restrict it later by updating `allow_origins` in `backend/app/main.py` if needed.

---

## Optional: Add Redis (For Real-Time Features)

If you want real-time notifications to work properly, you can add a Redis instance on Render:
1. Render → New + → Redis
2. Name: `hrms-redis`
3. Deploy it, then add `REDIS_URL=<your-redis-internal-url>` to your backend environment variables and redeploy
