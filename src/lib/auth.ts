// Simple authentication utilities
import { supabase } from "@/integrations/supabase/client";

// Simple hash function for access codes (using built-in crypto)
export async function hashAccessCode(code: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(code);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Verify access code against database
export async function verifyAccessCode(code: string): Promise<boolean> {
  try {
    const hashedCode = await hashAccessCode(code);
    
    const { data, error } = await supabase
      .from('access_codes')
      .select('id, last_used_at')
      .eq('code_hash', hashedCode)
      .eq('is_active', true)
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    // Update last_used_at
    await supabase
      .from('access_codes')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', data.id);

    return true;
  } catch (error) {
    console.error('Access code verification failed:', error);
    return false;
  }
}

// Session management
const SESSION_KEY = 'gtm_auth_session';

export function setAuthSession(): void {
  localStorage.setItem(SESSION_KEY, 'authenticated');
}

export function getAuthSession(): boolean {
  return localStorage.getItem(SESSION_KEY) === 'authenticated';
}

export function clearAuthSession(): void {
  localStorage.removeItem(SESSION_KEY);
}