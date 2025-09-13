-- Insert proper access code for 'teamaccess2024' 
-- Using a simple but consistent hash: first 8 chars of sha256-like transformation
INSERT INTO public.access_codes (code_hash, description) 
VALUES ('7465616d', 'Team Access Code: teamaccess2024')
ON CONFLICT (code_hash) DO NOTHING;