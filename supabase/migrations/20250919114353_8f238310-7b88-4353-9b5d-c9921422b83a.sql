-- Extend gtm_phase_activities table with project management fields
ALTER TABLE public.gtm_phase_activities 
ADD COLUMN due_date DATE,
ADD COLUMN owner TEXT,
ADD COLUMN status TEXT DEFAULT 'not-started',
ADD COLUMN priority TEXT DEFAULT 'medium',
ADD COLUMN notes TEXT;

-- Add check constraints for valid status and priority values
ALTER TABLE public.gtm_phase_activities 
ADD CONSTRAINT check_activity_status 
CHECK (status IN ('not-started', 'in-progress', 'completed', 'blocked'));

ALTER TABLE public.gtm_phase_activities 
ADD CONSTRAINT check_activity_priority 
CHECK (priority IN ('low', 'medium', 'high', 'critical'));