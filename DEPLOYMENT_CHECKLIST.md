# ⚡ Quick Plesk Deployment Checklist

## Pre-Deployment
- [ ] Domain added in Plesk
- [ ] Node.js enabled (version 22.x)
- [ ] Database created: `magnetic_clouds`
- [ ] Database user created with password
- [ ] SSH access confirmed

## Step-by-Step

### 1️⃣ Database (5 min)
```bash
mysql -u magnetic_admin -p magnetic_clouds < server/schema.sql
mysql -u magnetic_admin -p magnetic_clouds < create_admin.sql
```

### 2️⃣ Upload Files (10 min)
```bash
git clone https://github.com/thehassans/newcloud.git /var/www/vhosts/yourdomain.com/httpdocs
cd /var/www/vhosts/yourdomain.com/httpdocs
```

### 3️⃣ Configure Backend (5 min)
```bash
cd server
nano .env
```

**Add:**
```env
DB_HOST=localhost
DB_USER=magnetic_admin
DB_PASSWORD=your_db_password
DB_NAME=magnetic_clouds
JWT_SECRET=change-this-secret-key
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
```

### 4️⃣ Install Dependencies (10 min)
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
npm install
cd client
npm install
```

### 5️⃣ Build Frontend (5 min)
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs/client
npm run build
mkdir -p ../public
cp -r dist/* ../public/
```

### 6️⃣ Configure Plesk Node.js App

**Settings:**
- Application Mode: `Production`
- Node.js Version: `22.x`
- Document Root: `/httpdocs`
- Application Root: `/httpdocs`
- Startup File: `server/index.js`

**Environment Variables:** (Copy from .env)

### 7️⃣ Setup Nginx Proxy

**Apache & Nginx Settings → Additional nginx directives:**

```nginx
location /api/ {
    proxy_pass http://localhost:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}

location / {
    try_files $uri $uri/ /index.html;
}
```

### 8️⃣ SSL Certificate (5 min)
- Go to SSL/TLS Certificates
- Install Let's Encrypt
- Enable "Force HTTPS redirect"

### 9️⃣ Start PM2 (Optional but Recommended)
```bash
npm install -g pm2
cd /var/www/vhosts/yourdomain.com/httpdocs
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 🔟 Test Everything

✅ Frontend: `https://yourdomain.com`  
✅ API: `https://yourdomain.com/api/products?type=vps`  
✅ Admin: `https://yourdomain.com/login`  
   - admin@magneticclouds.com / Admin@123456

---

## ⏱️ Total Time: ~45 minutes

## 🆘 Quick Fixes

**API not responding:**
```bash
pm2 restart all
# or in Plesk: Node.js → Restart App
```

**Database error:**
```bash
# Check connection
mysql -u magnetic_admin -p magnetic_clouds
```

**Frontend blank:**
```bash
cd client && npm run build && cp -r dist/* ../public/
```

---

## 📞 Need Help?

Check full guide: `DEPLOYMENT.md`
