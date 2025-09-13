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
  Lightbulb
} from 'lucide-react';

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
    { year: 2020, marketSize: 250, aiAdoption: 5 },
    { year: 2021, marketSize: 280, aiAdoption: 12 },
    { year: 2022, marketSize: 320, aiAdoption: 22 },
    { year: 2023, marketSize: 400, aiAdoption: 35 },
    { year: 2024, marketSize: 480, aiAdoption: 45 },
    { year: 2025, marketSize: 580, aiAdoption: 60 }
  ];

  // Historical failures vs current successes
  const historicalAnalysis = [
    { 
      name: 'x.ai "Amy"', 
      period: '2014-2021', 
      funding: '$44M', 
      outcome: 'Failed - Acquired & Shut Down',
      reason: 'AI limitations, user friction',
      status: 'failed'
    },
    { 
      name: 'Clara Labs', 
      period: '2015-2020', 
      funding: 'Undisclosed', 
      outcome: 'Failed - Acquired & Shut Down',
      reason: 'Accuracy issues, scaling challenges',
      status: 'failed'
    },
    { 
      name: 'Meet-Ting', 
      period: '2024-Present', 
      funding: '£250K', 
      outcome: 'Active - Modern LLM approach',
      reason: 'Advanced NLP, user acceptance',
      status: 'success'
    },
    { 
      name: 'Motion AI Agents', 
      period: '2025', 
      funding: '$75M total', 
      outcome: 'Success - $10M ARR in 4 months',
      reason: 'Integrated workflow, proven ROI',
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
                <p className="text-sm text-blue-600 font-medium">Total Funding</p>
                <p className="text-2xl font-bold text-blue-900">$588M+</p>
                <p className="text-xs text-blue-600">Across all startups</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active Users</p>
                <p className="text-2xl font-bold text-green-900">920M+</p>
                <p className="text-xs text-green-600">Across major platforms</p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">AI Adoption</p>
                <p className="text-2xl font-bold text-purple-900">60%</p>
                <p className="text-xs text-purple-600">In 2025 (projected)</p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Market CAGR</p>
                <p className="text-2xl font-bold text-orange-900">16%</p>
                <p className="text-xs text-orange-600">2023-2032</p>
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

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
                  <Badge variant="outline" className="text-xs">
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
                      <Badge variant="secondary" className="text-xs">
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
                <DollarSign className="h-4 w-4 text-green-500" />
                Market Size (Millions USD)
              </h4>
              {marketEvolution.map((year, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{year.year}</span>
                    <span className="font-medium">${year.marketSize}M</span>
                  </div>
                  <Progress value={(year.marketSize / 580) * 100} className="h-2" />
                </div>
              ))}
            </div>

            {/* AI Adoption */}
            <div className="space-y-4">
              <h4 className="font-semibold text-sm flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-500" />
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
              }`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{analysis.name}</h4>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            analysis.status === 'failed'
                              ? 'bg-red-100 text-red-700 border-red-300'
                              : 'bg-green-100 text-green-700 border-green-300'
                          }`}
                        >
                          {analysis.period}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{analysis.outcome}</p>
                      <p className="text-sm font-medium">{analysis.reason}</p>
                    </div>
                    <div className="text-right space-y-1">
                      {analysis.status === 'failed' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                      <p className="text-xs text-muted-foreground">{analysis.funding}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Separator className="my-6" />
          
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Key Learning: Technology Timing
            </h4>
            <p className="text-sm text-blue-800">
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