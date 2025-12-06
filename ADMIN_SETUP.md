# 🔐 Admin Login Setup Guide

## Quick Setup (Choose ONE method)

### Method 1: Using Node.js Script (Recommended) ⚡

```bash
# Navigate to project directory
cd /Users/hassansarwar/Desktop/cloudmagnet

# Run the admin creation script
node create-admin.js
```

This will:
- Generate a properly hashed password
- Create the admin user in the database
- Show you the login credentials

---

### Method 2: Using MySQL/MariaDB Command Line

```bash
# Run the SQL script
mysql -u root -p magnetic_clouds < create_admin.sql
```

---

## Admin Credentials

After running either method above:

**Email:** `admin@magneticclouds.com`  
**Password:** `Admin@123456`

**Login URL:** http://localhost:5173/login

---

## Troubleshooting

### If login still doesn't work:

1. **Check database connection:**
   ```bash
   mysql -u root -p magnetic_clouds -e "SELECT * FROM users WHERE role='admin';"
   ```

2. **Verify .env file has correct database credentials:**
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=magnetic_clouds
   ```

3. **Check if backend server is running:**
   - Should be running on http://localhost:5000
   - Check terminal for any errors

4. **Test API endpoint directly:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@magneticclouds.com","password":"Admin@123456"}'
   ```

### Common Issues:

**"Invalid credentials"**
- Run the create-admin.js script again
- Make sure password is exactly: `Admin@123456`

**"Cannot connect to database"**
- Check if MySQL/MariaDB is running
- Verify .env database credentials

**"User not found"**
- Run create-admin.js to create the user
- Check if `users` table exists in database

---

## Manual Database Setup (If needed)

If you need to create the user manually with a specific password:

```javascript
// Generate password hash
const bcrypt = require('bcrypt');
bcrypt.hash('YOUR_PASSWORD', 10).then(hash => console.log(hash));
```

Then insert into database:
```sql
INSERT INTO users (email, password, first_name, last_name, role, status, created_at, updated_at)
VALUES ('admin@magneticclouds.com', 'PASTE_HASH_HERE', 'Admin', 'User', 'admin', 'active', NOW(), NOW());
```

---

## Next Steps After Login

Once logged in as admin, you can access:

- `/admin` - Dashboard
- `/admin/products` - Manage products
- `/admin/users` - Manage users  
- `/admin/orders` - View orders
- `/admin/pricing` - Update pricing
- `/admin/settings` - Configure platform
- `/admin/analytics` - View analytics
- `/admin/datacenters` - Manage locations
- `/admin/currencies` - Manage exchange rates

---

**Need Help?** Check that:
1. ✅ Database is created and schema is loaded
2. ✅ Backend server is running (port 5000)
3. ✅ Frontend is running (port 5173)
4. ✅ Admin user is created in database
