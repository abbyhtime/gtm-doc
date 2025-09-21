// Email Back-and-Forth Burden (EBB) Analysis Data
// Extracted from Meeting Scheduling Pain by Industry & Role.pdf and Deep Dive PDF

export interface EBBSegmentData {
  name: string;
  timeSpentPct?: number;
  hoursPerWeek?: number;
  annualLossWeeks?: number;
  multiToolUsagePct?: number;
  preferencesPct?: number;
  wouldSelfSchedulePct?: number;
  largeOrgPenaltyHours?: number;
  note?: string;
  impact: 'Critical' | 'High' | 'Medium';
  color: string;
}

export interface EBBData {
  avgEmailsPerMeeting: number;
  adminTimePerMeeting: number; // in minutes
  targetEmailsPerMeeting: number;
  segments: EBBSegmentData[];
  sources: {
    [key: string]: string;
  };
}

export const ebbData: EBBData = {
  avgEmailsPerMeeting: 7.3,
  adminTimePerMeeting: 15,
  targetEmailsPerMeeting: 2,
  segments: [
    {
      name: 'Recruiting/HR',
      timeSpentPct: 35,
      annualLossWeeks: 4,
      note: '35% of recruiter time on scheduling; ~4 weeks/yr lost to scheduling tasks',
      impact: 'Critical',
      color: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
    },
    {
      name: 'Sales/Marketing', 
      multiToolUsagePct: 21,
      note: '21% use 3+ tools to schedule; faster automation drives higher lead→meeting',
      impact: 'High',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300'
    },
    {
      name: 'Tech/Engineering',
      hoursPerWeek: 10.9,
      largeOrgPenaltyHours: 3.2,
      note: '10.9 h/wk in meetings (↑ at large orgs → more coordination overhead)',
      impact: 'High', 
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
      name: 'Healthcare',
      preferencesPct: 61,
      wouldSelfSchedulePct: 80,
      note: '61% want online booking; ~80% would self-schedule if offered',
      impact: 'High',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    },
    {
      name: 'Education',
      preferencesPct: 32,
      note: '32% students prefer online tools to book office hours',
      impact: 'Medium',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
    }
  ],
  sources: {
    'calendly_2023': 'Calendly – State of Scheduling 2023',
    'ssr_2025': 'SelectSoftware Reviews – Recruiting Statistics 2025', 
    'clockwise_2023': 'Clockwise Engineering meeting load study',
    'doodle_2020': 'Doodle Time Management in Education',
    'healthcare_2023': 'Kyruus/Wakefield via healthcare blogs'
  }
};

// Additional competitive intelligence metrics
export const productivityMetrics = {
  aiProductivityCuriosity: {
    value: 94,
    description: '94% of large-company workers curious about AI productivity tools',
    source: 'AI Workplace Adoption Survey 2024'
  },
  remoteCoordination: {
    value: 89,
    description: '89% spend 4+ hours/week on scheduling coordination', 
    source: 'Remote Work Productivity Study 2024'
  },
  consultingProductivityDrain: {
    value: 37, // average of 34-40%
    description: '34-40% of professionals cite inefficient meeting scheduling as biggest productivity drain',
    source: 'European Productivity Survey 2024'
  }
};