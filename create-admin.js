// Quick script to create admin user (ES Module version)
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    // Hash the password
    const password = 'Admin@123456';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('🔐 Hashed password generated');
    
    // Connect to database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'magnetic_clouds'
    });
    
    console.log('✅ Connected to database');
    
    // Delete existing admin if any
    await connection.execute(
      'DELETE FROM users WHERE email = ?',
      ['admin@magneticclouds.com']
    );
    
    // Insert admin user
    const [result] = await connection.execute(
      `INSERT INTO users (email, password, first_name, last_name, role, status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        'admin@magneticclouds.com',
        hashedPassword,
        'Admin',
        'User',
        'admin',
        'active'
      ]
    );
    
    console.log('✅ Admin user created successfully!');
    console.log('\n📧 Email: admin@magneticclouds.com');
    console.log('🔑 Password: Admin@123456');
    console.log('\n🚀 You can now login at: http://localhost:5173/login');
    
    await connection.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Make sure MySQL/MariaDB is running!');
    } else if (error.code === 'ER_NO_SUCH_TABLE') {
      console.error('\n💡 Run schema.sql first to create the users table!');
    }
    process.exit(1);
  }
}

createAdmin();
