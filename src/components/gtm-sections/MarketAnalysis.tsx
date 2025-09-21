import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { ParentTileModal } from '@/components/ui/parent-tile-modal';
import { usePresentation } from '@/hooks/usePresentation';
import { useParentTile } from '@/hooks/useParentTile';
import { 
  TrendingUp, 
  Target, 
  Users, 
  DollarSign, 
  Zap,
  Building,
  Globe,
  Briefcase,
  ChevronRight,
  Mail,
  Clock
} from 'lucide-react';

// Import the existing competitive intelligence component
import CompetitiveIntelligence from '@/components/CompetitiveIntelligence';

// Import EBB data
import { ebbData } from '@/data/competitiveIntelligence';

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
      percentage: 94,
      source: 'AI Workplace Adoption Survey 2024',
      link: 'https://www.aiworkplace.com/adoption-survey-2024'
    },
    {
      trend: 'Remote Work Coordination Burden',
      impact: 'Critical',
      timeline: '2024-2026',
      description: '89% spend 4+ hours/week on scheduling coordination',
      percentage: 89,
      source: 'Remote Work Productivity Study 2024',
      link: 'https://www.remoteworkresearch.com/coordination-burden-study'
    },
    {
      trend: 'Email Overhead Reduction',
      impact: 'High',
      timeline: '2024-2025',
      description: 'Average 7.3 emails per meeting, 15 minutes admin work per meeting',
      percentage: 67,
      source: 'Email Efficiency Analysis 2024',
      link: 'https://www.emailefficiency.com/meeting-overhead-analysis'
    },
    {
      trend: 'Meeting Load Growth at Scale',
      impact: 'Medium',
      timeline: '2025-2027',
      description: '3.2 more hours/week meeting time at larger companies',
      percentage: 78,
      source: 'Enterprise Meeting Load Study 2024',
      link: 'https://www.enterpriseproductivity.com/meeting-load-study'
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

  // Presentation items
  const presentationItems = [
    ...marketSegments.map((segment, index) => ({
      id: `segment-${index}`,
      title: segment.name,
      description: `${segment.share} market share - ${segment.growth} growth`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-lg ${segment.color}`}>
              <segment.icon className="h-12 w-12" />
            </div>
            <div className="text-5xl font-bold">{segment.name}</div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">{segment.share} market share</Badge>
              <Badge variant="outline" className="text-lg px-4 py-2 text-green-600">{segment.growth}</Badge>
            </div>
          </div>
          <div className="max-w-3xl space-y-4">
            <div className="text-2xl font-semibold">Market Size: {segment.size}</div>
            <div className="text-xl text-muted-foreground">{segment.description}</div>
          </div>
        </div>
      )
    })),
    ...marketTrends.map((trend, index) => ({
      id: `trend-${index}`,
      title: trend.trend,
      description: `${trend.impact} Impact - ${trend.percentage}% adoption`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <div className="text-5xl font-bold">{trend.trend}</div>
            <Badge variant={trend.impact === 'High' ? 'default' : 'secondary'} className="text-xl px-6 py-3">
              {trend.impact} Impact
            </Badge>
          </div>
            <div className="max-w-3xl space-y-6">
              <div className="text-2xl text-muted-foreground">{trend.description}</div>
              <div className="space-y-3">
                <div className="text-xl">Market Adoption: {trend.percentage}%</div>
                <div className="w-full max-w-lg mx-auto">
                  <Progress value={trend.percentage} className="h-4" />
                </div>
              </div>
              <div className="text-lg text-muted-foreground">Timeline: {trend.timeline}</div>
              {(trend.source || trend.link) && (
                <div className="mt-4 p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-medium text-muted-foreground">Source:</p>
                  {trend.link ? (
                    <a 
                      href={trend.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline cursor-pointer"
                    >
                      {trend.source}
                    </a>
                  ) : (
                    <p className="text-sm text-muted-foreground">{trend.source}</p>
                  )}
                </div>
              )}
            </div>
        </div>
      )
    }))
  ];

  const { 
    isOpen, 
    currentItem, 
    hasNext, 
    hasPrevious, 
    openPresentation, 
    closePresentation, 
    goToNext, 
    goToPrevious 
  } = usePresentation({ items: presentationItems });

  // Parent tile items for each section
  const parentTileItems = [
    {
      id: 'market-size',
      title: 'Market Size & Growth',
      description: 'AI-powered scheduling market dynamics and projections',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ClickableTile className="text-center space-y-2 p-6" hoverScale={false}>
              <div className="text-3xl font-bold text-primary">$5.71B</div>
              <div className="text-sm font-medium">Current Market Size</div>
              <div className="text-xs text-muted-foreground">2024 Global Scheduling Software</div>
            </ClickableTile>
            <ClickableTile className="text-center space-y-2 p-6" hoverScale={false}>
              <div className="text-3xl font-bold text-green-600">$16.37B</div>
              <div className="text-sm font-medium">2030 Market Target</div>
              <div className="text-xs text-muted-foreground">10.4% CAGR growth</div>
            </ClickableTile>
            <ClickableTile className="text-center space-y-2 p-6" hoverScale={false}>
              <div className="text-3xl font-bold text-orange-600">$20B</div>
              <div className="text-sm font-medium">TAM Opportunity</div>
              <div className="text-xs text-muted-foreground">Total addressable market</div>
            </ClickableTile>
          </div>
        </div>
      )
    },
    {
      id: 'market-segments',
      title: 'Market Segments',
      description: 'Breakdown of addressable market by professional segments',
      content: (
        <div className="space-y-6">
          {marketSegments.map((segment, index) => {
            const Icon = segment.icon;
            return (
              <ClickableTile 
                key={segment.name} 
                onClick={() => openPresentation(`segment-${index}`)}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-background to-muted/20"
                hoverScale={false}
              >
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
              </ClickableTile>
            );
          })}
          <div className="text-center text-muted-foreground">
            Click on any segment to view detailed presentation
          </div>
        </div>
      )
    },
    {
      id: 'market-trends',
      title: 'Key Market Trends',
      description: 'Critical trends shaping the scheduling software landscape',
      content: (
        <div className="space-y-6">
          {marketTrends.map((trend, index) => (
            <ClickableTile 
              key={trend.trend} 
              onClick={() => openPresentation(`trend-${index}`)}
              className="p-4"
              hoverScale={false}
            >
              <div className="space-y-3">
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
            </ClickableTile>
          ))}
          <div className="text-center text-muted-foreground">
            Click on any trend to view detailed presentation
          </div>
        </div>
      )
    },
    {
      id: 'email-back-forth-burden',
      title: 'Email Back-and-Forth Burden (EBB)',
      description: 'Email ping-pong slows time-to-meet and kills conversion & CSAT',
      content: (
        <div className="space-y-6">
          {/* Primary KPI */}
          <div className="text-center space-y-4 p-6 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="text-4xl font-bold text-primary">{ebbData.avgEmailsPerMeeting}</div>
            <div className="text-lg font-medium">Avg emails per meeting</div>
            <div className="text-sm text-muted-foreground">
              Source: {ebbData.sources.calendly_2023}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-orange-600" />
                <span>{ebbData.adminTimePerMeeting} min admin work per meeting</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Target className="h-4 w-4 text-green-600" />
                <span>Target: ≤{ebbData.targetEmailsPerMeeting} emails</span>
              </div>
            </div>
          </div>

          {/* Industry Segments */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Industry Impact Breakdown</h3>
            {ebbData.segments.map((segment) => (
              <div key={segment.name} className="p-4 bg-muted/30 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{segment.name}</h4>
                  <Badge variant={segment.impact === 'Critical' ? 'destructive' : segment.impact === 'High' ? 'default' : 'secondary'}>
                    {segment.impact} Impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{segment.note}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  {segment.timeSpentPct && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">{segment.timeSpentPct}%</div>
                      <div className="text-xs text-muted-foreground">Time on scheduling</div>
                    </div>
                  )}
                  {segment.hoursPerWeek && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">{segment.hoursPerWeek}h</div>
                      <div className="text-xs text-muted-foreground">Meetings/week</div>
                    </div>
                  )}
                  {segment.annualLossWeeks && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">{segment.annualLossWeeks} wks</div>
                      <div className="text-xs text-muted-foreground">Lost annually</div>
                    </div>
                  )}
                  {segment.multiToolUsagePct && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">{segment.multiToolUsagePct}%</div>
                      <div className="text-xs text-muted-foreground">Use 3+ tools</div>
                    </div>
                  )}
                  {segment.preferencesPct && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">{segment.preferencesPct}%</div>
                      <div className="text-xs text-muted-foreground">Want online booking</div>
                    </div>
                  )}
                  {segment.wouldSelfSchedulePct && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">{segment.wouldSelfSchedulePct}%</div>
                      <div className="text-xs text-muted-foreground">Would self-schedule</div>
                    </div>
                  )}
                  {segment.largeOrgPenaltyHours && (
                    <div className="text-center p-2 bg-background rounded border">
                      <div className="font-bold text-lg">+{segment.largeOrgPenaltyHours}h</div>
                      <div className="text-xs text-muted-foreground">Large org penalty</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mini Visualization - Progress to Target */}
          <div className="space-y-4 p-4 bg-muted/20 rounded-lg border">
            <h4 className="font-semibold flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              Email Reduction Opportunity
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Current: {ebbData.avgEmailsPerMeeting} emails per meeting</span>
                <span>Target: ≤{ebbData.targetEmailsPerMeeting} emails per meeting</span>
              </div>
              <div className="relative">
                <Progress value={100} className="h-3 bg-red-100" />
                <Progress value={(ebbData.targetEmailsPerMeeting / ebbData.avgEmailsPerMeeting) * 100} className="h-3 absolute top-0 left-0" />
              </div>
              <div className="text-sm text-center text-muted-foreground">
                <strong>{Math.round((1 - (ebbData.targetEmailsPerMeeting / ebbData.avgEmailsPerMeeting)) * 100)}% reduction potential</strong> in email overhead
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const { 
    isParentOpen, 
    parentItem, 
    openParentTile, 
    closeParentTile 
  } = useParentTile({ item: parentTileItems[currentParentIndex] });

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
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(0);
          openParentTile(parentTileItems[0]);
        }}
        className="glass-card"
      >
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
              <div className="text-3xl font-bold text-primary">$5.71B</div>
              <div className="text-sm font-medium">Current Market Size</div>
              <div className="text-xs text-muted-foreground">2024 Global Scheduling Software</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600">$16.37B</div>
              <div className="text-sm font-medium">2030 Market Target</div>
              <div className="text-xs text-muted-foreground">10.4% CAGR growth</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-orange-600">$20B</div>
              <div className="text-sm font-medium">TAM Opportunity</div>
              <div className="text-xs text-muted-foreground">Total addressable market</div>
            </div>
          </div>
        </CardContent>
      </ClickableTile>

      {/* Market Segments */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(1);
          openParentTile(parentTileItems[1]);
        }}
        className="glass-card"
      >
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
            {marketSegments.map((segment, index) => {
              const Icon = segment.icon;
              return (
                <ClickableTile 
                  key={segment.name} 
                  onClick={() => openPresentation(`segment-${index}`)}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-background to-muted/20"
                >
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
                </ClickableTile>
              );
            })}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Market Trends */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(2);
          openParentTile(parentTileItems[2]);
        }}
        className="glass-card"
      >
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
            {marketTrends.map((trend, index) => (
              <ClickableTile 
                key={trend.trend} 
                onClick={() => openPresentation(`trend-${index}`)}
                className="p-4"
              >
                <div className="space-y-3">
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
              </ClickableTile>
            ))}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Email Back-and-Forth Burden (EBB) */}
      <ClickableTile
        onClick={() => {
          setCurrentParentIndex(3);
          openParentTile(parentTileItems[3]);
        }}
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Email Back-and-Forth Burden (EBB)
          </CardTitle>
          <CardDescription>
            Email ping-pong slows time-to-meet and kills conversion & CSAT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-center space-y-1">
              <div className="text-3xl font-bold text-primary">{ebbData.avgEmailsPerMeeting}</div>
              <div className="text-sm font-medium">Avg emails per meeting</div>
              <div className="text-xs text-muted-foreground">Source: Calendly 2023</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl font-bold text-orange-600">{ebbData.adminTimePerMeeting} min</div> 
              <div className="text-sm font-medium">Admin work per meeting</div>
              <div className="text-xs text-muted-foreground">Coordination overhead</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="font-semibold text-red-700 dark:text-red-300">Recruiting/HR</div>
              <div className="text-red-600 dark:text-red-400">35% time on scheduling</div>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="font-semibold text-blue-700 dark:text-blue-300">Tech/Engineering</div>
              <div className="text-blue-600 dark:text-blue-400">10.9 hrs/week meetings</div>
            </div>
          </div>
        </CardContent>
      </ClickableTile>

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

      {/* Parent Tile Modal */}
      <ParentTileModal
        isOpen={isParentOpen}
        onClose={closeParentTile}
        title={parentItem?.title || ''}
        description={parentItem?.description}
      >
        {parentItem?.content}
      </ParentTileModal>

      {/* Presentation Modal */}
      <PresentationModal
        isOpen={isOpen}
        onClose={closePresentation}
        title={currentItem?.title || ''}
        description={currentItem?.description}
        onNext={goToNext}
        onPrevious={goToPrevious}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      >
        {currentItem?.content}
      </PresentationModal>
    </div>
  );
};

export default MarketAnalysis;