import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { ParentTileModal } from '@/components/ui/parent-tile-modal';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { useParentTile } from '@/hooks/useParentTile';
import { usePresentation } from '@/hooks/usePresentation';
import { 
  Zap, 
  Mail, 
  Brain, 
  Shield, 
  Smartphone, 
  Calendar,
  Clock,
  Users,
  Settings,
  CheckCircle,
  Target,
  Lightbulb,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const ProductStrategy = () => {
  const coreFeatures = [
    {
      category: 'AI Assistant',
      icon: Brain,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      features: [
        {
          name: 'Natural Language Processing',
          description: 'Understands scheduling requests in natural language',
          priority: 'High',
          status: 'In Development'
        },
        {
          name: 'Context Awareness',
          description: 'Learns preferences and patterns from user behavior',
          priority: 'High',
          status: 'Planning'
        },
        {
          name: 'Smart Conflict Resolution',
          description: 'Automatically resolves scheduling conflicts intelligently',
          priority: 'Medium',
          status: 'Planning'
        }
      ]
    },
    {
      category: 'Email Integration',
      icon: Mail,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      features: [
        {
          name: 'Gmail/Outlook Native',
          description: 'Seamless integration with major email providers',
          priority: 'High',
          status: 'In Development'
        },
        {
          name: 'Email Threading',
          description: 'Maintains context across email conversations',
          priority: 'High',
          status: 'Planning'
        },
        {
          name: 'Signature Integration',
          description: 'Smart scheduling links in email signatures',
          priority: 'Medium',
          status: 'Backlog'
        }
      ]
    },
    {
      category: 'Enterprise Security',
      icon: Shield,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      features: [
        {
          name: 'SOC 2 Compliance',
          description: 'Enterprise-grade security and compliance',
          priority: 'High',
          status: 'Planning'
        },
        {
          name: 'SSO Integration',
          description: 'Single sign-on with enterprise identity providers',
          priority: 'High',
          status: 'Planning'
        },
        {
          name: 'Data Encryption',
          description: 'End-to-end encryption for all scheduling data',
          priority: 'High',
          status: 'In Development'
        }
      ]
    }
  ];

  const productRoadmap = [
    {
      phase: 'Q1 2025 - MVP',
      status: 'current',
      features: [
        'Basic AI scheduling assistant',
        'Gmail integration',
        'Calendar sync (Google/Outlook)',
        'Simple natural language processing'
      ],
      completion: 75
    },
    {
      phase: 'Q2 2025 - Enhanced AI',
      status: 'next',
      features: [
        'Advanced context awareness',
        'Multi-participant scheduling',
        'Preference learning',
        'Outlook integration'
      ],
      completion: 25
    },
    {
      phase: 'Q3 2025 - Enterprise Ready',
      status: 'planned',
      features: [
        'SSO integration',
        'Advanced security features',
        'Team scheduling workflows',
        'Analytics dashboard'
      ],
      completion: 0
    },
    {
      phase: 'Q4 2025 - Scale',
      status: 'planned',
      features: [
        'Mobile apps',
        'API platform',
        'Advanced integrations',
        'Enterprise admin tools'
      ],
      completion: 0
    }
  ];

  const valuePropositions = [
    {
      title: 'Time Savings',
      metric: '2.5 hours/week',
      description: 'Average time saved per user through intelligent scheduling automation',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      title: 'Productivity Boost',
      metric: '25% increase',
      description: 'Improvement in meeting efficiency and calendar optimization',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: 'User Adoption',
      metric: '90% within 30 days',
      description: 'Target adoption rate due to seamless email integration',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Cost Reduction',
      metric: '$2,400/employee/year',
      description: 'Estimated cost savings from improved scheduling efficiency',
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  // Presentation items for value propositions, features, and roadmap
  const presentationItems = [
    ...valuePropositions.map((prop, index) => ({
      id: `value-prop-${index}`,
      title: prop.title,
      description: `${prop.metric} - ${prop.description}`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <prop.icon className={`h-20 w-20 mx-auto ${prop.color}`} />
            <div className="text-6xl font-bold">{prop.metric}</div>
            <div className="text-2xl font-medium text-muted-foreground">{prop.title}</div>
          </div>
          <div className="max-w-2xl text-lg text-muted-foreground">
            {prop.description}
          </div>
        </div>
      )
    })),
    ...coreFeatures.flatMap(category => 
      category.features.map((feature, index) => ({
        id: `feature-${category.category}-${index}`,
        title: feature.name,
        description: feature.description,
        content: (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
            <div className="space-y-4">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-lg ${category.color}`}>
                <category.icon className="h-12 w-12" />
              </div>
              <div className="text-5xl font-bold">{feature.name}</div>
              <Badge variant="secondary" className="text-lg px-4 py-2">{feature.status}</Badge>
            </div>
            <div className="max-w-3xl text-2xl leading-relaxed text-muted-foreground">
              {feature.description}
            </div>
          </div>
        )
      }))
    ),
    ...productRoadmap.map((phase, index) => ({
      id: `roadmap-${index}`,
      title: phase.phase,
      description: `${phase.completion}% complete`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <Calendar className="h-20 w-20 mx-auto text-primary" />
            <div className="text-5xl font-bold">{phase.phase}</div>
            <Badge variant="secondary" className="text-lg px-4 py-2">{phase.completion}% Complete</Badge>
          </div>
          <div className="max-w-3xl space-y-4">
            {phase.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-lg justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>{feature}</span>
              </div>
            ))}
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

  // Parent tile items
  const parentTileItems = [
    {
      id: 'value-propositions',
      title: 'Value Propositions',
      description: 'Key benefits driving customer adoption and retention',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valuePropositions.map((prop, index) => {
              const Icon = prop.icon;
              return (
                <ClickableTile 
                  key={prop.title} 
                  onClick={() => openPresentation(`value-prop-${index}`)}
                  className="p-4"
                  hoverScale={false}
                >
                  <div className="text-center space-y-3">
                    <Icon className={`h-8 w-8 mx-auto ${prop.color}`} />
                    <div>
                      <div className="text-2xl font-bold">{prop.metric}</div>
                      <div className="text-sm font-medium">{prop.title}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {prop.description}
                      </div>
                    </div>
                  </div>
                </ClickableTile>
              );
            })}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any value proposition to view detailed presentation
          </div>
        </div>
      )
    },
    {
      id: 'core-features',
      title: 'Core Feature Categories',
      description: 'Comprehensive feature breakdown by category and development status',
      content: (
        <div className="space-y-8">
          {coreFeatures.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${category.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-13">
                  {category.features.map((feature, idx) => (
                    <ClickableTile 
                      key={feature.name}
                      onClick={() => openPresentation(`feature-${category.category}-${idx}`)}
                      className="p-4"
                      hoverScale={false}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{feature.name}</h4>
                          <Badge className={getPriorityColor(feature.priority)}>
                            {feature.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{feature.description}</p>
                        <Badge className={getStatusColor(feature.status)}>
                          {feature.status}
                        </Badge>
                      </div>
                    </ClickableTile>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="text-center text-muted-foreground">
            Click on any feature to view detailed presentation
          </div>
        </div>
      )
    },
    {
      id: 'product-roadmap',
      title: 'Product Roadmap',
      description: 'Quarterly development milestones and feature delivery timeline',
      content: (
        <div className="space-y-6">
          {productRoadmap.map((phase, index) => (
            <ClickableTile 
              key={phase.phase}
              onClick={() => openPresentation(`roadmap-${index}`)}
              className="p-4"
              hoverScale={false}
            >
              <div className="relative">
                {/* Timeline connector */}
                {index < productRoadmap.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-20 bg-border" />
                )}
                
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      phase.status === 'current' ? 'bg-primary text-primary-foreground' :
                      phase.status === 'next' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {phase.status === 'current' ? <Zap className="h-5 w-5" /> :
                       phase.status === 'next' ? <Clock className="h-5 w-5" /> :
                       <Calendar className="h-5 w-5" />}
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{phase.phase}</h3>
                      <Badge variant={phase.status === 'current' ? 'default' : 'secondary'}>
                        {phase.completion}% Complete
                      </Badge>
                    </div>
                    
                    <Progress value={phase.completion} className="h-2" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {phase.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`h-4 w-4 ${
                            phase.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                          <span className={phase.status === 'planned' ? 'text-muted-foreground' : ''}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ClickableTile>
          ))}
          <div className="text-center text-muted-foreground">
            Click on any roadmap phase to view detailed presentation
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Development':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'Backlog':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'Medium':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      case 'Low':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-8">
      {/* Value Propositions */}
      <ClickableTile 
        onClick={() => openParentTile(parentTileItems[0])}
        className="glass-card transition-all duration-300 hover:shadow-glow animate-pulse-subtle"
      >
        <Card className="h-full border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Value Propositions
            </CardTitle>
            <CardDescription>
              Key benefits driving customer adoption and retention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valuePropositions.map((prop) => {
                const Icon = prop.icon;
                return (
                  <div key={prop.title} className="text-center space-y-3">
                    <Icon className={`h-8 w-8 mx-auto ${prop.color}`} />
                    <div>
                      <div className="text-2xl font-bold">{prop.metric}</div>
                      <div className="text-sm font-medium">{prop.title}</div>
                      <div className="text-xs text-muted-foreground mt-2">
                        {prop.description}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </ClickableTile>

      {/* Core Features */}
      <ClickableTile 
        onClick={() => openParentTile(parentTileItems[1])}
        className="glass-card transition-all duration-300 hover:shadow-glow animate-pulse-subtle"
      >
        <Card className="h-full border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Core Feature Categories
            </CardTitle>
            <CardDescription>
              Comprehensive feature breakdown by category and development status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {coreFeatures.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.category} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${category.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-lg font-semibold">{category.category}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-13">
                      {category.features.map((feature) => (
                        <div key={feature.name} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-sm">{feature.name}</h4>
                            <div className="flex gap-2">
                              <Badge className={getPriorityColor(feature.priority)}>
                                {feature.priority}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground mb-3">{feature.description}</p>
                          <Badge className={getStatusColor(feature.status)}>
                            {feature.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </ClickableTile>

      {/* Product Roadmap */}
      <ClickableTile 
        onClick={() => openParentTile(parentTileItems[2])}
        className="glass-card transition-all duration-300 hover:shadow-glow animate-pulse-subtle"
      >
        <Card className="h-full border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Product Roadmap
            </CardTitle>
            <CardDescription>
              Quarterly development milestones and feature delivery timeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {productRoadmap.map((phase, index) => (
                <div key={phase.phase} className="relative">
                  {/* Timeline connector */}
                  {index < productRoadmap.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-20 bg-border" />
                  )}
                  
                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        phase.status === 'current' ? 'bg-primary text-primary-foreground' :
                        phase.status === 'next' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {phase.status === 'current' ? <Zap className="h-5 w-5" /> :
                         phase.status === 'next' ? <Clock className="h-5 w-5" /> :
                         <Calendar className="h-5 w-5" />}
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{phase.phase}</h3>
                        <Badge variant={phase.status === 'current' ? 'default' : 'secondary'}>
                          {phase.completion}% Complete
                        </Badge>
                      </div>
                      
                      <Progress value={phase.completion} className="h-2" />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`h-4 w-4 ${
                              phase.status === 'current' ? 'text-primary' : 'text-muted-foreground'
                            }`} />
                            <span className={phase.status === 'planned' ? 'text-muted-foreground' : ''}>
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </ClickableTile>

      {/* Differentiation Strategy */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Competitive Differentiation
          </CardTitle>
          <CardDescription>
            Key differentiators that set hTime apart from existing solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-green-600">Our Advantages</h3>
              <div className="space-y-3">
                {[
                  'AI-native architecture, not retrofitted features',
                  'Email-first user experience eliminates adoption friction',
                  'Context-aware AI learns user preferences over time',
                  'Enterprise-grade security built from day one',
                  'Seamless integration with existing workflows'
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <span className="text-sm">{advantage}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-orange-600">Competitor Weaknesses</h3>
              <div className="space-y-3">
                {[
                  'Legacy scheduling tools lack AI sophistication',
                  'New entrants focus on narrow use cases',
                  'Enterprise solutions are complex and hard to adopt',
                  'Most tools require separate apps/platforms',
                  'Limited contextual understanding of user needs'
                ].map((weakness, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">{weakness}</span>
                  </div>
                ))}
              </div>
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

export default ProductStrategy;