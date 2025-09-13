-- Create GTM content table for persistent storage
CREATE TABLE public.gtm_content (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  section text NOT NULL, -- 'vision', 'mission', 'strategic_pillars', etc.
  content_type text NOT NULL, -- 'text', 'json'
  content_value jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gtm_content ENABLE ROW LEVEL SECURITY;

-- Create policies for content management (public read/write since this is GTM content)
CREATE POLICY "GTM content is publicly readable" 
ON public.gtm_content 
FOR SELECT 
USING (true);

CREATE POLICY "GTM content is publicly writable" 
ON public.gtm_content 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "GTM content is publicly updatable" 
ON public.gtm_content 
FOR UPDATE 
USING (true);

CREATE POLICY "GTM content is publicly deletable" 
ON public.gtm_content 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_gtm_content_updated_at
  BEFORE UPDATE ON public.gtm_content
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content
INSERT INTO public.gtm_content (section, content_type, content_value) VALUES
  ('vision', 'text', '"Revolutionize how professionals manage their time and meetings through intelligent automation and seamless scheduling solutions."'),
  ('mission', 'text', '"To eliminate the 31 hours per month professionals waste on unproductive meetings by providing AI-powered scheduling tools that optimize productivity and reduce coordination overhead."');