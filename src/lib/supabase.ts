import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
  glow_color: string;
  created_at: string;
  updated_at: string;
}

export interface Solution {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  metrics: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
  skills: string[];
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  icon: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  glow_color: string;
  popular: boolean;
  monthly_price: number;
  annual_price: number;
  features: string[];
  limitations: string[];
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
}

// Admin authentication
export const adminLogin = async (username: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Simple password check (in production, use proper hashing)
    if (password === 'admin123') {
      return { success: true, user: data };
    }

    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    return { success: false, error: 'Login failed' };
  }
};

// CRUD Operations
export const crudOperations = {
  // Services
  services: {
    getAll: () => supabase.from('services').select('*').order('created_at', { ascending: false }),
    create: (data: Omit<Service, 'id' | 'created_at' | 'updated_at'>) => 
      supabase.from('services').insert([{ ...data, updated_at: new Date().toISOString() }]).select(),
    update: (id: string, data: Partial<Service>) => 
      supabase.from('services').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select(),
    delete: (id: string) => supabase.from('services').delete().eq('id', id)
  },

  // Solutions
  solutions: {
    getAll: () => supabase.from('solutions').select('*').order('created_at', { ascending: false }),
    create: (data: Omit<Solution, 'id' | 'created_at' | 'updated_at'>) => 
      supabase.from('solutions').insert([{ ...data, updated_at: new Date().toISOString() }]).select(),
    update: (id: string, data: Partial<Solution>) => 
      supabase.from('solutions').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select(),
    delete: (id: string) => supabase.from('solutions').delete().eq('id', id)
  },

  // Team Members
  teamMembers: {
    getAll: () => supabase.from('team_members').select('*').order('created_at', { ascending: false }),
    create: (data: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>) => 
      supabase.from('team_members').insert([{ ...data, updated_at: new Date().toISOString() }]).select(),
    update: (id: string, data: Partial<TeamMember>) => 
      supabase.from('team_members').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select(),
    delete: (id: string) => supabase.from('team_members').delete().eq('id', id)
  },

  // Pricing Plans
  pricingPlans: {
    getAll: () => supabase.from('pricing_plans').select('*').order('created_at', { ascending: false }),
    create: (data: Omit<PricingPlan, 'id' | 'created_at' | 'updated_at'>) => 
      supabase.from('pricing_plans').insert([{ ...data, updated_at: new Date().toISOString() }]).select(),
    update: (id: string, data: Partial<PricingPlan>) => 
      supabase.from('pricing_plans').update({ ...data, updated_at: new Date().toISOString() }).eq('id', id).select(),
    delete: (id: string) => supabase.from('pricing_plans').delete().eq('id', id)
  }
};