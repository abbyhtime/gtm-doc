-- Create GTM Phases tables for comprehensive editability system
CREATE TABLE public.gtm_phases (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_number INTEGER NOT NULL,
  name TEXT NOT NULL,
  timeline TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  revenue_goal TEXT,
  users_goal TEXT,
  features_goal TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.gtm_phase_activities (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_id UUID NOT NULL REFERENCES public.gtm_phases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.gtm_phase_criteria (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_id UUID NOT NULL REFERENCES public.gtm_phases(id) ON DELETE CASCADE,
  criterion TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.gtm_phase_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phase_id UUID NOT NULL REFERENCES public.gtm_phases(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  target_value TEXT NOT NULL,
  current_value TEXT,
  unit TEXT,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create data verification table for tracking verified vs synthetic data
CREATE TABLE public.data_verification (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  section TEXT NOT NULL,
  data_key TEXT NOT NULL,
  value TEXT NOT NULL,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  source_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(section, data_key)
);

-- Enable Row Level Security
ALTER TABLE public.gtm_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gtm_phase_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gtm_phase_criteria ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gtm_phase_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_verification ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (matching existing GTM content pattern)
CREATE POLICY "GTM phases are publicly accessible" ON public.gtm_phases FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "GTM phase activities are publicly accessible" ON public.gtm_phase_activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "GTM phase criteria are publicly accessible" ON public.gtm_phase_criteria FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "GTM phase metrics are publicly accessible" ON public.gtm_phase_metrics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Data verification is publicly accessible" ON public.data_verification FOR ALL USING (true) WITH CHECK (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_gtm_phases_updated_at
  BEFORE UPDATE ON public.gtm_phases
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gtm_phase_activities_updated_at
  BEFORE UPDATE ON public.gtm_phase_activities
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gtm_phase_criteria_updated_at
  BEFORE UPDATE ON public.gtm_phase_criteria
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gtm_phase_metrics_updated_at
  BEFORE UPDATE ON public.gtm_phase_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_data_verification_updated_at
  BEFORE UPDATE ON public.data_verification
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial GTM phases data
INSERT INTO public.gtm_phases (phase_number, name, timeline, description, status, revenue_goal, users_goal, features_goal) VALUES
(0, 'Research & Planning', 'Q4 2024', 'Market validation, competitive analysis, and product strategy refinement', 'completed', 'N/A', 'N/A', 'Market Research Complete'),
(1, 'MVP Development', 'Q1 2025', 'Core AI scheduling engine, basic UI, and essential integrations', 'in-progress', '$50K ARR', '500 Beta Users', 'AI Engine + 3 Integrations'),
(2, 'Beta Launch', 'Q2 2025', 'Limited beta release, user feedback collection, and product iteration', 'upcoming', '$250K ARR', '2,500 Users', 'Advanced AI + Mobile App'),
(3, 'Public Launch', 'Q3 2025', 'Full product launch, marketing campaign, and sales acceleration', 'upcoming', '$1M ARR', '10K Users', 'Enterprise Features'),
(4, 'Scale & Expand', 'Q4 2025+', 'Market expansion, feature enhancement, and team scaling', 'upcoming', '$5M ARR', '50K Users', 'Platform Ecosystem');

-- Insert sample activities for phase 1 (MVP Development)
INSERT INTO public.gtm_phase_activities (phase_id, title, description, order_index) 
SELECT id, 'AI Engine Development', 'Build core ML models for intelligent scheduling optimization', 1
FROM public.gtm_phases WHERE phase_number = 1
UNION ALL
SELECT id, 'Calendar Integration', 'Integrate with Google Calendar, Outlook, and Apple Calendar', 2
FROM public.gtm_phases WHERE phase_number = 1
UNION ALL
SELECT id, 'User Interface Design', 'Create intuitive web and mobile interfaces', 3
FROM public.gtm_phases WHERE phase_number = 1
UNION ALL
SELECT id, 'Beta Testing Setup', 'Establish testing infrastructure and feedback collection', 4
FROM public.gtm_phases WHERE phase_number = 1;

-- Insert initial data verification entries for key statistics (marking unverified ones)
INSERT INTO public.data_verification (section, data_key, value, is_verified, notes) VALUES
('executive-summary', 'scheduling_loss_annual', '$457B', false, 'Cannot verify this specific figure through credible sources'),
('executive-summary', 'hours_per_week_scheduling', '4 hours', false, 'Approximation - exact figure not consistently verified'),
('executive-summary', 'meetings_per_month', '31 hours', false, 'Aggregated estimate - specific source needed'),
('executive-summary', 'emails_per_meeting', '7.3', false, 'Cannot find original research source'),
('market-analysis', 'calendly_users', '20M+', false, 'Company claim - needs independent verification'),
('market-analysis', 'fortune_500_adoption', '86%', false, 'Cannot verify this percentage through credible sources'),
('competitive-intelligence', 'motion_arr', '$10M', false, 'Based on LinkedIn posts - not officially verified'),
('competitive-intelligence', 'reclaim_acquisition', '$15M', false, 'Acquisition amount not publicly disclosed'),
('business-model', 'tam_size', '$4.5B', false, 'Market projection - methodology unclear'),
('business-model', 'sam_size', '$1.8B', false, 'Derived projection - source methodology needed');