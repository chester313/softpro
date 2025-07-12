/*
  # Add admin user

  1. New Data
    - Add admin user with username 'corvax' and password 'corvax2025#6007'
  
  2. Security
    - Uses the existing admin_users table structure
*/

-- Insert the new admin user
INSERT INTO admin_users (username, password_hash) 
VALUES ('corvax', 'corvax2025#6007')
ON CONFLICT (username) DO UPDATE SET 
  password_hash = EXCLUDED.password_hash;