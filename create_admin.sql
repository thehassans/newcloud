-- Create admin user with correct password_hash column name
-- Password: Admin@123456

USE magnetic_clouds;

-- Delete any existing admin user
DELETE FROM users WHERE email = 'admin@magneticclouds.com';

-- Insert admin user (note: using password_hash column, not password)
INSERT INTO users (
  email,
  password_hash,
  first_name,
  last_name,
  role,
  status,
  created_at,
  updated_at
) VALUES (
  'admin@magneticclouds.com',
  '$2b$10$LzAM0NUJkRK7aRTTCyDFNewXkhhsyfA3EKsL.o48GEyfdnkGYzVG.',
  'Admin',
  'User',
  'admin',
  'active',
  NOW(),
  NOW()
);

-- Verify admin user was created
SELECT id, email, first_name, last_name, role, status FROM users WHERE email = 'admin@magneticclouds.com';
