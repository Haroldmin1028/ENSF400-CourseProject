import { createClient } from './supabase/client';

interface Profile {
  id: string;
  bio: string;
  username: string;
  full_name: string;
  created_at: string | null;
}
const supabase = createClient();

export async function getProfileData<T = any>(
  value: string
): Promise<T> {

  const { data, error } = await supabase.rpc('query', {
    tablename: "profiles",
    columnname: "id",
    value: value,
  });

  if (error) {
    throw new Error(`RPC error: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No row found for  id= ${value}`);
  }

  return data as T;
}

export async function changeUsername<T = Profile[]>(value: string): Promise<T> {
  const userId = await getCurrentUserId(); 
  if (!userId) {
    throw new Error('No user ID found for the logged-in user');
  }

  const data = {  username:  String(value)  };

  console.log('Calling RPC with:', {
  TableName: 'profiles',
  ColumnName: 'id',
  Value: userId,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'profiles',
    columnname: 'id',
    value: String(userId), 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}

export async function changeFullName<T = Profile[]>(value: string): Promise<T> {
  const userId = await getCurrentUserId(); 
  if (!userId) {
    throw new Error('No user ID found for the logged-in user');
  }

  const data = {  full_name:  String(value)  };

  console.log('Calling RPC with:', {
  TableName: 'profiles',
  ColumnName: 'id',
  Value: userId,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'profiles',
    columnname: 'id',
    value: String(userId), 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}

export async function changeBio<T = Profile[]>(value: string): Promise<T> {
  const userId = await getCurrentUserId(); 
  if (!userId) {
    throw new Error('No user ID found for the logged-in user');
  }

  const data = {  bio:  String(value)  };

  console.log('Calling RPC with:', {
  TableName: 'profiles',
  ColumnName: 'id',
  Value: userId,
  Data: data
});

  const { data: rpcData, error } = await supabase.rpc('update', {
    tablename: 'profiles',
    columnname: 'id',
    value: String(userId), 
    data: data,
  });

  if (error) throw new Error(`RPC update error: ${error.message}`);

  return Array.isArray(rpcData) ? rpcData as T : [rpcData] as T;
}


export async function signUp(
  email: string,
  password: string,
  username: string,
  fullname?: string,
  bio?: string
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
        full_name: fullname ?? '',
        bio: bio ?? '',
      },
    },
  });

  if (error) {
    throw new Error(`Error Signing up: ${error.message}`);
  }

  console.log('Sign up success:', data);
}

export async function logIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return null;
  }

  console.log('Login success:', data.session);
  return data.session;
}

export async function changeEmail(newEmail: string) {
  const { data, error } = await supabase.auth.updateUser({ email: newEmail.trim() });

  if (error) {
    throw new Error(`Error requesting email change: ${error.message}`);
  }

  console.log(' Email change request sent.');
  console.log('The user must click the confirmation link in the new email inbox.');
  console.log('Pending email (still old until confirmed):', data.user?.email);
  return data.user;
}

export async function checkEmail() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw new Error(`Error fetching user: ${error.message}`);
  console.log('Current confirmed email:', user?.email);
  return user?.email;
}

export async function changePassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.error('Change password error:', error.message);
    return;
  }

  console.log('Password updated successfully!');
}

export async function getCurrentUserId(): Promise<string | null> {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching current user:', error.message);
    return null;
  }

  return user?.id ?? null;
}

export async function getUsername(): Promise<string | null> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) return null;

    const profile = await getProfileData(userId) as Profile;

    return profile.username;
  } catch (err: any) {
    console.error('Error getting username:', err.message ?? err);
    return null;
  }
}

export async function getFullName(): Promise<string | null> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) return null;

    const profile = await getProfileData(userId) as Profile;

    return profile.full_name;
  } catch (err: any) {
    console.error('Error getting full name:', err.message ?? err);
    return null;
  }
}

export async function getBio(): Promise<string | null> {
  try {
    const userId = await getCurrentUserId();

    if (!userId) return null;

    const profile = await getProfileData(userId) as Profile;

    return profile.bio;
  } catch (err: any) {
    console.error('Error getting bio:', err.message ?? err);
    return null;
  }
}

