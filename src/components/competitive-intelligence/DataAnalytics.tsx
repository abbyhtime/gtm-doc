import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  Clock,
  Target,
  Zap,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  Mail
} from 'lucide-react';

// Import EBB data
import { ebbData } from '@/data/competitiveIntelligence';

const DataAnalytics = () => {
  // User base data (logarithmic scale)
  const userBaseData = [
    { name: 'Google Calendar', users: 500000000, category: 'incumbent', color: 'bg-blue-500' },
    { name: 'Microsoft Outlook', users: 400000000, category: 'incumbent', color: 'bg-blue-400' },
    { name: 'Calendly', users: 20000000, category: 'incumbent', color: 'bg-blue-300' },
    { name: 'Doodle', users: 30000000, category: 'incumbent', color: 'bg-blue-200' },
    { name: 'Reclaim.ai', users: 320000, category: 'ai-native', color: 'bg-purple-500' },
    { name: 'Cal.com', users: 20000, category: 'specialized', color: 'bg-green-500' },
    { name: 'Motion', users: 15000, category: 'ai-native', color: 'bg-purple-400' },
    { name: 'SavvyCal', users: 5000, category: 'specialized', color: 'bg-green-400' }
  ].sort((a, b) => b.users - a.users);

  // Funding comparison
  const fundingData = [
    { name: 'Calendly', amount: 351, category: 'incumbent', valuation: 3000 },
    { name: 'Motion', amount: 75, category: 'ai-native', valuation: 550 },
    { name: 'Clockwise', amount: 76, category: 'ai-native', valuation: null },
    { name: 'Cal.com', amount: 32, category: 'specialized', valuation: null },
    { name: 'Kronologic', amount: 20, category: 'specialized', valuation: null },
    { name: 'Reclaim.ai', amount: 9.5, category: 'ai-native', valuation: null },
    { name: 'Meet-Ting', amount: 0.3, category: 'ai-native', valuation: null }
  ].sort((a, b) => b.amount - a.amount);

  // ROI and productivity metrics
  const roiMetrics = [
    { metric: 'Time Saved per Week', value: '1.5 hours', impact: 'High', color: 'text-green-600' },
    { metric: 'Productivity Boost', value: '20%', impact: 'High', color: 'text-green-600' },
    { metric: 'Meeting Scheduling Time', value: '-80%', impact: 'Critical', color: 'text-blue-600' },
    { metric: 'Calendar Optimization', value: '3.2x more focus time', impact: 'High', color: 'text-purple-600' },
    { metric: 'No-show Reduction', value: '45%', impact: 'Medium', color: 'text-orange-600' },
    { metric: 'Sales Conversion', value: '+15%', impact: 'Critical', color: 'text-green-600' }
  ];

  // Market evolution data
  const marketEvolution = [
    { year: 2020, marketSize: 320, aiAdoption: 5 },
    { year: 2021, marketSize: 380, aiAdoption: 12 },
    { year: 2022, marketSize: 450, aiAdoption: 22 },
    { year: 2023, marketSize: 520, aiAdoption: 35 },
    { year: 2024, marketSize: 571, aiAdoption: 45 },
    { year: 2025, marketSize: 730, aiAdoption: 60 },
    { year: 2030, marketSize: 1637, aiAdoption: 85 }
  ];

  // Historical failures vs current successes
  const historicalAnalysis = [
    { 
      name: 'Clara Labs', 
      period: '2014-2020', 
      funding: '$1M+ operational costs', 
      outcome: 'Failed - Shut Down',
      reason: 'Human-in-the-loop model unsustainable, AI not ready for practical automation',
      status: 'failed'
    },
    { 
      name: 'x.ai "Amy"', 
      period: '2014-2021', 
      funding: '$44M burned', 
      outcome: 'Failed - Acquired by Bizzabo',
      reason: 'Over-engineered AI, limited practical value, poor user experience',
      status: 'failed'
    },
    { 
      name: 'Motion', 
      period: '2019-Present', 
      funding: '$75M total', 
      outcome: 'Success - $10M ARR in 4 months',
      reason: 'Practical AI + task management, perfect timing for mature AI capabilities',
      status: 'success'
    },
    { 
      name: 'Reclaim.ai', 
      period: '2019-2022', 
      funding: '$15M (acquired)', 
      outcome: 'Success - Acquired by Dropbox',
      reason: 'Focused habit scheduling, specialized AI applications win first',
      status: 'success'
    }
  ];

  const getLogScale = (users: number) => {
    const maxLog = Math.log10(500000000); // Google Calendar
    const currentLog = Math.log10(users);
    return (currentLog / maxLog) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Market Overview Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Market Size</p>
                <p className="text-2xl font-bold text-blue-900">$5.71B</p>
                <p className="text-xs text-blue-600">2024 Global Scheduling</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-700" />
            </div>
            <div className="mt-2 text-xs text-blue-600">
              Source: Global Scheduling Software Market Report 2024
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">2030 Target</p>
                <p className="text-2xl font-bold text-green-900">$16.37B</p>
                <p className="text-xs text-green-600">10.4% CAGR Growth</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-700" />
            </div>
            <div className="mt-2 text-xs text-green-600">
              Source: Market Research Future Analysis
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">AI Subsegment</p>
                <p className="text-2xl font-bold text-purple-900">$1.4B</p>
                <p className="text-xs text-purple-600">By 2025 (25% CAGR)</p>
              </div>
              <Zap className="h-8 w-8 text-purple-700" />
            </div>
            <div className="mt-2 text-xs text-purple-600">
              Source: AI Scheduling Tools Market Study 2024
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Email Burden</p>
                <p className="text-2xl font-bold text-orange-900">{ebbData.avgEmailsPerMeeting}</p>
                <p className="text-xs text-orange-600">Avg emails per meeting</p>
              </div>
              <Mail className="h-8 w-8 text-orange-700" />
            </div>
            <div className="mt-2 text-xs text-orange-600">
              Source: {ebbData.sources.calendly_2023}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Email Back-and-Forth Burden Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Back-and-Forth Burden (EBB) Analysis
          </CardTitle>
          <CardDescription>
            Industry-specific impact of scheduling email overhead on productivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Primary KPI Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">{ebbData.avgEmailsPerMeeting}</div>
              <div className="text-sm font-medium">Emails per meeting</div>
              <div className="text-xs text-muted-foreground">Current average</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-orange-600">{ebbData.adminTimePerMeeting} min</div>
              <div className="text-sm font-medium">Admin time per meeting</div>
              <div className="text-xs text-muted-foreground">Coordination overhead</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">≤{ebbData.targetEmailsPerMeeting}</div>
              <div className="text-sm font-medium">Target emails</div>
              <div className="text-xs text-muted-foreground">Optimal automation</div>
            </div>
          </div>

          {/* Industry Impact Breakdown */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Industry Impact Analysis</h4>
            {ebbData.segments.map((segment, index) => (
              <Card key={index} className={`border ${
                segment.impact === 'Critical' 
                  ? 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800' 
                  : segment.impact === 'High' 
                  ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/10 dark:border-orange-800'
                  : 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800'
              }`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <h5 className="font-semibold">{segment.name}</h5>
                      <p className="text-sm text-muted-foreground">{segment.note}</p>
                    </div>
                    <Badge 
                      variant={segment.impact === 'Critical' ? 'destructive' : segment.impact === 'High' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {segment.impact} Impact
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {segment.timeSpentPct && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-red-600">{segment.timeSpentPct}%</div>
                        <div className="text-xs text-muted-foreground">Time on scheduling</div>
                      </div>
                    )}
                    {segment.hoursPerWeek && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-blue-600">{segment.hoursPerWeek}h</div>
                        <div className="text-xs text-muted-foreground">Meetings/week</div>
                      </div>
                    )}
                    {segment.annualLossWeeks && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-orange-600">{segment.annualLossWeeks} wks</div>
                        <div className="text-xs text-muted-foreground">Lost annually</div>
                      </div>
                    )}
                    {segment.multiToolUsagePct && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-purple-600">{segment.multiToolUsagePct}%</div>
                        <div className="text-xs text-muted-foreground">Use 3+ tools</div>
                      </div>
                    )}
                    {segment.preferencesPct && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-green-600">{segment.preferencesPct}%</div>
                        <div className="text-xs text-muted-foreground">Want online booking</div>
                      </div>
                    )}
                    {segment.wouldSelfSchedulePct && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-teal-600">{segment.wouldSelfSchedulePct}%</div>
                        <div className="text-xs text-muted-foreground">Would self-schedule</div>
                      </div>
                    )}
                    {segment.largeOrgPenaltyHours && (
                      <div className="text-center p-3 bg-background/80 rounded-lg border">
                        <div className="text-2xl font-bold text-red-600">+{segment.largeOrgPenaltyHours}h</div>
                        <div className="text-xs text-muted-foreground">Large org penalty</div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* ROI Opportunity */}
          <div className="p-4 bg-green-50 border border-green-200 dark:bg-green-900/10 dark:border-green-800 rounded-lg">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Automation ROI Opportunity
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Current: {ebbData.avgEmailsPerMeeting} emails per meeting</span>
                <span>Target: ≤{ebbData.targetEmailsPerMeeting} emails per meeting</span>
              </div>
              <div className="relative">
                <Progress value={100} className="h-3 bg-red-200" />
                <Progress 
                  value={(ebbData.targetEmailsPerMeeting / ebbData.avgEmailsPerMeeting) * 100} 
                  className="h-3 absolute top-0 left-0" 
                />
              </div>
              <div className="text-sm text-center text-green-700 dark:text-green-200">
                <strong>{Math.round((1 - (ebbData.targetEmailsPerMeeting / ebbData.avgEmailsPerMeeting)) * 100)}% reduction potential</strong> in email coordination overhead
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-center">
                <div className="p-3 bg-background/60 rounded border">
                  <div className="font-bold text-lg text-green-600">~13 min</div>
                  <div className="text-xs text-muted-foreground">Time saved per meeting</div>
                </div>
                <div className="p-3 bg-background/60 rounded border">
                  <div className="font-bold text-lg text-green-600">5.2 hrs</div>
                  <div className="text-xs text-muted-foreground">Weekly savings (24 meetings)</div>
                </div>
                <div className="p-3 bg-background/60 rounded border">
                  <div className="font-bold text-lg text-green-600">$12,480</div>
                  <div className="text-xs text-muted-foreground">Annual value ($120/hr rate)</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Base Comparison (Log Scale) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            User Base Analysis (Logarithmic Scale)
          </CardTitle>
          <CardDescription>
            Comparison of active user bases across platforms - note the logarithmic scale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userBaseData.map((company, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{company.name}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs bg-foreground/5 text-foreground border-foreground/20">
                    {company.category}
                  </Badge>
                  <span className="text-muted-foreground">
                    {company.users >= 1000000 
                      ? `${(company.users / 1000000).toFixed(0)}M` 
                      : `${(company.users / 1000).toFixed(0)}K`}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress 
                  value={getLogScale(company.users)} 
                  className="flex-1 h-2"
                />
                <span className="text-xs text-muted-foreground w-16 text-right">
                  {Math.round(getLogScale(company.users))}%
                </span>
              </div>
            </div>
          ))}
          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> Logarithmic scale used due to massive variance. Google/Microsoft dominate by sheer ecosystem size, 
              while specialized tools compete on features and AI capabilities.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Funding Landscape */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Funding Analysis
            </CardTitle>
            <CardDescription>Investment raised by key players (millions USD)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {fundingData.map((company, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{company.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">${company.amount}M</span>
                    {company.valuation && (
                      <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                        ${company.valuation}M valuation
                      </Badge>
                    )}
                  </div>
                </div>
                <Progress 
                  value={(company.amount / 351) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              ROI & Productivity Impact
            </CardTitle>
            <CardDescription>Measured benefits of AI scheduling tools</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roiMetrics.map((roi, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{roi.metric}</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      roi.impact === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                      roi.impact === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}
                  >
                    {roi.impact} Impact
                  </Badge>
                </div>
                <div className={`text-right`}>
                  <p className={`text-lg font-bold ${roi.color}`}>{roi.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Market Evolution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Growth & AI Adoption Timeline
          </CardTitle>
          <CardDescription>
            Market size growth alongside AI feature adoption (2020-2025)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Market Size Growth */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-700" />
                Market Size (Millions USD)
              </h4>
              {marketEvolution.map((year, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{year.year}</span>
                   <span className="text-sm font-medium">${year.marketSize}M</span>
                 </div>
                 <Progress value={(year.marketSize / 1637) * 100} className="h-2" />
                 <div className="text-xs text-muted-foreground mt-1">
                   {year.year === 2024 && 'Source: Global Scheduling Software Market Report 2024'}
                   {year.year === 2030 && 'Source: Market Research Future Analysis'}
                 </div>
                </div>
              ))}
            </div>

            {/* AI Adoption */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-700" />
                AI Feature Adoption (%)
              </h4>
              {marketEvolution.map((year, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{year.year}</span>
                    <span className="font-medium">{year.aiAdoption}%</span>
                  </div>
                  <Progress value={year.aiAdoption} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Historical Analysis: Failures vs Successes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Historical Analysis: Then vs Now
          </CardTitle>
          <CardDescription>
            Comparing early AI scheduling failures with current successes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historicalAnalysis.map((analysis, index) => (
              <Card key={index} className={`border ${
                analysis.status === 'failed' 
                  ? 'bg-red-50 border-red-200' 
                  : 'bg-green-50 border-green-200'
              } [&_*]:!text-gray-800 dark:[&_*]:!text-gray-900`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{analysis.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            analysis.status === 'failed'
                              ? 'bg-red-100 text-red-800 border-red-400'
                              : 'bg-green-100 text-green-800 border-green-400'
                          }`}
                        >
                          {analysis.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-foreground dark:text-foreground">{analysis.outcome}</p>
                      <p className="text-sm font-medium text-foreground">{analysis.reason}</p>
                    </div>
                    <div className="text-right space-y-1">
                      {analysis.status === 'failed' ? (
                        <AlertTriangle className="h-5 w-5 text-red-700" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-700" />
                      )}
                      <p className="text-xs text-foreground dark:text-foreground">{analysis.funding}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg [&_*]:!text-blue-900 dark:[&_*]:!text-blue-900">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Key Learning: Technology Timing
            </h4>
            <p className="text-sm text-blue-900 dark:text-blue-900">
              The failure of early AI schedulers (Clara, x.ai) vs. the current momentum shows that 
              <strong> timing is critical</strong>. Modern LLMs (GPT, Gemini) and changed user expectations 
              now enable what wasn't possible 5 years ago. The technology and market readiness have finally aligned.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalytics;