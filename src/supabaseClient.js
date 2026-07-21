import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fallback to active credentials if environment variables are not set in the hosting provider dashboard
const activeUrl = supabaseUrl || 'https://bubuqrksabjsawruywjz.supabase.co';
const activeAnonKey = supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1YnVxcmtzYWJqc2F3cnV5d2p6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzODIxOTYsImV4cCI6MjA5Nzk1ODE5Nn0._VXrxanHYZtf1_qzdBkaLBCpIq5ORuCEgjoEuMg6an8';

export const supabase = createClient(activeUrl, activeAnonKey);
export default supabase;

