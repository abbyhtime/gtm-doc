import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { ParentTileModal } from '@/components/ui/parent-tile-modal';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { useParentTile } from '@/hooks/useParentTile';
import { usePresentation } from '@/hooks/usePresentation';
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

  // Presentation items
  const presentationItems = phases.map(phase => ({
    id: phase.id,
    title: phase.name,
    description: `${phase.subtitle} - ${phase.timeline}`,
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
        <div className="space-y-4">
          <phase.icon className="h-20 w-20 mx-auto text-primary" />
          <div className="text-5xl font-bold">{phase.name}</div>
          <div className="text-2xl font-medium text-muted-foreground">{phase.subtitle}</div>
          <Badge variant="secondary" className="text-lg px-4 py-2">{phase.timeline}</Badge>
        </div>
        <div className="max-w-3xl text-2xl leading-relaxed text-muted-foreground">
          {phase.description}
        </div>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">{phase.goals.revenue}</div>
            <div className="text-sm text-muted-foreground">Revenue Target</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{phase.goals.users}</div>
            <div className="text-sm text-muted-foreground">User Target</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">{phase.goals.features}</div>
            <div className="text-sm text-muted-foreground">Feature Goal</div>
          </div>
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

  // Parent tile items for each phase
  const parentTileItems = phases.map(phase => ({
    id: phase.id,
    title: phase.name,
    description: `${phase.subtitle} - ${phase.timeline}`,
    content: (
      <div className="space-y-8">
        {/* Phase Summary */}
        <div className={`glass-card p-6 ${phase.bgColor} border-l-4 border-l-current`}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <phase.icon className="h-6 w-6" />
              <h3 className="text-xl font-semibold">{phase.name}</h3>
              <Badge className={phase.textColor}>{phase.status}</Badge>
            </div>
            <p className="text-sm">{phase.description}</p>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Revenue:</span>
                <span className="font-medium">{phase.goals.revenue}</span>
              </div>
              <div className="flex justify-between">
                <span>Users:</span>
                <span className="font-medium">{phase.goals.users}</span>
              </div>
              <div className="flex justify-between">
                <span>Features:</span>
                <span className="font-medium">{phase.goals.features}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Activities and Exit Criteria */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Key Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {phase.keyActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{activity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">Exit Criteria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {phase.exitCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{criteria}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Phase Metrics */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Phase Metrics & KPIs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {phase.metrics.map((metric, index) => (
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

        <div className="text-center">
          <Button 
            onClick={() => openPresentation(phase.id)}
            className="mt-4"
          >
            View Full Phase Presentation
          </Button>
        </div>
      </div>
    )
  }));

  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const { 
    isParentOpen, 
    parentItem, 
    openParentTile, 
    closeParentTile 
  } = useParentTile({ item: parentTileItems[currentParentIndex] });

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
                <ClickableTile
                  key={phase.id}
                  onClick={() => openParentTile(parentTileItems[index])}
                  className={`p-6 h-auto transition-all duration-300 hover:shadow-glow ${
                    isSelected ? 'animate-pulse-subtle shadow-glow' : ''
                  }`}
                  hoverScale={false}
                >
                  <div className="flex flex-col items-center gap-3">
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
                  </div>
                </ClickableTile>
              );
            })}
          </div>
        </CardContent>
      </Card>

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
                  <ClickableTile
                    key={phase.id}
                    onClick={() => openParentTile(parentTileItems[index])}
                    className="flex flex-col items-center flex-1 p-2"
                    hoverScale={false}
                  >
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
                  </ClickableTile>
                );
              })}
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-xs">
              {phases.map((phase) => (
                <div key={phase.id} className="space-y-1 text-center">
                  <div className="font-medium">{phase.goals.revenue}</div>
                  <div className="text-muted-foreground">{phase.goals.users}</div>
                </div>
              ))}
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

export default GTMPhases;