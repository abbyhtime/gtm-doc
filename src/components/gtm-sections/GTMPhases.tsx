import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Globe,
  Building,
  BarChart3
} from 'lucide-react';

const GTMPhases = () => {
  const [selectedPhase, setSelectedPhase] = useState('mission');

  const phases = [
    {
      id: 'mission',
      name: 'Mission: Possible',
      subtitle: 'Foundation & MVP',
      timeline: 'Q1 2025',
      color: 'phase-mission',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      textColor: 'text-blue-700 dark:text-blue-300',
      icon: Rocket,
      status: 'In Progress',
      completion: 75,
      description: 'Build core AI scheduling assistant with basic email integration',
      goals: {
        revenue: '$50K MRR',
        users: '500 active users',
        features: '70% MVP completion'
      },
      keyActivities: [
        'Complete MVP development',
        'Gmail integration launch',
        'Alpha user testing (50 users)',
        'Product-market fit validation',
        'Initial brand positioning'
      ],
      exitCriteria: [
        'MVP feature complete',
        'Positive user feedback (NPS > 40)',
        'Basic AI scheduling working',
        'Gmail integration stable',
        'Initial revenue validation'
      ],
      metrics: [
        { label: 'Development Progress', value: 75, target: 100 },
        { label: 'User Acquisition', value: 45, target: 500 },
        { label: 'Revenue (MRR)', value: 12, target: 50 }
      ]
    },
    {
      id: 'wild',
      name: 'Into the Wild',
      subtitle: 'Market Validation & Growth',
      timeline: 'Q2-Q3 2025',
      color: 'phase-wild',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      textColor: 'text-green-700 dark:text-green-300',
      icon: Target,
      status: 'Planned',
      completion: 0,
      description: 'Scale user acquisition and validate product-market fit across segments',
      goals: {
        revenue: '$500K MRR',
        users: '5K active users',
        features: 'Enterprise features'
      },
      keyActivities: [
        'Outlook integration launch',
        'Beta program (500 users)',
        'Enterprise pilot customers',
        'Advanced AI features',
        'Content marketing launch'
      ],
      exitCriteria: [
        'Strong product-market fit metrics',
        'Sustainable user acquisition',
        'Enterprise customer validation',
        'Advanced AI capabilities',
        'Positive unit economics'
      ],
      metrics: [
        { label: 'Monthly Growth Rate', value: 0, target: 40 },
        { label: 'Enterprise Pilots', value: 0, target: 10 },
        { label: 'CAC Payback (months)', value: 0, target: 12 }
      ]
    },
    {
      id: 'scale',
      name: 'Ready to Scale',
      subtitle: 'Go-to-Market Acceleration',
      timeline: 'Q4 2025 - Q2 2026',
      color: 'phase-scale',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      textColor: 'text-purple-700 dark:text-purple-300',
      icon: TrendingUp,
      status: 'Future',
      completion: 0,
      description: 'Accelerate growth through proven channels and enterprise expansion',
      goals: {
        revenue: '$2M MRR',
        users: '25K active users',
        features: 'Full platform'
      },
      keyActivities: [
        'Sales team scaling',
        'Partner channel development',
        'International expansion prep',
        'Platform API launch',
        'Advanced analytics'
      ],
      exitCriteria: [
        'Predictable revenue growth',
        'Scalable sales processes',
        'Strong channel partnerships',
        'International readiness',
        'Platform ecosystem'
      ],
      metrics: [
        { label: 'ARR Growth Rate', value: 0, target: 300 },
        { label: 'Enterprise Customers', value: 0, target: 100 },
        { label: 'Net Revenue Retention', value: 0, target: 120 }
      ]
    },
    {
      id: 'north',
      name: 'True North',
      subtitle: 'Market Leadership',
      timeline: 'Q3 2026 - Q4 2027',
      color: 'phase-north',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
      textColor: 'text-orange-700 dark:text-orange-300',
      icon: Globe,
      status: 'Vision',
      completion: 0,
      description: 'Establish market leadership and prepare for next phase of growth',
      goals: {
        revenue: '$50M ARR',
        users: '500K active users',
        features: 'AI Platform Leader'
      },
      keyActivities: [
        'Market category creation',
        'Acquisition opportunities',
        'Global expansion',
        'AI platform leadership',
        'Strategic partnerships'
      ],
      exitCriteria: [
        'Market leadership position',
        'Global presence established',
        'AI scheduling category leader',
        'Strategic exit readiness',
        'Sustainable competitive moats'
      ],
      metrics: [
        { label: 'Market Share', value: 0, target: 25 },
        { label: 'Global Markets', value: 0, target: 5 },
        { label: 'Enterprise Penetration', value: 0, target: 15 }
      ]
    }
  ];

  const currentPhase = phases.find(p => p.id === selectedPhase);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Progress':
        return <Zap className="h-4 w-4" />;
      case 'Planned':
        return <Clock className="h-4 w-4" />;
      case 'Future':
        return <Calendar className="h-4 w-4" />;
      case 'Vision':
        return <Globe className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Phase Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            hTime Go-to-Market Phases
          </CardTitle>
          <CardDescription>
            Four-phase strategic approach to market entry and scaling
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isSelected = selectedPhase === phase.id;
              return (
                <Button
                  key={phase.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`p-6 h-auto flex flex-col items-center gap-3 ${
                    isSelected ? phase.bgColor : ''
                  }`}
                  onClick={() => setSelectedPhase(phase.id)}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5" />
                    {getStatusIcon(phase.status)}
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{phase.name}</div>
                    <div className="text-xs opacity-80">{phase.subtitle}</div>
                    <div className="text-xs opacity-60 mt-1">{phase.timeline}</div>
                  </div>
                  {phase.completion > 0 && (
                    <div className="w-full">
                      <Progress value={phase.completion} className="h-1" />
                      <div className="text-xs mt-1">{phase.completion}%</div>
                    </div>
                  )}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Phase Details */}
      {currentPhase && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phase Summary */}
          <Card className={`glass-card ${currentPhase.bgColor} border-l-4 border-l-current`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <currentPhase.icon className="h-5 w-5" />
                {currentPhase.name}
              </CardTitle>
              <CardDescription className="text-sm">
                {currentPhase.subtitle} • {currentPhase.timeline}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{currentPhase.description}</p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Phase Goals</h4>
                <div className="grid grid-cols-1 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Revenue:</span>
                    <span className="font-medium">{currentPhase.goals.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Users:</span>
                    <span className="font-medium">{currentPhase.goals.users}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Features:</span>
                    <span className="font-medium">{currentPhase.goals.features}</span>
                  </div>
                </div>
              </div>

              <Badge className={currentPhase.textColor}>
                {currentPhase.status}
              </Badge>
            </CardContent>
          </Card>

          {/* Key Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Key Activities</CardTitle>
              <CardDescription>
                Primary initiatives and deliverables for this phase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentPhase.keyActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Exit Criteria */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Exit Criteria</CardTitle>
              <CardDescription>
                Success metrics to advance to the next phase
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentPhase.exitCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{criteria}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Phase Metrics */}
      {currentPhase && currentPhase.metrics && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Phase Metrics & KPIs
            </CardTitle>
            <CardDescription>
              Key performance indicators for {currentPhase.name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentPhase.metrics.map((metric, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.label}</span>
                    <Badge variant="outline">
                      {metric.value}/{metric.target}
                    </Badge>
                  </div>
                  <Progress 
                    value={metric.target > 0 ? (metric.value / metric.target) * 100 : 0} 
                    className="h-3" 
                  />
                  <div className="text-xs text-muted-foreground">
                    Target: {metric.target}{metric.label.includes('Rate') || metric.label.includes('months') ? '' : 
                             metric.label.includes('MRR') || metric.label.includes('Revenue') ? 'K' : ''}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Phase Timeline Visualization */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Timeline Overview
          </CardTitle>
          <CardDescription>
            Visual roadmap of all phases and key milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex justify-between items-center mb-8">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={phase.id} className="flex flex-col items-center flex-1">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      phase.status === 'In Progress' ? 'bg-primary text-primary-foreground' :
                      phase.status === 'Planned' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-center mt-2">
                      <div className="text-sm font-medium">{phase.name}</div>
                      <div className="text-xs text-muted-foreground">{phase.timeline}</div>
                      {phase.completion > 0 && (
                        <div className="text-xs mt-1 text-primary">{phase.completion}%</div>
                      )}
                    </div>
                    {index < phases.length - 1 && (
                      <div className="absolute top-6 left-0 right-0 h-0.5 bg-border -z-10" />
                    )}
                  </div>
                );
              })}
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-xs">
              {phases.map((phase) => (
                <div key={phase.id} className="space-y-1">
                  <div className="font-medium">{phase.goals.revenue}</div>
                  <div className="text-muted-foreground">{phase.goals.users}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GTMPhases;