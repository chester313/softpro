/*
  # Fix admin user credentials

  1. Updates
    - Update admin user with correct password
    - Ensure username is 'corvax' and password is 'corvax2025#6007'
*/

-- Delete existing admin user if exists
DELETE FROM admin_users WHERE username = 'corvax';

-- Insert the correct admin user
INSERT INTO admin_users (username, password_hash) 
VALUES ('corvax', 'corvax2025#6007');