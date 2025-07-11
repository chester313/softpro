/*
  # Create CyberForge Admin Tables

  1. New Tables
    - `services`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `features` (jsonb array)
      - `icon` (text)
      - `color` (text)
      - `glow_color` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `solutions`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `description` (text)
      - `image` (text)
      - `tags` (jsonb array)
      - `metrics` (jsonb object)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text)
      - `role` (text)
      - `specialty` (text)
      - `image` (text)
      - `bio` (text)
      - `skills` (jsonb array)
      - `social` (jsonb object)
      - `icon` (text)
      - `color` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `pricing_plans`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `icon` (text)
      - `color` (text)
      - `glow_color` (text)
      - `popular` (boolean)
      - `monthly_price` (integer)
      - `annual_price` (integer)
      - `features` (jsonb array)
      - `limitations` (jsonb array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `admin_users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
*/

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  icon text NOT NULL,
  color text NOT NULL,
  glow_color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Solutions table
CREATE TABLE IF NOT EXISTS solutions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  tags jsonb DEFAULT '[]'::jsonb,
  metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  specialty text NOT NULL,
  image text NOT NULL,
  bio text NOT NULL,
  skills jsonb DEFAULT '[]'::jsonb,
  social jsonb DEFAULT '{}'::jsonb,
  icon text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Pricing plans table
CREATE TABLE IF NOT EXISTS pricing_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  color text NOT NULL,
  glow_color text NOT NULL,
  popular boolean DEFAULT false,
  monthly_price integer NOT NULL,
  annual_price integer NOT NULL,
  features jsonb DEFAULT '[]'::jsonb,
  limitations jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for main content
CREATE POLICY "Public can read services"
  ON services
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read solutions"
  ON solutions
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read team members"
  ON team_members
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read pricing plans"
  ON pricing_plans
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Admin full access (we'll handle authentication in the app)
CREATE POLICY "Admin full access to services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to solutions"
  ON solutions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin full access to pricing plans"
  ON pricing_plans
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admin can read admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password_hash) 
VALUES ('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (username) DO NOTHING;

-- Insert sample data
INSERT INTO services (title, description, features, icon, color, glow_color) VALUES
('AI & Machine Learning', 'Advanced neural networks, deep learning models, and intelligent automation systems that learn and adapt.', '["Computer Vision", "Natural Language Processing", "Predictive Analytics", "Neural Networks"]', 'Brain', 'from-cyan-400 to-blue-500', 'shadow-cyan-500/20'),
('Mobile Applications', 'Cross-platform mobile solutions with native performance and cutting-edge user experiences.', '["iOS & Android", "React Native", "Flutter", "Progressive Web Apps"]', 'Smartphone', 'from-purple-400 to-pink-500', 'shadow-purple-500/20'),
('Cloud Architecture', 'Scalable cloud infrastructure and microservices that grow with your business needs.', '["AWS & Azure", "Kubernetes", "Serverless", "DevOps Automation"]', 'Cloud', 'from-green-400 to-teal-500', 'shadow-green-500/20')
ON CONFLICT DO NOTHING;

INSERT INTO solutions (title, category, description, image, tags, metrics) VALUES
('Enterprise AI Platform', 'Artificial Intelligence', 'Complete AI ecosystem with machine learning pipelines, model deployment, and intelligent automation for enterprise-scale operations.', 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800', '["Machine Learning", "Automation", "Analytics"]', '{"performance": "300%", "efficiency": "85%", "accuracy": "99.7%"}'),
('Quantum Security Suite', 'Cybersecurity', 'Next-generation security platform leveraging quantum cryptography and advanced threat detection algorithms.', 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800', '["Quantum Crypto", "Threat Detection", "Zero Trust"]', '{"security": "100%", "detection": "99.9%", "response": "<1ms"}')
ON CONFLICT DO NOTHING;

INSERT INTO team_members (name, role, specialty, image, bio, skills, social, icon, color) VALUES
('Dr. Alex Chen', 'Chief Technology Officer', 'AI & Machine Learning', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400', 'Former Google AI researcher with 15+ years in neural networks and deep learning. Pioneer in quantum-classical hybrid algorithms.', '["TensorFlow", "PyTorch", "Quantum Computing", "Neural Architecture"]', '{"github": "#", "linkedin": "#", "twitter": "#"}', 'Brain', 'from-cyan-400 to-blue-500'),
('Sarah Rodriguez', 'Lead Security Architect', 'Cybersecurity & Blockchain', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400', 'Ex-NSA cryptographer specializing in zero-trust architectures and blockchain security. Published researcher in quantum cryptography.', '["Blockchain", "Cryptography", "Zero Trust", "Penetration Testing"]', '{"github": "#", "linkedin": "#", "twitter": "#"}', 'Shield', 'from-purple-400 to-pink-500')
ON CONFLICT DO NOTHING;

INSERT INTO pricing_plans (name, description, icon, color, glow_color, popular, monthly_price, annual_price, features, limitations) VALUES
('Starter', 'Perfect for small projects and startups', 'Zap', 'from-cyan-400 to-blue-500', 'shadow-cyan-500/20', false, 99, 990, '["Up to 5 team members", "Basic AI integration", "Standard support", "Cloud deployment"]', '["Advanced AI features", "Custom integrations"]'),
('Professional', 'Ideal for growing businesses and teams', 'Crown', 'from-purple-400 to-pink-500', 'shadow-purple-500/20', true, 299, 2990, '["Up to 25 team members", "Advanced AI & ML tools", "Priority support", "Multi-cloud deployment"]', '["Quantum computing access"]'),
('Enterprise', 'For large organizations with complex needs', 'Rocket', 'from-green-400 to-teal-500', 'shadow-green-500/20', false, 999, 9990, '["Unlimited team members", "Full AI & quantum access", "Dedicated support team", "Private cloud deployment"]', '[]')
ON CONFLICT DO NOTHING;