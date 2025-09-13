import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign, 
  Zap,
  Building,
  Globe,
  Briefcase,
  ChevronRight
} from 'lucide-react';

// Import the existing competitive intelligence component
import CompetitiveIntelligence from '@/components/CompetitiveIntelligence';

const MarketAnalysis = () => {
  const [showCompetitiveIntel, setShowCompetitiveIntel] = useState(false);

  // Real market data from insights report
  const marketSegments = [
    {
      name: 'Tech/Software',
      size: '10.9 hrs/week',
      growth: '+47%',
      share: '32%',
      description: 'Software professionals with high meeting load, 5.6 hours potential savings',
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      icon: Building
    },
    {
      name: 'Consulting/Professional Services',
      size: '50-80 hrs/week',
      growth: '+34%',
      share: '28%',
      description: '34-40% cite inefficient meetings as top productivity drain',
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      icon: Briefcase
    },
    {
      name: 'Recruiting',
      size: '35% of time',
      growth: '+28%',
      share: '25%',
      description: 'Recruiters spend over 1/3 of time coordinating interviews',
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      icon: Users
    },
    {
      name: 'Sales',
      size: '31 hrs/month',
      growth: '+22%',
      share: '15%',
      description: 'Complex multi-party scheduling with prospects and internal teams',
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
      icon: TrendingUp
    }
  ];

  const marketTrends = [
    {
      trend: 'AI Productivity Tool Adoption',
      impact: 'High',
      timeline: '2024-2025',
      description: '94% of large-company workers curious about AI productivity tools',
      percentage: 94
    },
    {
      trend: 'Remote Work Coordination Burden',
      impact: 'Critical',
      timeline: '2024-2026',
      description: '89% spend 4+ hours/week on scheduling coordination',
      percentage: 89
    },
    {
      trend: 'Email Overhead Reduction',
      impact: 'High',
      timeline: '2024-2025',
      description: 'Average 7.3 emails per meeting, 15 minutes admin work per meeting',
      percentage: 67
    },
    {
      trend: 'Meeting Load Growth at Scale',
      impact: 'Medium',
      timeline: '2025-2027',
      description: '3.2 more hours/week meeting time at larger companies',
      percentage: 78
    }
  ];

  const competitiveLandscape = [
    {
      category: 'Traditional Leaders',
      companies: ['Calendly', 'Acuity', 'Doodle'],
      strength: 'Market presence, brand recognition',
      weakness: 'Limited AI capabilities, basic automation',
      threat: 'Medium'
    },
    {
      category: 'AI-Enhanced Incumbents',
      companies: ['Microsoft Bookings', 'Google Calendar'],
      strength: 'Platform integration, large user base',
      weakness: 'AI features are add-ons, not core',
      threat: 'High'
    },
    {
      category: 'AI-Native Startups',
      companies: ['Reclaim.ai', 'Motion', 'Clockwise'],
      strength: 'AI-first approach, modern UX',
      weakness: 'Limited market presence, narrow focus',
      threat: 'Medium'
    }
  ];

  if (showCompetitiveIntel) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Detailed Competitive Intelligence</h2>
            <p className="text-muted-foreground">Comprehensive analysis of the scheduling tools market</p>
          </div>
          <Button onClick={() => setShowCompetitiveIntel(false)} variant="outline">
            Back to Market Overview
          </Button>
        </div>
        <CompetitiveIntelligence />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Market Size & Growth */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Market Size & Growth
          </CardTitle>
          <CardDescription>
            AI-powered scheduling market dynamics and projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-primary">$457B</div>
              <div className="text-sm font-medium">Annual Global Loss</div>
              <div className="text-xs text-muted-foreground">$399B US + $58B UK</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">$600B+</div>
              <div className="text-sm font-medium">Market Opportunity</div>
              <div className="text-xs text-muted-foreground">Projected growth</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-orange-600">31 hrs/mo</div>
              <div className="text-sm font-medium">Time Wasted</div>
              <div className="text-xs text-muted-foreground">Per professional</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Segments */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Market Segments
          </CardTitle>
          <CardDescription>
            Breakdown of addressable market by professional segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {marketSegments.map((segment) => {
              const Icon = segment.icon;
              return (
                <div key={segment.name} className="flex items-center gap-4 p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${segment.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{segment.name}</h3>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{segment.share} market share</Badge>
                        <Badge variant="outline" className="text-green-600">{segment.growth}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{segment.description}</p>
                    <div className="text-lg font-bold text-primary">{segment.size}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Market Trends */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Key Market Trends
          </CardTitle>
          <CardDescription>
            Critical trends shaping the scheduling software landscape
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {marketTrends.map((trend) => (
              <div key={trend.trend} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{trend.trend}</h3>
                    <p className="text-sm text-muted-foreground">{trend.description}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant={trend.impact === 'High' ? 'default' : 'secondary'}>
                      {trend.impact} Impact
                    </Badge>
                    <div className="text-xs text-muted-foreground">{trend.timeline}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Market Adoption</span>
                    <span>{trend.percentage}%</span>
                  </div>
                  <Progress value={trend.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Landscape Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Competitive Landscape Overview
          </CardTitle>
          <CardDescription>
            High-level view of competitor categories and positioning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {competitiveLandscape.map((category) => (
              <div key={category.category} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{category.category}</h3>
                  <Badge variant={category.threat === 'High' ? 'destructive' : category.threat === 'Medium' ? 'secondary' : 'outline'}>
                    {category.threat} Threat
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-medium mb-1">Key Players</div>
                    <div className="text-muted-foreground">{category.companies.join(', ')}</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-green-600">Strengths</div>
                    <div className="text-muted-foreground">{category.strength}</div>
                  </div>
                  <div>
                    <div className="font-medium mb-1 text-orange-600">Weaknesses</div>
                    <div className="text-muted-foreground">{category.weakness}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Deep Dive: Competitive Intelligence</h3>
                <p className="text-sm text-muted-foreground">
                  Access detailed competitive analysis, market positioning, and strategic insights
                </p>
              </div>
              <Button onClick={() => setShowCompetitiveIntel(true)} className="flex items-center gap-2">
                View Full Analysis
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;