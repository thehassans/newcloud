# 🚀 Quick Start Guide - Magnetic Clouds

## Prerequisites
- Node.js 24.11.1
- MariaDB/MySQL
- A code editor

## Step 1: Set Up Database

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE magnetic_clouds"

# Import schema
mysql -u root -p magnetic_clouds < server/schema.sql
```

## Step 2: Configure Environment

Create `.env` in project root:

```env
NODE_ENV=development
PORT=5000
BASE_URL=http://localhost:5000

# Update these with your database credentials
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=magnetic_clouds
DB_PORT=3306

JWT_SECRET=dev_secret_key_change_in_production
UPLOAD_LIMIT=10mb
MAX_FILE_SIZE=10485760

CLIENT_URL=http://localhost:5173
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Magnetic Clouds
```

## Step 3: Install Dependencies

```bash
# Backend dependencies
npm install

# Frontend dependencies
cd client
npm install
cd ..
```

## Step 4: Run the Application

**Option A: Two terminals**

```bash
# Terminal 1 - Backend
npm run dev

# Terminal 2 - Frontend
npm run client
```

**Option B: Or run together (requires `concurrently`)**

```bash
npm run install-all  # Install all deps
# Then open two terminals as in Option A
```

## Step 5: Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## 🎨 Test Features

1. **Browse Homepage** - See the premium gradient design
2. **Sign Up** - Create a new account
3. **Log In** - Access your dashboard
4. **Explore Services** - VPS, Cloud, Dedicated servers
5. **Toggle Theme** - Check theme switching (will add UI control)

## 🔐 Default Admin Credentials

Email: `admin@magneticclouds.com`  
Password: `ChangeThisPassword123!`

*Login doesn't work yet without database records - you'll need to signup first!*

## 📁 Project Structure

```
cloudmagnet/
├── server/           # Backend Node.js
├── client/           # Frontend React
├── uploads/          # File uploads (created automatically)
├── .env              # Backend environment
└── package.json      # Backend dependencies
```

## ⚡ Next Steps

1. ✅ **Database** - Import schema
2. ✅ **Environment** - Configure .env files
3. ✅ **Dependencies** - npm install
4. ✅ **Run** - Start dev servers
5. 🔨 **Develop** - Start building features!

## 🛠️ Development Tips

**Backend changes:**
- Server auto-restarts (if using nodemon)
- Check logs in terminal

**Frontend changes:**
- Hot reload enabled via Vite
- Check browser console for errors

**Database changes:**
- Use phpMyAdmin or MySQL Workbench
- Or command line: `mysql -u root -p magnetic_clouds`

## 🐛 Common Issues

**Can't connect to database?**
- Check MySQL is running
- Verify credentials in `.env`
- Ensure database exists

**Port 5000 already in use?**
- Change `PORT` in `.env`
- Kill existing process: `lsof -ti:5000 | xargs kill`

**Frontend won't load?**
- Check backend is running
- Verify `VITE_API_URL` in `client/.env`

## 📚 Documentation

- [README.md](file:///Users/hassansarwar/Desktop/cloudmagnet/README.md) - Full documentation
- [DEPLOYMENT.md](file:///Users/hassansarwar/.gemini/antigravity/brain/c8bf7ac2-4929-42bc-bbd1-5f14916f626d/DEPLOYMENT.md) - Plesk deployment guide
- [walkthrough.md](file:///Users/hassansarwar/.gemini/antigravity/brain/c8bf7ac2-4929-42bc-bbd1-5f14916f626d/walkthrough.md) - What's been built

---

**🎉 You're all set! Start developing your premium hosting platform!**
