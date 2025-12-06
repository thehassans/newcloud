-- Magnetic Clouds Database Schema
-- MariaDB Database

CREATE DATABASE IF NOT EXISTS magnetic_clouds CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE magnetic_clouds;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  country VARCHAR(100),
  role ENUM('user', 'admin') DEFAULT 'user',
  status ENUM('active', 'suspended', 'deleted') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- Product Categories
CREATE TABLE IF NOT EXISTS product_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(255),
  display_order INT DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Products (Servers, Domains, SSL, etc.)
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  type ENUM('vps', 'cloud', 'dedicated', 'domain', 'ssl', 'email', 'backup') NOT NULL,
  
  -- Server Specifications (for VPS/Cloud/Dedicated)
  cpu_cores INT,
  ram_gb INT,
  storage_gb INT,
  bandwidth_tb INT,
  
  -- Features (JSON for flexibility)
  features JSON,
  
  -- Pricing
  price_monthly DECIMAL(10, 2) NOT NULL,
  price_quarterly DECIMAL(10, 2),
  price_semi_annually DECIMAL(10, 2),
  price_annually DECIMAL(10, 2),
  price_biennially DECIMAL(10, 2),
  price_triennially DECIMAL(10, 2),
  
  -- Setup fee
  setup_fee DECIMAL(10, 2) DEFAULT 0,
  
  -- Stock/Availability
  stock_status ENUM('in_stock', 'out_of_stock', 'limited') DEFAULT 'in_stock',
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,
  
  -- Status
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE SET NULL,
  INDEX idx_type (type),
  INDEX idx_slug (slug),
  INDEX idx_active (active)
) ENGINE=InnoDB;

-- Currencies
CREATE TABLE IF NOT EXISTS currencies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(3) UNIQUE NOT NULL,
  name VARCHAR(50) NOT NULL,
  symbol VARCHAR(10) NOT NULL,
  exchange_rate DECIMAL(10, 6) DEFAULT 1.000000,
  is_default BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code)
) ENGINE=InnoDB;

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Pricing
  subtotal DECIMAL(10, 2) NOT NULL,
  discount DECIMAL(10, 2) DEFAULT 0,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency_id INT,
  
  -- Status
  status ENUM('pending', 'processing', 'completed', 'cancelled', 'refunded') DEFAULT 'pending',
  payment_status ENUM('unpaid', 'paid', 'partial', 'refunded') DEFAULT 'unpaid',
  payment_method VARCHAR(50),
  
  -- Billing Info
  billing_address JSON,
  
  -- Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (currency_id) REFERENCES currencies(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_order_number (order_number)
) ENGINE=InnoDB;

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  billing_cycle ENUM('monthly', 'quarterly', 'semi_annually', 'annually', 'biennially', 'triennially') NOT NULL,
  quantity INT DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  setup_fee DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  
  -- Domain specific
  domain_name VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_order (order_id)
) ENGINE=InnoDB;

-- Services (Active User Services)
CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_id INT,
  product_id INT NOT NULL,
  
  -- Service Details
  service_name VARCHAR(255) NOT NULL,
  domain_name VARCHAR(255),
  billing_cycle ENUM('monthly', 'quarterly', 'semi_annually', 'annually', 'biennially', 'triennially') NOT NULL,
  
  -- Dates
  registration_date DATE NOT NULL,
  next_due_date DATE NOT NULL,
  termination_date DATE,
  
  -- Status
  status ENUM('pending', 'active', 'suspended', 'terminated', 'cancelled') DEFAULT 'pending',
  
  -- Pricing
  recurring_amount DECIMAL(10, 2) NOT NULL,
  
  -- Server Details (if applicable)
  server_ip VARCHAR(45),
  server_username VARCHAR(100),
  server_password_encrypted TEXT,
  
  -- Control Panel Access
  control_panel_url VARCHAR(255),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_next_due (next_due_date)
) ENGINE=InnoDB;

-- Invoices
CREATE TABLE IF NOT EXISTS invoices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_id INT,
  invoice_number VARCHAR(50) UNIQUE NOT NULL,
  
  -- Amounts
  subtotal DECIMAL(10, 2) NOT NULL,
  tax DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  currency_id INT,
  
  -- Dates
  invoice_date DATE NOT NULL,
  due_date DATE NOT NULL,
  paid_date DATE,
  
  -- Status
  status ENUM('unpaid', 'paid', 'cancelled', 'refunded') DEFAULT 'unpaid',
  
  -- Payment
  payment_method VARCHAR(50),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (currency_id) REFERENCES currencies(id),
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_invoice_number (invoice_number)
) ENGINE=InnoDB;

-- Data Centers
CREATE TABLE IF NOT EXISTS datacenters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100) NOT NULL,
  city VARCHAR(100) NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  description TEXT,
  icon_url VARCHAR(255),
  active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_country (country)
) ENGINE=InnoDB;

-- Admin Settings
CREATE TABLE IF NOT EXISTS admin_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type ENUM('text', 'number', 'boolean', 'json') DEFAULT 'text',
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (setting_key)
) ENGINE=InnoDB;

-- SEO Meta Tags
CREATE TABLE IF NOT EXISTS seo_meta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page_slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255),
  description TEXT,
  keywords TEXT,
  og_title VARCHAR(255),
  og_description TEXT,
  og_image VARCHAR(255),
  canonical_url VARCHAR(255),
  robots VARCHAR(100) DEFAULT 'index,follow',
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (page_slug)
) ENGINE=InnoDB;

-- Pages Content
CREATE TABLE IF NOT EXISTS pages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status ENUM('draft', 'published') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_status (status)
) ENGINE=InnoDB;

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  department ENUM('sales', 'billing', 'technical', 'general') DEFAULT 'general',
  priority ENUM('low', 'normal', 'high', 'urgent') DEFAULT 'normal',
  status ENUM('open', 'in_progress', 'waiting_reply', 'closed') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_status (status),
  INDEX idx_ticket_number (ticket_number)
) ENGINE=InnoDB;

-- Ticket Replies
CREATE TABLE IF NOT EXISTS ticket_replies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id INT NOT NULL,
  user_id INT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES support_tickets(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_ticket (ticket_id)
) ENGINE=InnoDB;

-- Insert Default Data

-- Default Currencies
INSERT INTO currencies (code, name, symbol, exchange_rate, is_default) VALUES
('USD', 'US Dollar', '$', 1.000000, true),
('BDT', 'Bangladeshi Taka', '৳', 110.000000, false),
('EUR', 'Euro', '€', 0.920000, false),
('GBP', 'British Pound', '£', 0.790000, false),
('INR', 'Indian Rupee', '₹', 83.000000, false);

-- Default Admin Settings
INSERT INTO admin_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'Magnetic Clouds', 'text', 'Website Name'),
('theme_gradient', 'true', 'boolean', 'Enable Gradient Theme'),
('default_currency', 'USD', 'text', 'Default Currency Code'),
('default_language', 'en', 'text', 'Default Language'),
('money_back_days', '45', 'number', 'Money Back Guarantee Days'),
('free_ssl', 'true', 'boolean', 'Free SSL Certificates'),
('support_24_7', 'true', 'boolean', '24/7 Technical Support');

-- Product Categories
INSERT INTO product_categories (name, slug, description, display_order) VALUES
('VPS Servers', 'vps-servers', 'Virtual Private Servers with full root access', 1),
('Cloud Servers', 'cloud-servers', 'Scalable cloud computing solutions', 2),
('Dedicated Servers', 'dedicated-servers', 'High-performance dedicated servers', 3),
('Domains', 'domains', 'Domain registration and transfer', 4),
('Security & Tools', 'security-tools', 'SSL, Email, Backup solutions', 5);

-- Data Centers
INSERT INTO datacenters (name, country, city, latitude, longitude, description, display_order) VALUES
('Dhaka Data Center', 'Bangladesh', 'Dhaka', 23.8103, 90.4125, 'Premium data center in Bangladesh', 1),
('USA East', 'United States', 'New York', 40.7128, -74.0060, 'High-speed US East Coast location', 2),
('USA West', 'United States', 'Los Angeles', 34.0522, -118.2437, 'West Coast data center', 3),
('Europe', 'Germany', 'Frankfurt', 50.1109, 8.6821, 'European hub', 4),
('Asia Pacific', 'Singapore', 'Singapore', 1.3521, 103.8198, 'APAC regional center', 5),
('UK', 'United Kingdom', 'London', 51.5074, -0.1278, 'London data center', 6);

-- Default Pages
INSERT INTO pages (slug, title, content, status) VALUES
('about', 'About Us', 'About Magnetic Clouds - Premium hosting provider in Bangladesh', 'published'),
('contact', 'Contact Us', 'Get in touch with our support team', 'published'),
('support', 'Support', 'Customer support and help center', 'published'),
('terms', 'Terms of Service', 'Terms and conditions for using our services', 'published');
