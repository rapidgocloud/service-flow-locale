
-- Create database
CREATE DATABASE IF NOT EXISTS rapi9977_2025Suc CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rapi9977_2025Suc;

-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    language ENUM('en', 'es', 'pt') DEFAULT 'en',
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    country VARCHAR(100),
    status ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category ENUM('hosting', 'vps', 'dedicated', 'cybersecurity') NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    billing_cycle ENUM('monthly', 'yearly') DEFAULT 'monthly',
    features JSON,
    status ENUM('active', 'inactive', 'draft') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    status ENUM('pending', 'active', 'suspended', 'cancelled') DEFAULT 'pending',
    amount DECIMAL(10, 2) NOT NULL,
    billing_cycle ENUM('monthly', 'yearly') DEFAULT 'monthly',
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
);

-- Support tickets table
CREATE TABLE support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    category VARCHAR(100) NOT NULL,
    admin_response TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Invoices table
CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    order_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'paid', 'overdue', 'cancelled') DEFAULT 'pending',
    due_date DATE NOT NULL,
    paid_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- System settings table
CREATE TABLE system_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- INSERT TEST DATA

-- Insert test users
INSERT INTO users (name, email, password, role, language, phone, address, city, state, zip_code, country, status) VALUES
('Admin User', 'admin@demo.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin', 'en', '+1-555-0101', '123 Admin St', 'New York', 'NY', '10001', 'USA', 'active'),
('John Smith', 'john@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', 'en', '+1-555-0102', '456 Oak Ave', 'Los Angeles', 'CA', '90001', 'USA', 'active'),
('Maria Garcia', 'maria@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', 'es', '+34-600-123456', 'Calle Mayor 123', 'Madrid', 'Madrid', '28001', 'Spain', 'active'),
('João Silva', 'joao@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', 'pt', '+55-11-98765432', 'Rua das Flores 456', 'São Paulo', 'SP', '01234-567', 'Brazil', 'active'),
('Sarah Johnson', 'sarah@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', 'en', '+1-555-0103', '789 Pine St', 'Chicago', 'IL', '60601', 'USA', 'active'),
('Carlos Rodriguez', 'carlos@example.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'customer', 'es', '+52-55-12345678', 'Av. Reforma 789', 'Mexico City', 'CDMX', '06500', 'Mexico', 'suspended');

-- Insert test services
INSERT INTO services (name, description, category, price, billing_cycle, features, status) VALUES
('Web Hosting Basic', 'Perfect for small websites and blogs', 'hosting', 4.99, 'monthly', '["5GB Storage", "50GB Bandwidth", "1 Email Account", "Basic Support"]', 'active'),
('Web Hosting Pro', 'Ideal for growing businesses', 'hosting', 9.99, 'monthly', '["20GB Storage", "200GB Bandwidth", "10 Email Accounts", "SSL Certificate", "24/7 Support"]', 'active'),
('VPS Standard', 'Virtual Private Server for developers', 'vps', 29.99, 'monthly', '["2 CPU Cores", "4GB RAM", "50GB SSD", "Root Access", "24/7 Support"]', 'active'),
('VPS Pro', 'High-performance VPS solution', 'vps', 59.99, 'monthly', '["4 CPU Cores", "8GB RAM", "100GB SSD", "Root Access", "Backup Service", "Premium Support"]', 'active'),
('Dedicated Basic', 'Entry-level dedicated server', 'dedicated', 199.99, 'monthly', '["4 CPU Cores", "16GB RAM", "500GB HDD", "Full Control", "24/7 Monitoring"]', 'active'),
('Dedicated Pro', 'High-end dedicated server', 'dedicated', 399.99, 'monthly', '["8 CPU Cores", "32GB RAM", "1TB SSD", "Full Control", "Advanced Monitoring", "Premium Support"]', 'active'),
('Security Basic', 'Essential cybersecurity package', 'cybersecurity', 19.99, 'monthly', '["Malware Scanning", "Basic Firewall", "Security Reports"]', 'active'),
('Security Advanced', 'Comprehensive security solution', 'cybersecurity', 49.99, 'monthly', '["Advanced Malware Protection", "WAF", "DDoS Protection", "24/7 Monitoring", "Incident Response"]', 'active');

-- Insert test orders
INSERT INTO orders (user_id, service_id, status, amount, billing_cycle, expires_at) VALUES
(2, 2, 'active', 9.99, 'monthly', DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(2, 7, 'active', 19.99, 'monthly', DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(3, 1, 'active', 4.99, 'monthly', DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(4, 3, 'pending', 29.99, 'monthly', DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(5, 4, 'active', 59.99, 'monthly', DATE_ADD(NOW(), INTERVAL 1 MONTH)),
(6, 5, 'suspended', 199.99, 'monthly', DATE_ADD(NOW(), INTERVAL 15 DAY));

-- Insert test support tickets
INSERT INTO support_tickets (user_id, subject, message, priority, status, category) VALUES
(2, 'Website Loading Slowly', 'My website has been loading very slowly for the past few days. Can you help me identify the issue?', 'medium', 'open', 'technical'),
(3, 'Problema con SSL', 'No puedo instalar el certificado SSL en mi sitio web. ¿Pueden ayudarme?', 'high', 'in_progress', 'technical'),
(4, 'Dúvida sobre faturamento', 'Tenho uma dúvida sobre minha última fatura. O valor parece estar incorreto.', 'low', 'resolved', 'billing'),
(5, 'Email Configuration', 'I need help setting up email accounts for my domain. The instructions are not clear.', 'medium', 'open', 'technical'),
(2, 'Backup Restoration', 'I accidentally deleted some files and need to restore from backup. How can I do this?', 'high', 'in_progress', 'technical'),
(6, 'Account Suspension', 'My account was suspended but I have paid all invoices. Please review my account status.', 'high', 'open', 'billing');

-- Insert test invoices
INSERT INTO invoices (user_id, order_id, amount, status, due_date, paid_at) VALUES
(2, 1, 9.99, 'paid', CURDATE(), NOW()),
(2, 2, 19.99, 'paid', CURDATE(), NOW()),
(3, 3, 4.99, 'paid', CURDATE(), NOW()),
(4, 4, 29.99, 'pending', DATE_ADD(CURDATE(), INTERVAL 7 DAY), NULL),
(5, 5, 59.99, 'paid', CURDATE(), NOW()),
(6, 6, 199.99, 'overdue', DATE_SUB(CURDATE(), INTERVAL 5 DAY), NULL);

-- Insert system settings
INSERT INTO system_settings (setting_key, setting_value) VALUES
('stripe_publishable_key', ''),
('stripe_secret_key', ''),
('stripe_webhook_secret', ''),
('company_name', 'Your Company Name'),
('company_email', 'support@yourcompany.com'),
('company_phone', '+1-555-0100'),
('default_language', 'en'),
('currency', 'USD'),
('timezone', 'UTC');

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_invoices_status ON invoices(status);
