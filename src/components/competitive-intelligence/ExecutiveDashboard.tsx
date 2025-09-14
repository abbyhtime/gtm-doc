import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { usePresentation } from '@/hooks/usePresentation';
import { TrendingUp, TrendingDown, DollarSign, Users, Zap, Target, BarChart3, ArrowUpRight } from 'lucide-react';

const ExecutiveDashboard = () => {
  const marketMetrics = [
    { label: 'Current Market Size', value: '$5.71B', trend: '2024', icon: DollarSign, color: 'text-green-500', source: 'Global Scheduling Software Market Report 2024' },
    { label: 'Projected 2030', value: '$16.37B', trend: '10.4% CAGR', icon: TrendingUp, color: 'text-blue-500', source: 'Market Research Future Analysis' },
    { label: 'AI Subsegment', value: '$1.4B', trend: '25% CAGR', icon: Zap, color: 'text-purple-500', source: 'AI Scheduling Tools Market Study 2024' },
    { label: 'Time Saved/User', value: '1.5hr/week', trend: 'ROI', icon: Zap, color: 'text-orange-500', source: 'Productivity Impact Study 2024' },
  ];

  const keyInsights = [
    {
      title: 'AI Renaissance Timing',
      insight: 'Unlike past failures (Clara Labs, x.ai), current AI capabilities enable practical scheduling automation with proven ROI',
      impact: 'Critical',
      color: 'bg-red-50 border-red-200 text-red-800'
    },
    {
      title: 'Rapid Revenue Growth',
      insight: 'Motion achieved $10M ARR in just 4 months, demonstrating enterprise demand for AI-powered productivity',
      impact: 'High',
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      title: 'Market Consolidation Beginning',
      insight: 'Dropbox acquired Reclaim.ai for $15M, Bizzabo acquired x.ai assets - consolidation phase starting',
      impact: 'High',
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      title: 'Productivity Impact Proven',
      insight: 'Users save 1.5 hours/week, 20% productivity boost, 75% faster scheduling vs manual methods',
      impact: 'High',
      color: 'bg-green-50 border-green-200 text-green-800'
    }
  ];

  // Presentation items
  const presentationItems = [
    ...marketMetrics.map((metric, index) => ({
      id: `metric-${index}`,
      title: metric.label,
      description: `${metric.value} - ${metric.trend}`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <metric.icon className={`h-20 w-20 mx-auto ${metric.color}`} />
            <div className="text-6xl font-bold">{metric.value}</div>
            <div className="text-2xl font-medium text-muted-foreground">{metric.label}</div>
            <Badge variant="secondary" className="text-lg px-4 py-2">{metric.trend}</Badge>
          </div>
          <div className="max-w-2xl space-y-4">
            <div className="text-lg text-muted-foreground">
              {index === 0 && "The AI-powered scheduling market is currently valued at $5.71B and represents a significant opportunity for growth and innovation."}
              {index === 1 && "By 2030, the market is projected to reach $16.37B, driven by increasing remote work and AI adoption, representing a compound annual growth rate of 10.4%."}
              {index === 2 && "The AI scheduling subsegment is growing at 25% CAGR, reaching $1.4B by 2025, indicating strong investor confidence in this market."}
              {index === 3 && "Users save an average of 1.5 hours per week using AI scheduling tools, demonstrating clear ROI and productivity gains."}
            </div>
            {metric.source && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
                <p className="text-sm font-medium text-muted-foreground">Source:</p>
                <p className="text-sm text-muted-foreground">{metric.source}</p>
              </div>
            )}
          </div>
        </div>
      )
    })),
    ...keyInsights.map((insight, index) => ({
      id: `insight-${index}`,
      title: insight.title,
      description: `${insight.impact} Impact`,
      content: (
        <div className="flex flex-col justify-center h-full space-y-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <Badge variant="outline" className="text-xl px-6 py-3">{insight.impact} Impact</Badge>
            <h1 className="text-5xl font-bold">{insight.title}</h1>
          </div>
          <div className="text-2xl leading-relaxed text-center">
            {insight.insight}
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
            The AI-powered scheduling market is poised for explosive growth from $5.71B (2024) to $16.37B (2030) at a 10.4% CAGR, driven by mature AI capabilities, remote work adoption, and proven productivity ROI.
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
                  Rapid market expansion: $5.71B → $16.37B (10.4% CAGR)
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
          <ClickableTile 
            key={index} 
            onClick={() => openPresentation(`metric-${index}`)}
          >
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
          </ClickableTile>
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
              <span className="text-sm font-medium">2024: $5.71B</span>
              <span className="text-sm text-muted-foreground">Base Year</span>
            </div>
            <Progress value={35} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2027: $11.04B</span>
              <span className="text-sm text-muted-foreground">Mid-point</span>
            </div>
            <Progress value={67} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">2030: $16.37B</span>
              <span className="text-sm text-muted-foreground">Projected</span>
            </div>
            <Progress value={100} className="h-2" />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>10.4% CAGR</strong> driven by hybrid work adoption, AI advancement, and productivity demands
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
              <ClickableTile 
                key={index} 
                className={`${insight.color} border`}
                onClick={() => openPresentation(`insight-${index}`)}
              >
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <Badge variant="outline" className="text-xs bg-foreground text-background border-foreground">
                        {insight.impact}
                      </Badge>
                    </div>
                    <p className="text-sm">{insight.insight}</p>
                  </div>
                </CardContent>
              </ClickableTile>
            ))}
          </div>
        </CardContent>
      </Card>

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

export default ExecutiveDashboard;