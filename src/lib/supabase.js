import { createClient } from '@supabase/supabase-js'

// Inisialisasi Supabase hanya sekali dengan URL dan API Key langsung
export const supabase = createClient(
    'https://jbdbxkbdqeqgbkmbvxdy.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZGJ4a2JkcWVxZ2JrbWJ2eGR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3NzEwNjAsImV4cCI6MjA0MDM0NzA2MH0.DwonSDsIjNWpXnpJH9UVym7ohtvQ_XuPFc3p1p_1NP4'
)
