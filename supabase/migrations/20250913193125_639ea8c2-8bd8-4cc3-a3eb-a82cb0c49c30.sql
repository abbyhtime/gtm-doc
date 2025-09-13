-- Create access_codes table for simple authentication
CREATE TABLE public.access_codes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code_hash TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE,
  last_used_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Enable RLS
ALTER TABLE public.access_codes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access for authentication
CREATE POLICY "Access codes are publicly readable for auth" 
ON public.access_codes 
FOR SELECT 
USING (is_active = true AND (expires_at IS NULL OR expires_at > now()));

-- Insert a default access code (hash of 'teamaccess2024')
INSERT INTO public.access_codes (code_hash, description) 
VALUES ('e8b7d3b2c4a1f9e6d5c8b2a4f7e3d6c9b5a8f2e7d4c1b9f6e3a7d2c5b8f4e1d6', 'Default team access code');

-- Add trigger for updated_at
CREATE TRIGGER update_access_codes_updated_at
BEFORE UPDATE ON public.access_codes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();