# Todo App - Deployment Guide

## User-Specific Todo Implementation

Your Todo app has been updated to support user-specific todos. Each user can only see and manage their own tasks.

### What Changed:
1. **Todo Model**: Now includes `userId` field to link todos to specific users
2. **Authentication**: User information is managed via user context
3. **Todo Filtering**: Todos are automatically filtered to show only the logged-in user's tasks
4. **Security**: Users cannot access, edit, or delete other users' todos

### Deployment Steps:

#### Option 1: Deploy to Render (Recommended - Free)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit with user-specific todos"
   git remote add origin https://github.com/YOUR-USERNAME/todo-app.git
   git push -u origin main
   ```

2. **Go to Render.com:**
   - Sign up at https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Fill in the details:
     - **Name**: todo-app
     - **Runtime**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
   
3. **Add Environment Variables:**
   - In Render dashboard, go to "Environment"
   - Add: `MONGOURI=your_mongodb_connection_string`

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Your app will be live at: `https://todo-app.onrender.com`

---

#### Option 2: Deploy to Railway.app

1. **Sign up at Railway.app**
2. **Create a new project** and connect your GitHub repo
3. **Add MongoDB URI** in the variables section
4. **Deploy** - Railway will automatically detect Node.js

---

#### Option 3: Deploy to Heroku (Requires Credit Card)

1. **Install Heroku CLI**
2. **Login**: `heroku login`
3. **Create app**: `heroku create your-app-name`
4. **Set environment variable**:
   ```bash
   heroku config:set MONGOURI=your_mongodb_connection_string
   ```
5. **Deploy**: `git push heroku main`

---

### Testing User-Specific Todos:

1. **Sign up** with a new account at `/signup`
2. **Login** with those credentials
3. **Create todos** - they will only be visible to this user
4. **Open in incognito/private window** and login with a different account
5. **Verify** that different users see different todos

### Important Notes:

- The app stores user information in MongoDB
- Each user's todos are encrypted to their user ID
- Users must login to see their todos
- The logout functionality can be added to the dashboard view

---

### Your MongoDB Connection:
- MongoDB is already configured in `.env`
- Make sure your MongoDB IP whitelist includes your hosting provider's IP range

