import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, DollarSign, Users, Zap, Target, BarChart3, ArrowUpRight } from 'lucide-react';

const ExecutiveDashboard = () => {
  const marketMetrics = [
    { label: 'Current Market Size', value: '$400M', trend: '+16%', icon: DollarSign, color: 'text-green-500' },
    { label: 'Projected 2032', value: '$1.6B', trend: '300%', icon: TrendingUp, color: 'text-blue-500' },
    { label: 'Total Users', value: '500M+', trend: '+25%', icon: Users, color: 'text-purple-500' },
    { label: 'Active Startups', value: '12+', trend: 'New', icon: Zap, color: 'text-orange-500' },
  ];

  const keyInsights = [
    {
      title: 'Market Leadership',
      insight: 'Calendly dominates with 20M users and $276M revenue, but faces AI-native disruption',
      impact: 'High',
      color: 'bg-red-50 border-red-200 text-red-700'
    },
    {
      title: 'AI Integration Trend',
      insight: 'All major players investing heavily in AI features - from Google Duet to Microsoft Copilot',
      impact: 'Critical',
      color: 'bg-orange-50 border-orange-200 text-orange-700'
    },
    {
      title: 'Funding Surge',
      insight: 'Over $500M invested in scheduling startups in past 3-4 years',
      impact: 'High',
      color: 'bg-blue-50 border-blue-200 text-blue-700'
    },
    {
      title: 'Productivity ROI',
      insight: 'Teams save 1.5 hours/week with AI assistants, 20% productivity boost',
      impact: 'Medium',
      color: 'bg-green-50 border-green-200 text-green-700'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <BarChart3 className="h-6 w-6 text-primary" />
            Executive Summary
          </CardTitle>
          <CardDescription className="text-base">
            The AI-powered scheduling market is experiencing explosive growth as hybrid work drives demand for intelligent meeting coordination.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Market Dynamics
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Rapid market expansion: $400M → $1.6B (16% CAGR)
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                  Incumbents (Google, Microsoft, Calendly) adding AI features
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-purple-500 mt-1 flex-shrink-0" />
                  AI-native startups gaining traction with specialized features
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  Consolidation beginning (Dropbox acquired Reclaim.ai)
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Key Trends
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                  Email-based AI assistants resurging (Meet-Ting)
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-blue-500 mt-1 flex-shrink-0" />
                  Focus time optimization becoming key differentiator
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-purple-500 mt-1 flex-shrink-0" />
                  Free/freemium models challenging premium players
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="h-3 w-3 text-orange-500 mt-1 flex-shrink-0" />
                  Integration ecosystems becoming competitive moats
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Growth Visualization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Growth Trajectory
          </CardTitle>
          <CardDescription>
            Projected market expansion from 2023 to 2032
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2023: $400M</span>
              <span className="text-sm text-muted-foreground">Base Year</span>
            </div>
            <Progress value={25} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2028: $800M</span>
              <span className="text-sm text-muted-foreground">Mid-point</span>
            </div>
            <Progress value={50} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2032: $1.6B</span>
              <span className="text-sm text-muted-foreground">Projected</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>16% CAGR</strong> driven by hybrid work adoption, AI advancement, and productivity demands
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Key Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Strategic Intelligence
          </CardTitle>
          <CardDescription>
            Critical insights for competitive positioning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {keyInsights.map((insight, index) => (
              <Card key={index} className={`${insight.color} border`}>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm">{insight.insight}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveDashboard;