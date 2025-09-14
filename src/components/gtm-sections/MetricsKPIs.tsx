import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { ParentTileModal } from '@/components/ui/parent-tile-modal';
import { usePresentation } from '@/hooks/usePresentation';
import { useParentTile } from '@/hooks/useParentTile';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users,
  Target,
  Zap,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';

const MetricsKPIs = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('2025');

  const northStarMetrics = [
    {
      metric: 'Annual Recurring Revenue (ARR)',
      current: '$150K',
      target2025: '$1.15M',
      target2026: '$5M',  
      target2027: '$25M',
      description: 'Primary revenue metric tracking subscription growth',
      status: 'on-track',
      icon: DollarSign,
      color: 'text-green-600',
      source: 'SaaS Metrics 2.0 by David Skok'
    },
    {
      metric: 'Net Revenue Retention (NRR)',
      current: '95%',
      target2025: '110%',
      target2026: '115%',
      target2027: '120%',
      description: 'Revenue expansion from existing customers',
      status: 'needs-attention',
      icon: TrendingUp,
      color: 'text-blue-600',
      source: 'SaaS Metrics 2.0 by David Skok'
    },
    {
      metric: 'Monthly Active Users (MAU)',
      current: '450',
      target2025: '8K',
      target2026: '25K',
      target2027: '100K',
      description: 'Users actively scheduling through the platform',
      status: 'on-track',
      icon: Users,
      color: 'text-purple-600',
      source: 'Product Analytics Best Practices by Mixpanel'
    }
  ];

  const growthMetrics = [
    {
      category: 'Acquisition',
      metrics: [
        { name: 'New Customers/Month', current: 12, target: 85, unit: '' },
        { name: 'Customer Acquisition Cost (CAC)', current: 180, target: 150, unit: '$' },
        { name: 'Website Conversion Rate', current: 2.3, target: 4.5, unit: '%' },
        { name: 'Free Trial to Paid Rate', current: 15, target: 25, unit: '%' }
      ]
    },
    {
      category: 'Activation',
      metrics: [
        { name: 'Time to First Value', current: 7, target: 3, unit: 'days' },
        { name: 'Onboarding Completion Rate', current: 65, target: 85, unit: '%' },
        { name: 'First Week Engagement', current: 45, target: 70, unit: '%' },
        { name: 'Feature Adoption Rate', current: 35, target: 60, unit: '%' }
      ]
    },
    {
      category: 'Retention',
      metrics: [
        { name: 'Monthly Churn Rate', current: 8, target: 3, unit: '%' },
        { name: 'Customer Satisfaction (CSAT)', current: 7.2, target: 8.5, unit: '/10' },
        { name: 'Net Promoter Score (NPS)', current: 35, target: 60, unit: '' },
        { name: 'Support Ticket Resolution', current: 24, target: 12, unit: 'hrs' }
      ]
    },
    {
      category: 'Revenue',
      metrics: [
        { name: 'Average Revenue Per User (ARPU)', current: 28, target: 45, unit: '$' },
        { name: 'Customer Lifetime Value (LTV)', current: 1680, target: 2400, unit: '$' },
        { name: 'LTV:CAC Ratio', current: 9.3, target: 16, unit: ':1' },
        { name: 'Gross Revenue Retention', current: 92, target: 97, unit: '%' }
      ]
    }
  ];

  const operationalMetrics = [
    {
      area: 'Product',
      metrics: [
        { name: 'Feature Release Velocity', value: '2.5/month', target: '4/month', status: 'needs-improvement' },
        { name: 'Bug Resolution Time', value: '3.2 days', target: '1.5 days', status: 'needs-improvement' },
        { name: 'API Uptime', value: '99.2%', target: '99.9%', status: 'good' },
        { name: 'AI Accuracy Rate', value: '87%', target: '95%', status: 'on-track' }
      ]
    },
    {
      area: 'Sales',
      metrics: [
        { name: 'Sales Qualified Leads (SQLs)', value: '45/month', target: '120/month', status: 'needs-improvement' },
        { name: 'Lead to Customer Rate', value: '12%', target: '18%', status: 'on-track' },
        { name: 'Average Deal Size', value: '$1,680', target: '$2,400', status: 'good' },
        { name: 'Sales Cycle Length', value: '45 days', target: '35 days', status: 'needs-improvement' }
      ]
    },
    {
      area: 'Marketing',
      metrics: [
        { name: 'Marketing Qualified Leads (MQLs)', value: '180/month', target: '400/month', status: 'needs-improvement' },
        { name: 'Content Engagement Rate', value: '3.2%', target: '5.5%', status: 'on-track' },
        { name: 'Brand Awareness', value: '8%', target: '25%', status: 'needs-improvement' },
        { name: 'Cost Per Lead', value: '$45', target: '$32', status: 'needs-improvement' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track':
      case 'good':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'needs-attention':
      case 'on-track':
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'needs-improvement':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'needs-attention':
        return <Clock className="h-4 w-4" />;
      case 'needs-improvement':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  // Presentation items
  const presentationItems = [
    ...northStarMetrics.map((metric, index) => ({
      id: `northstar-${index}`,
      title: metric.metric,
      description: `Current: ${metric.current} | 2025 Target: ${metric.target2025}`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <metric.icon className={`h-20 w-20 mx-auto ${metric.color}`} />
            <div className="text-4xl font-bold">{metric.metric}</div>
            <Badge className={getStatusColor(metric.status)} variant="outline">
              {getStatusIcon(metric.status)}
              <span className="ml-1 capitalize">{metric.status.replace('-', ' ')}</span>
            </Badge>
          </div>
          <div className="max-w-3xl space-y-6">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">{metric.current}</div>
                <div className="text-muted-foreground">Current</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">{metric.target2025}</div>
                <div className="text-muted-foreground">2025 Target</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600">{metric.target2027}</div>
                <div className="text-muted-foreground">2027 Target</div>
              </div>
            </div>
            <div className="text-xl text-muted-foreground">{metric.description}</div>
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

  // Parent tile for North Star Metrics
  const northStarParentTile = {
    id: 'north-star-metrics',
    title: 'North Star Metrics',
    description: 'Primary success indicators driving business growth and value',
    content: (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {northStarMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <ClickableTile 
                key={metric.metric} 
                onClick={() => openPresentation(`northstar-${index}`)}
                className="p-4"
                hoverScale={false}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${metric.color}`} />
                    <div>
                      <h3 className="font-semibold text-sm">{metric.metric}</h3>
                      <p className="text-xs text-muted-foreground">{metric.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current</span>
                      <span className="font-bold">{metric.current}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>2025 Target</span>
                      <span className="font-bold text-primary">{metric.target2025}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>2027 Target</span>
                      <span className="font-bold text-green-600">{metric.target2027}</span>
                    </div>
                  </div>

                  <Badge className={getStatusColor(metric.status)}>
                    {getStatusIcon(metric.status)}
                    <span className="ml-1 capitalize">{metric.status.replace('-', ' ')}</span>
                  </Badge>
                </div>
              </ClickableTile>
            );
          })}
        </div>
        <div className="text-center text-muted-foreground">
          Click on any metric to view detailed presentation
        </div>
      </div>
    )
  };

  const { 
    isParentOpen, 
    parentItem, 
    openParentTile, 
    closeParentTile 
  } = useParentTile({ item: northStarParentTile });

  return (
    <div className="space-y-8">
      {/* North Star Metrics */}
      <ClickableTile 
        onClick={() => openParentTile()}
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            North Star Metrics
          </CardTitle>
          <CardDescription>
            Primary success indicators driving business growth and value
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {northStarMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <ClickableTile 
                  key={metric.metric} 
                  onClick={() => openPresentation(`northstar-${index}`)}
                  className="p-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                      <div>
                        <h3 className="font-semibold text-sm">{metric.metric}</h3>
                        <p className="text-xs text-muted-foreground">{metric.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Current</span>
                        <span className="font-bold">{metric.current}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2025 Target</span>
                        <span className="font-bold text-primary">{metric.target2025}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>2027 Target</span>
                        <span className="font-bold text-green-600">{metric.target2027}</span>
                      </div>
                    </div>

                    <Badge className={getStatusColor(metric.status)}>
                      {getStatusIcon(metric.status)}
                      <span className="ml-1 capitalize">{metric.status.replace('-', ' ')}</span>
                    </Badge>
                    
                    <div className="text-xs text-muted-foreground mt-2 border-t pt-2">
                      <strong>Source:</strong> <a href="#" className="text-primary hover:underline">{metric.source}</a>
                    </div>
                  </div>
                </ClickableTile>
              );
            })}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Growth Metrics by Category */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Growth Metrics Framework
          </CardTitle>
          <CardDescription>
            AARRR (Acquisition, Activation, Retention, Revenue, Referral) metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="acquisition" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              {growthMetrics.map((category) => (
                <TabsTrigger key={category.category.toLowerCase()} value={category.category.toLowerCase()}>
                  {category.category}
                </TabsTrigger>
              ))}
            </TabsList>

            {growthMetrics.map((category) => (
              <TabsContent key={category.category.toLowerCase()} value={category.category.toLowerCase()}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.metrics.map((metric) => {
                    const progress = metric.name.includes('Churn') || metric.name.includes('Time') ? 
                      Math.max(0, 100 - (metric.current / metric.target) * 100) :
                      (metric.current / metric.target) * 100;
                    
                    return (
                      <div key={metric.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                        <div className="space-y-3">
                          <div>
                            <div className="text-sm font-medium">{metric.name}</div>
                            <div className="text-2xl font-bold">
                              {metric.unit === '$' ? '$' : ''}{metric.current}{metric.unit !== '$' ? metric.unit : ''}
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Target: {metric.unit === '$' ? '$' : ''}{metric.target}{metric.unit !== '$' ? metric.unit : ''}</span>
                              <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={Math.min(100, progress)} className="h-2" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Operational Metrics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Operational Metrics
          </CardTitle>
          <CardDescription>
            Department-specific KPIs for operational excellence
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {operationalMetrics.map((area) => (
              <div key={area.area} className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  {area.area === 'Product' && <Zap className="h-5 w-5 text-purple-600" />}
                  {area.area === 'Sales' && <DollarSign className="h-5 w-5 text-green-600" />}
                  {area.area === 'Marketing' && <Users className="h-5 w-5 text-blue-600" />}
                  {area.area}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {area.metrics.map((metric) => (
                    <div key={metric.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm font-medium">{metric.name}</div>
                        <Badge className={getStatusColor(metric.status)}>
                          {getStatusIcon(metric.status)}
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="text-lg font-bold">{metric.value}</div>
                        <div className="text-xs text-muted-foreground">
                          Target: {metric.target}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Criteria & Milestones */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Success Criteria & Milestones
          </CardTitle>
          <CardDescription>
            Key milestones and success criteria for GTM phases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: 'Q1 2025 - Mission Possible',
                criteria: [
                  { metric: 'MVP Launch', target: 'Complete', current: '75%', status: 'on-track' },
                  { metric: 'Active Users', target: '500', current: '450', status: 'on-track' },
                  { metric: 'NPS Score', target: '40+', current: '35', status: 'needs-attention' },
                  { metric: 'Monthly Revenue', target: '$50K', current: '$12K', status: 'needs-improvement' }
                ]
              },
              {
                phase: 'Q2-Q3 2025 - Into the Wild',
                criteria: [
                  { metric: 'Enterprise Pilots', target: '10', current: '0', status: 'planned' },
                  { metric: 'Monthly Growth Rate', target: '40%', current: '0%', status: 'planned' },
                  { metric: 'Product-Market Fit', target: 'Validated', current: 'Testing', status: 'planned' },
                  { metric: 'Monthly Revenue', target: '$500K', current: '$12K', status: 'planned' }
                ]
              },
              {
                phase: 'Q4 2025-Q2 2026 - Ready to Scale',
                criteria: [
                  { metric: 'Enterprise Customers', target: '100', current: '0', status: 'planned' },
                  { metric: 'ARR Growth Rate', target: '300%', current: '0%', status: 'planned' },
                  { metric: 'Net Revenue Retention', target: '120%', current: '95%', status: 'planned' },
                  { metric: 'Monthly Revenue', target: '$2M', current: '$12K', status: 'planned' }
                ]
              }
            ].map((phase, index) => (
              <div key={index} className="p-6 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <h3 className="font-semibold mb-4">{phase.phase}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {phase.criteria.map((criteria, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{criteria.metric}</span>
                        <Badge className={getStatusColor(criteria.status)}>
                          {getStatusIcon(criteria.status)}
                        </Badge>
                      </div>
                      <div className="text-xs">
                        <div>Current: {criteria.current}</div>
                        <div>Target: {criteria.target}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

export default MetricsKPIs;