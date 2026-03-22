import { config } from 'dotenv';
config(); 
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

const supabaseAdmin= createClient(supabaseUrl, supabaseKey);

async function adminChangePassword(userId: string, newPassword: string) {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: newPassword,
  });

  if (error) throw error;
  return data;
}

async function adminChangeEmail(userId: string, newEmail: string) {
  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    email: newEmail,
  });

  if (error) throw new Error(`Failed to update email: ${error.message}`);
  return data;
}

async function deleteUser(userId: string) {
  const { data, error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) throw new Error(`Delete user failed: ${error.message}`);
  return data;
}

async function adminUpdateUser(userId: string, data: Record<string, any>) {
  const { data: rpcData, error } = await supabaseAdmin.rpc('admin_update_user', {
    target_user_id: userId,
    data,
  });

  if (error) throw new Error(`Admin update error: ${error.message}`);
  return Array.isArray(rpcData) ? rpcData : [rpcData];
}
