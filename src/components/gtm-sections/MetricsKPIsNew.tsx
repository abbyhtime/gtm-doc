import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { ParentTileModal } from '@/components/ui/parent-tile-modal';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { MultiValueInput } from '@/components/ui/multi-value-input';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePresentation } from '@/hooks/usePresentation';
import { useParentTile } from '@/hooks/useParentTile';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Calendar,
  Mail,
  UserCheck,
  Network,
  Edit2,
  Save,
  X
} from 'lucide-react';

const MetricsKPIs = () => {
  // North Star Metric based on PDF document
  const northStarMetric = {
    id: 'waan',
    name: 'WAAN (Weekly Active Atomic Networks)',
    definition: 'Unique meetings/week with 3 fully activated attendees',
    current: '12',
    target: '50',
    unit: 'WAAN/week',
    status: 'needs-attention',
    why: 'Measures core value delivery: network formation, activation, engagement, and referral',
    phase: 'Q1 Launch',
    icon: Network,
    color: 'text-primary',
    source: 'Metrics Framework - Atomic Networks Strategy 2024',
    link: '#'
  };

  // Critical Input Metrics from PDF
  const criticalInputs = [
    {
      id: 'new-signups',
      name: 'New Signups',
      definition: 'Number of users registering',
      current: '85',
      target: '200',
      unit: 'signups/mo',
      status: 'needs-attention',
      why: 'Indicates initial interest; replenishes the funnel',
      source: 'User Acquisition Analytics 2024'
    },
    {
      id: 'activation-rate',
      name: 'Activation Rate',
      definition: '% of signups who connect their calendar or schedule first meeting',
      current: '32%',
      target: '50%',
      unit: '',
      status: 'needs-improvement',
      why: 'Ensures users reach key moment needed to participate in WAAN loops',
      successCriteria: 'calendar-connect within 3 days',
      source: 'Onboarding Conversion Analysis 2024'
    },
    {
      id: 'invite-conversion',
      name: 'Invite Conversion',
      definition: '% of sent invites that lead to signups',
      current: '12%',
      target: '20%',
      unit: '',
      status: 'on-track',
      why: 'Direct contributor to atomic network formation; supports WAAN growth',
      successCriteria: 'invite-to-signup conversion',
      source: 'Viral Mechanics Study 2024'
    },
    {
      id: 'time-to-first-meeting',
      name: 'Time to First Meeting',
      definition: 'Median time from signup to first meeting',
      current: '72',
      target: '48',
      unit: 'hours',
      status: 'needs-improvement',
      why: 'Shorter times → faster network formation and higher retention',
      source: 'User Journey Analytics 2024'
    }
  ];

  // Engagement Metrics from PDF
  const engagementMetrics = [
    {
      id: 'magic-number',
      name: '% Hitting Magic Number',
      definition: 'Users who reach the activation threshold within their first month',
      current: '28%',
      target: '40%',
      unit: '',
      status: 'needs-improvement',
      why: 'Identifies users likely to retain; proxy for engagement depth',
      phase: 'within month 1',
      source: 'Engagement Analysis 2024'
    },
    {
      id: 'meetings-per-user',
      name: 'Meetings per User (weekly)',
      definition: 'Avg. scheduled meetings per active user/week',
      current: '1.3',
      target: '2',
      unit: 'meetings/user/week',
      status: 'on-track',
      why: 'Indicates volume of usage beyond WAAN; deeper adoption',
      source: 'Usage Analytics 2024'
    },
    {
      id: 'team-member-adoption',
      name: 'Team Member Adoption',
      definition: '% of team members actively using the platform',
      current: '45%',
      target: '70%',
      unit: '',
      status: 'needs-attention',
      why: 'Team-wide adoption drives network effects and stickiness',
      source: 'Team Usage Analysis 2024'
    },
    {
      id: 'calendar-connections',
      name: 'Calendar Connections',
      definition: 'Average number of calendar integrations per user',
      current: '1.8',
      target: '2.5',
      unit: 'connections/user',
      status: 'on-track',
      why: 'More connections = better scheduling experience',
      source: 'Integration Analytics 2024'
    }
  ];

  // Retention Metrics from PDF
  const retentionMetrics = [
    {
      id: '30-day-retention',
      name: '30 Day User Retention',
      definition: '% of users still active after 30 days',
      current: '68%',
      target: '75%',
      unit: '',
      status: 'on-track',
      why: 'Early retention predictor; indicates product-market fit',
      source: 'Retention Cohort Analysis 2024'
    },
    {
      id: 'k-factor',
      name: 'K Factor',
      definition: 'Viral coefficient measuring organic growth',
      current: '0.8',
      target: '1.2',
      unit: '',
      status: 'needs-improvement',
      why: 'Measures viral growth potential; >1.0 = exponential growth',
      source: 'Viral Growth Analysis 2024'
    },
    {
      id: 'nps',
      name: 'Net Promoter Score (NPS)',
      definition: 'Customer satisfaction and loyalty metric',
      current: '42',
      target: '60',
      unit: '',
      status: 'on-track',
      why: 'Indicates customer satisfaction and referral likelihood',
      source: 'Customer Satisfaction Survey Q4 2024'
    }
  ];

  // Financial Metrics from PDF
  const financialMetrics = [
    {
      id: 'burn-rate',
      name: 'Burn Rate',
      definition: 'Monthly cash expenditure',
      current: '$85K',
      target: '$120K',
      unit: '/month',
      status: 'good',
      why: 'Runway management and growth sustainability',
      source: 'Financial Planning Model 2024'
    },
    {
      id: 'runway',
      name: 'Runway',
      definition: 'Months of operations remaining with current burn',
      current: '18',
      target: '24',
      unit: 'months',
      status: 'on-track',
      why: 'Time available to reach next funding milestone',
      source: 'Financial Planning Model 2024'
    }
  ];

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMetrics, setEditingMetrics] = useState<any>(null);
  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const [allMetricsState, setAllMetricsState] = useState({
    northStar: northStarMetric,
    criticalInputs,
    engagement: engagementMetrics,
    retention: retentionMetrics,
    financial: financialMetrics
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20 border-green-200';
      case 'on-track':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 border-blue-200';
      case 'needs-attention':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 border-yellow-200';
      case 'needs-improvement':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
      case 'on-track':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs-attention':
        return <Clock className="h-4 w-4" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  // All metrics for presentation - use state version
  const allMetrics = [
    allMetricsState.northStar, 
    ...allMetricsState.criticalInputs, 
    ...allMetricsState.engagement, 
    ...allMetricsState.retention, 
    ...allMetricsState.financial
  ];

  // Update metric function
  const updateMetric = (category: string, metricId: string, updates: any) => {
    setAllMetricsState(prev => {
      const newState = { ...prev };
      if (category === 'northStar') {
        newState.northStar = { ...newState.northStar, ...updates };
      } else if (category in newState) {
        const categoryData = newState[category as keyof typeof newState] as any[];
        const metricIndex = categoryData.findIndex(m => m.id === metricId);
        if (metricIndex !== -1) {
          categoryData[metricIndex] = { ...categoryData[metricIndex], ...updates };
        }
      }
      return newState;
    });
  };

  // Presentation items
  const presentationItems = allMetrics.map((metric, index) => ({
    id: `metrics-kpi-${metric.id}`,
    title: metric.name,
    description: `Current: ${metric.current}${metric.unit} | Target: ${metric.target}${metric.unit}`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            {metric.id === 'waan' ? (
              <Network className="h-20 w-20 text-primary" />
            ) : (
              <Target className="h-20 w-20 text-primary" />
            )}
          </div>
          <div className="text-4xl font-bold">{metric.name}</div>
          <Badge className={getStatusColor(metric.status)} variant="outline">
            {getStatusIcon(metric.status)}
            <span className="ml-1 capitalize">{metric.status.replace('-', ' ')}</span>
          </Badge>
        </div>
        <div className="max-w-3xl space-y-6">
          <div className="grid grid-cols-2 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{metric.current}{metric.unit}</div>
              <div className="text-muted-foreground">Current</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{metric.target}{metric.unit}</div>
              <div className="text-muted-foreground">Target</div>
            </div>
          </div>
          <div className="text-xl text-muted-foreground max-w-2xl mx-auto">
            <strong>Definition:</strong> 
            {isEditMode && editingMetrics?.id === metric.id ? (
              <div className="mt-2">
                <RichTextEditor
                  value={editingMetrics.definition}
                  onChange={(value) => setEditingMetrics(prev => ({ ...prev, definition: value || '' }))}
                  height={100}
                />
                <div className="flex gap-2 mt-2">
                  <Button size="sm" onClick={() => {
                    updateMetric(
                      metric.id === 'waan' ? 'northStar' : 
                      allMetricsState.criticalInputs.find(m => m.id === metric.id) ? 'criticalInputs' :
                      allMetricsState.engagement.find(m => m.id === metric.id) ? 'engagement' :
                      allMetricsState.retention.find(m => m.id === metric.id) ? 'retention' : 'financial',
                      metric.id,
                      { definition: editingMetrics.definition, why: editingMetrics.why }
                    );
                    setEditingMetrics(null);
                    setIsEditMode(false);
                  }}>
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    setEditingMetrics(null);
                    setIsEditMode(false);
                  }}>
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="inline prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: metric.definition }}
              />
            )}
          </div>
          <div className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <strong>Why It Matters:</strong> 
            {isEditMode && editingMetrics?.id === metric.id ? (
              <div className="mt-2">
                <RichTextEditor
                  value={editingMetrics.why}
                  onChange={(value) => setEditingMetrics(prev => ({ ...prev, why: value || '' }))}
                  height={100}
                />
              </div>
            ) : (
              <span 
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: metric.why }}
              />
            )}
            {!isEditMode && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-2" 
                onClick={() => {
                  setEditingMetrics({
                    id: metric.id,
                    definition: metric.definition,
                    why: metric.why
                  });
                  setIsEditMode(true);
                }}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          {metric.source && (
            <div className="mt-4 p-3 bg-muted/30 rounded-lg border-l-4 border-primary max-w-2xl mx-auto">
              <p className="text-sm font-medium text-muted-foreground">Source:</p>
              <p className="text-sm text-primary">{metric.source}</p>
            </div>
          )}
        </div>
      </div>
    )
  }));

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

  // Parent tiles for each section - using state data
  const parentTiles = [
    {
      id: 'metrics-kpi-north-star',
      title: 'North Star Metric',
      description: 'Primary success indicator driving business growth',
      content: (
        <div className="space-y-6">
          <ClickableTile 
            onClick={() => openPresentation(`metrics-kpi-${allMetricsState.northStar.id}`)}
            className="p-6"
            hoverScale={false}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Network className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-bold text-lg">{allMetricsState.northStar.name}</h3>
                  <div 
                    className="text-sm text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: allMetricsState.northStar.definition }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-3xl font-bold text-muted-foreground">{allMetricsState.northStar.current}</div>
                  <div className="text-sm text-muted-foreground">Current</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-primary/10">
                  <div className="text-3xl font-bold text-primary">{allMetricsState.northStar.target}</div>
                  <div className="text-sm text-muted-foreground">Target</div>
                </div>
              </div>

              <Badge className={getStatusColor(allMetricsState.northStar.status)} variant="outline">
                {getStatusIcon(allMetricsState.northStar.status)}
                <span className="ml-1 capitalize">{allMetricsState.northStar.status.replace('-', ' ')}</span>
              </Badge>
              
              <div className="text-sm text-muted-foreground border-t pt-4">
                <strong>Source:</strong> {allMetricsState.northStar.source}
              </div>
            </div>
          </ClickableTile>
          <div className="text-center text-muted-foreground">
            Click to view detailed presentation and edit
          </div>
        </div>
      )
    },
    {
      id: 'metrics-kpi-critical-inputs',
      title: 'Critical Input Metrics',
      description: 'Key drivers of the North Star metric',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMetricsState.criticalInputs.map((metric) => (
              <ClickableTile 
                key={metric.id}
                onClick={() => openPresentation(`metrics-kpi-${metric.id}`)}
                className="p-4"
                hoverScale={false}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base">{metric.name}</h3>
                    <div 
                      className="text-xs text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: metric.definition }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{metric.target}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Target</div>
                    </div>
                  </div>

                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 text-xs capitalize">{metric.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </ClickableTile>
            ))}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any metric to view detailed presentation and edit
          </div>
        </div>
      )
    },
    {
      id: 'metrics-kpi-engagement',
      title: 'Engagement Metrics',
      description: 'User engagement and usage depth indicators',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMetricsState.engagement.map((metric) => (
              <ClickableTile 
                key={metric.id}
                onClick={() => openPresentation(`metrics-kpi-${metric.id}`)}
                className="p-4"
                hoverScale={false}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base">{metric.name}</h3>
                    <div 
                      className="text-xs text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: metric.definition }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{metric.target}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Target</div>
                    </div>
                  </div>

                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 text-xs capitalize">{metric.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </ClickableTile>
            ))}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any metric to view detailed presentation and edit
          </div>
        </div>
      )
    },
    {
      id: 'metrics-kpi-retention',
      title: 'Retention Metrics',
      description: 'User retention and satisfaction indicators',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allMetricsState.retention.map((metric) => (
              <ClickableTile 
                key={metric.id}
                onClick={() => openPresentation(`metrics-kpi-${metric.id}`)}
                className="p-4"
                hoverScale={false}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base">{metric.name}</h3>
                    <div 
                      className="text-xs text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: metric.definition }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{metric.target}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Target</div>
                    </div>
                  </div>

                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 text-xs capitalize">{metric.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </ClickableTile>
            ))}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any metric to view detailed presentation and edit
          </div>
        </div>
      )
    },
    {
      id: 'metrics-kpi-financial',
      title: 'Financial Metrics',
      description: 'Key financial health indicators',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {allMetricsState.financial.map((metric) => (
              <ClickableTile 
                key={metric.id}
                onClick={() => openPresentation(`metrics-kpi-${metric.id}`)}
                className="p-4"
                hoverScale={false}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-base">{metric.name}</h3>
                    <div 
                      className="text-xs text-muted-foreground prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: metric.definition }}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-primary">{metric.target}{metric.unit}</div>
                      <div className="text-xs text-muted-foreground">Target</div>
                    </div>
                  </div>

                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 text-xs capitalize">{metric.status.replace('-', ' ')}</span>
                  </Badge>
                  
                  {metric.source && (
                    <div className="text-xs text-muted-foreground border-t pt-2">
                      <strong>Source:</strong> {metric.source}
                    </div>
                  )}
                </div>
              </ClickableTile>
            ))}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any metric to view detailed presentation and edit
          </div>
        </div>
      )
    }
  ];

  // Parent tile hook
  const { 
    isParentOpen, 
    parentItem, 
    openParentTile, 
    closeParentTile 
  } = useParentTile({ item: parentTiles[currentParentIndex] });

  return (
    <div className="space-y-8">
      {/* North Star Metric */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(0);
          openParentTile(parentTiles[0]);
        }}
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            North Star Metric
          </CardTitle>
          <CardDescription>
            Primary success indicator driving business growth - WAAN (Weekly Active Atomic Networks)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
              <div className="text-2xl font-bold">{allMetricsState.northStar.current} WAAN/week</div>
                <div className="text-sm text-muted-foreground">Current Performance</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{allMetricsState.northStar.target} WAAN/week</div>
                <div className="text-sm text-muted-foreground">Q1 2025 Target</div>
              </div>
            </div>
            <Progress value={(parseInt(allMetricsState.northStar.current) / parseInt(allMetricsState.northStar.target)) * 100} className="h-3" />
            <div className="text-sm text-muted-foreground">
              <strong>Definition:</strong> <div 
                className="inline prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: allMetricsState.northStar.definition }}
              />
            </div>
          </div>
        </CardContent>
      </ClickableTile>

      {/* Critical Input Metrics */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(1);
          openParentTile(parentTiles[1]);
        }}
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Critical Input Metrics
          </CardTitle>
          <CardDescription>
            Key drivers that feed into the North Star metric
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allMetricsState.criticalInputs.map((metric) => (
              <div key={metric.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">{metric.name}</div>
                    <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Target: {metric.target}{metric.unit}</span>
                      <span>{Math.round((parseInt(metric.current.replace('%', '')) / parseInt(metric.target.replace('%', ''))) * 100)}%</span>
                    </div>
                    <Progress value={(parseInt(metric.current.replace('%', '')) / parseInt(metric.target.replace('%', ''))) * 100} className="h-2" />
                  </div>
                  
                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Engagement Metrics */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(2);
          openParentTile(parentTiles[2]);
        }}
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Engagement Metrics
          </CardTitle>
          <CardDescription>
            User engagement and usage depth indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {allMetricsState.engagement.map((metric) => (
              <div key={metric.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium">{metric.name}</div>
                    <div className="text-xl font-bold">{metric.current}{metric.unit}</div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Target: {metric.target}{metric.unit}</span>
                    </div>
                    <Progress value={(parseFloat(metric.current.replace('%', '')) / parseFloat(metric.target.replace('%', ''))) * 100} className="h-2" />
                  </div>
                  
                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Retention & Financial Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ClickableTile 
          onClick={() => {
            setCurrentParentIndex(3);
            openParentTile(parentTiles[3]);
          }}
          className="glass-card"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Retention Metrics
            </CardTitle>
            <CardDescription>
              User retention and satisfaction indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allMetricsState.retention.map((metric) => (
                <div key={metric.id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <div className="font-medium text-sm">{metric.name}</div>
                    <div className="text-lg font-bold">{metric.current}{metric.unit}</div>
                  </div>
                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </ClickableTile>

        <ClickableTile 
          onClick={() => {
            setCurrentParentIndex(4);
            openParentTile(parentTiles[4]);
          }}
          className="glass-card"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Financial Metrics
            </CardTitle>
            <CardDescription>
              Key financial health indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {allMetricsState.financial.map((metric) => (
                <div key={metric.id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <div className="font-medium text-sm">{metric.name}</div>
                    <div className="text-lg font-bold">{metric.current}{metric.unit}</div>
                  </div>
                  <Badge className={getStatusColor(metric.status)} variant="outline">
                    {getStatusIcon(metric.status)}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </ClickableTile>
      </div>

      {/* Parent Tile Modal */}
      <ParentTileModal
        isOpen={isParentOpen}
        onClose={closeParentTile}
        title={parentItem?.title}
        description={parentItem?.description}
      >
        {parentItem?.content}
      </ParentTileModal>

      {/* Presentation Modal */}
      <PresentationModal
        isOpen={isOpen}
        onClose={closePresentation}
        title={currentItem?.title}
        description={currentItem?.description}
        onNext={hasNext ? goToNext : undefined}
        onPrevious={hasPrevious ? goToPrevious : undefined}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      >
        {currentItem?.content}
      </PresentationModal>
    </div>
  );
};

export default MetricsKPIs;