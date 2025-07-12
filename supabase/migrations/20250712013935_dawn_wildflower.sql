/*
  # Create team_members table

  1. New Tables
    - `team_members`
      - `id` (uuid, primary key)
      - `name` (text, required)
      - `role` (text, required)
      - `specialty` (text, required)
      - `image` (text, required)
      - `bio` (text, required)
      - `skills` (jsonb array, default empty array)
      - `social` (jsonb object, default empty object)
      - `icon` (text, required)
      - `color` (text, required)
      - `created_at` (timestamp with timezone, default now)
      - `updated_at` (timestamp with timezone, default now)

  2. Security
    - Enable RLS on `team_members` table
    - Add policy for public read access
    - Add policy for authenticated admin full access
*/

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

ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read team members"
  ON team_members
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin full access to team members"
  ON team_members
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);