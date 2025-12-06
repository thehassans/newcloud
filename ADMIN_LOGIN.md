# 🔐 ADMIN LOGIN - QUICK FIX

The admin login isn't working because the admin user hasn't been created in the database yet.

## ⚡ Quick Solution (3 Steps)

### Step 1: Create the admin user in database

Run this command in your MySQL/MariaDB:

```bash
mysql -u root -p
```

Then paste this:

```sql
USE magnetic_clouds;

DELETE FROM users WHERE email = 'admin@magneticclouds.com';

INSERT INTO users (email, password, first_name, last_name, role, status, created_at, updated_at)
VALUES (
  'admin@magneticclouds.com',
  '$2b$10$LzAM0NUJkRK7aRTTCyDFNewXkhhsyfA3EKsL.o48GEyfdnkGYzVG.',
  'Admin',
  'User',
  'admin',
  'active',
  NOW(),
  NOW()
);

SELECT * FROM users WHERE role='admin';
```

### Step 2: Verify backend is running

Make sure your backend server is running on port 5000:
- Check the terminal running `npm run dev` in `/cloudmagnet`
- Should show: "Server running on port 5000"

### Step 3: Login

Go to: http://localhost:5173/login

**Email:** `admin@magneticclouds.com`  
**Password:** `Admin@123456`

---

## Alternative: Use SQL File

```bash
cd /Users/hassansarwar/Desktop/cloudmagnet
mysql -u root -p magnetic_clouds < create_admin.sql
```

---

## If Still Not Working

1. **Check if database exists:**
   ```bash
   mysql -u root -p -e "SHOW DATABASES LIKE 'magnetic_clouds';"
   ```

2. **Check if users table exists:**
   ```bash
   mysql -u root -p magnetic_clouds -e "SHOW TABLES LIKE 'users';"
   ```

3. **If tables don't exist, create them:**
   ```bash
   mysql -u root -p magnetic_clouds < server/schema.sql
   ```

4. **Test login API:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@magneticclouds.com","password":"Admin@123456"}'
   ```

---

## Admin Access After Login

Once logged in, you can access:
- http://localhost:5173/admin - Admin Dashboard
- All admin management pages

---

**Need Help?** Make sure:
1. MySQL/MariaDB is running
2. Database `magnetic_clouds` exists
3. Backend server is running (port 5000)
4. Frontend is running (port 5173)
