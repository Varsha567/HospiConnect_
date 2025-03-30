-- Database creation
CREATE DATABASE IF NOT EXISTS master;
USE master;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- -- Add indexes
-- CREATE INDEX idx_email ON users(email);
-- CREATE INDEX idx_username ON users(username);