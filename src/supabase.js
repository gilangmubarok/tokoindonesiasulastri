import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jyqujycpjfbsdrlhvzla.supabase.co'
const supabaseAnonKey = 'sb_publishable_oATZbrBQzcPEYDL8FxIYpA_cu7aaoFv'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)