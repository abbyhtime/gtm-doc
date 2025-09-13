import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Building, 
  Briefcase, 
  User,
  Target,
  DollarSign,
  TrendingUp,
  Globe,
  Mail,
  Calendar,
  Clock,
  Zap
} from 'lucide-react';

const TargetMarkets = () => {
  const [selectedSegment, setSelectedSegment] = useState('enterprise');

  const marketSegments = [
    {
      id: 'enterprise',
      name: 'Enterprise',
      size: '1000+ employees',
      marketSize: '$2.1B',
      icon: Building,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
      priority: 'High',
      description: 'Large organizations with complex scheduling needs and budget for premium solutions'
    },
    {
      id: 'midmarket',
      name: 'Mid-Market',
      size: '100-999 employees',
      marketSize: '$1.8B',
      icon: Briefcase,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
      priority: 'High',
      description: 'Growing companies looking to scale operations and improve productivity'
    },
    {
      id: 'smb',
      name: 'Small Business',
      size: '<100 employees',
      marketSize: '$600M',
      icon: Users,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
      priority: 'Medium',
      description: 'Small teams and startups seeking affordable productivity solutions'
    },
    {
      id: 'individual',
      name: 'Individual Professionals',
      size: 'Freelancers/Consultants',
      marketSize: '$400M',
      icon: User,
      color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
      priority: 'Low',
      description: 'Solo professionals who manage multiple client meetings'
    }
  ];

  const customerPersonas = {
    enterprise: [
      {
        title: 'IT Director',
        role: 'Technology Decision Maker',
        painPoints: [
          'Managing enterprise software integrations',
          'Ensuring security and compliance',  
          'Scaling productivity tools across organization'
        ],
        motivations: [
          'Reduce IT complexity',
          'Improve security posture',
          'Drive organizational efficiency'
        ],
        demographics: {
          experience: '10+ years',
          teamSize: '50-200 people',
          budget: '$100K-1M annual'
        }
      },
      {
        title: 'Executive Assistant',
        role: 'Primary End User',
        painPoints: [
          'Coordinating complex executive calendars',
          'Managing multiple stakeholder schedules',
          'Handling last-minute meeting changes'
        ],
        motivations: [
          'Reduce manual scheduling work',
          'Improve executive productivity',
          'Minimize scheduling conflicts'
        ],
        demographics: {
          experience: '5+ years',  
          executives: '3-10 supported',
          meetings: '50+ per week'
        }
      }
    ],
    midmarket: [
      {
        title: 'Operations Manager',
        role: 'Process Optimizer',
        painPoints: [
          'Improving team productivity',
          'Managing growing complexity',
          'Balancing cost and features'
        ],
        motivations: [
          'Streamline operations',
          'Scale efficiently',
          'Demonstrate ROI'
        ],
        demographics: {
          experience: '5-10 years',
          teamSize: '20-100 people',
          budget: '$10K-100K annual'
        }
      },
      {
        title: 'Department Head',
        role: 'Team Leader',
        painPoints: [
          'Coordinating team meetings',
          'Managing client interactions',
          'Optimizing team schedules'
        ],
        motivations: [
          'Increase team efficiency',
          'Improve client service',
          'Reduce administrative burden'
        ],
        demographics: {
          experience: '7-15 years',
          directReports: '10-50 people',
          meetings: '20-30 per week'
        }
      }
    ],
    smb: [
      {
        title: 'Small Business Owner',
        role: 'Decision Maker & User',
        painPoints: [
          'Wearing multiple hats',
          'Limited budget for tools',
          'Need simple, effective solutions'
        ],
        motivations: [
          'Save time for core business',
          'Professional client experience',
          'Cost-effective solutions'
        ],
        demographics: {
          experience: '3-10 years',
          employees: '5-50 people',
          budget: '$1K-10K annual'
        }
      }
    ],
    individual: [
      {
        title: 'Independent Consultant',
        role: 'Solo Professional',
        painPoints: [
          'Managing multiple client schedules',
          'Maintaining professional image',
          'Time zone coordination'
        ],
        motivations: [
          'Streamline client booking',
          'Reduce no-shows',
          'Focus on billable work'
        ],
        demographics: {
          experience: '5+ years',
          clients: '10-50 active',
          hourlyRate: '$100-500'
        }
      }
    ]
  };

  const icpAnalysis = {
    enterprise: {
      firmographics: {
        company_size: '1000+ employees',
        revenue: '$100M+ annually',
        industry: 'Technology, Finance, Healthcare',
        geography: 'North America, Europe'
      },
      technographics: {
        email_platform: 'Microsoft 365, Google Workspace',
        calendar_tools: 'Outlook, Google Calendar',
        security_requirements: 'SOC 2, GDPR compliance',
        integration_needs: 'CRM, HRIS, SSO'
      },
      behavioral: {
        buying_process: 'Committee-based, 6-12 month cycles',
        budget_authority: 'VP/Director level approval',
        decision_criteria: 'Security, scalability, ROI',
        adoption_pattern: 'Pilot → Department → Enterprise'
      }
    },
    midmarket: {
      firmographics: {
        company_size: '100-999 employees',
        revenue: '$10M-100M annually',
        industry: 'Professional Services, SaaS, Manufacturing',
        geography: 'North America, Western Europe'
      },
      technographics: {
        email_platform: 'Google Workspace, Microsoft 365',
        calendar_tools: 'Google Calendar, Outlook',
        security_requirements: 'Basic compliance, data encryption',
        integration_needs: 'CRM, project management tools'
      },
      behavioral: {
        buying_process: 'Team-based, 3-6 month cycles',
        budget_authority: 'Department manager approval',
        decision_criteria: 'ROI, ease of use, integration',
        adoption_pattern: 'Team pilot → Department rollout'
      }
    }
  };

  const currentSegment = marketSegments.find(s => s.id === selectedSegment);
  const personas = customerPersonas[selectedSegment] || [];
  const icp = icpAnalysis[selectedSegment];

  return (
    <div className="space-y-8">
      {/* Market Segment Overview */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Target Market Segments
          </CardTitle>
          <CardDescription>
            Prioritized customer segments with market sizing and opportunity assessment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {marketSegments.map((segment) => {
              const Icon = segment.icon;
              const isSelected = selectedSegment === segment.id;
              return (
                <Button
                  key={segment.id}
                  variant={isSelected ? "default" : "outline"}
                  className={`p-6 h-auto flex flex-col items-center gap-3 ${
                    isSelected ? segment.color : ''
                  }`}
                  onClick={() => setSelectedSegment(segment.id)}
                >
                  <Icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold text-sm">{segment.name}</div>
                    <div className="text-xs opacity-80">{segment.size}</div>
                    <div className="text-xs opacity-60 mt-1">{segment.marketSize}</div>
                  </div>
                  <Badge variant={segment.priority === 'High' ? 'default' : 'secondary'}>
                    {segment.priority} Priority
                  </Badge>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Selected Segment Deep Dive */}
      {currentSegment && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className={`glass-card ${currentSegment.color} border-l-4 border-l-current`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <currentSegment.icon className="h-5 w-5" />
                {currentSegment.name}
              </CardTitle>
              <CardDescription>
                {currentSegment.size} • {currentSegment.marketSize} market
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4">{currentSegment.description}</p>
              <Badge className={currentSegment.color}>
                {currentSegment.priority} Priority
              </Badge>
            </CardContent>
          </Card>

          <Card className="glass-card lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Market Characteristics</CardTitle>
              <CardDescription>
                Key attributes and opportunity metrics for {currentSegment.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <DollarSign className="h-5 w-5 mx-auto mb-2 text-green-600" />
                  <div className="text-lg font-bold">{currentSegment.marketSize}</div>
                  <div className="text-xs text-muted-foreground">Market Size</div>
                </div>
                <div className="text-center">
                  <TrendingUp className="h-5 w-5 mx-auto mb-2 text-blue-600" />
                  <div className="text-lg font-bold">
                    {selectedSegment === 'enterprise' ? '52%' : 
                     selectedSegment === 'midmarket' ? '48%' : 
                     selectedSegment === 'smb' ? '35%' : '28%'}
                  </div>
                  <div className="text-xs text-muted-foreground">Growth Rate</div>
                </div>
                <div className="text-center">
                  <Users className="h-5 w-5 mx-auto mb-2 text-purple-600" />
                  <div className="text-lg font-bold">
                    {selectedSegment === 'enterprise' ? '15K' : 
                     selectedSegment === 'midmarket' ? '45K' : 
                     selectedSegment === 'smb' ? '150K' : '500K'}
                  </div>
                  <div className="text-xs text-muted-foreground">Target Companies</div>
                </div>
                <div className="text-center">
                  <Target className="h-5 w-5 mx-auto mb-2 text-orange-600" />
                  <div className="text-lg font-bold">
                    {selectedSegment === 'enterprise' ? '2%' : 
                     selectedSegment === 'midmarket' ? '8%' : 
                     selectedSegment === 'smb' ? '15%' : '25%'}
                  </div>
                  <div className="text-xs text-muted-foreground">Market Share Goal</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Customer Personas */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Customer Personas - {currentSegment?.name}
          </CardTitle>
          <CardDescription>
            Detailed buyer and user personas for targeted marketing and sales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {personas.map((persona, index) => (
              <div key={index} className="p-6 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{persona.title}</h3>
                  <p className="text-sm text-muted-foreground">{persona.role}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm mb-2 text-red-600">Pain Points</h4>
                    <ul className="space-y-1">
                      {persona.painPoints.map((point, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <div className="w-1 h-1 bg-red-500 rounded-full mt-1.5" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 text-green-600">Motivations</h4>
                    <ul className="space-y-1">
                      {persona.motivations.map((motivation, i) => (
                        <li key={i} className="text-xs flex items-start gap-2">
                          <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5" />
                          {motivation}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-2 text-blue-600">Demographics</h4>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      {Object.entries(persona.demographics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key.replace('_', ' ')}:</span>
                          <span className="font-medium">{value}</span>
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

      {/* ICP Analysis */}
      {icp && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Ideal Customer Profile - {currentSegment?.name}
            </CardTitle>
            <CardDescription>
              Detailed ICP characteristics for precision targeting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-600">Firmographics</h3>
                <div className="space-y-2">
                  {Object.entries(icp.firmographics).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <div className="font-medium capitalize">{key.replace('_', ' ')}</div>
                      <div className="text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-green-600">Technographics</h3>
                <div className="space-y-2">
                  {Object.entries(icp.technographics).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <div className="font-medium capitalize">{key.replace('_', ' ')}</div>
                      <div className="text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-purple-600">Behavioral</h3>
                <div className="space-y-2">
                  {Object.entries(icp.behavioral).map(([key, value]) => (
                    <div key={key} className="text-sm">
                      <div className="font-medium capitalize">{key.replace('_', ' ')}</div>
                      <div className="text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Go-to-Market Priorities */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Go-to-Market Priorities
          </CardTitle>
          <CardDescription>
            Recommended market entry sequence and resource allocation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              {
                phase: 'Phase 1: Mid-Market Focus',
                timeline: 'Q1-Q2 2025',
                rationale: 'Best balance of deal size, sales cycle, and adoption speed',
                allocation: '60% of resources',
                targets: '100-999 employee companies in tech/professional services'
              },
              {
                phase: 'Phase 2: Enterprise Expansion',
                timeline: 'Q3-Q4 2025',
                rationale: 'Scale to larger deals with proven product-market fit',
                allocation: '30% of resources',
                targets: '1000+ employee companies with complex scheduling needs'
              },
              {
                phase: 'Phase 3: SMB Scale',
                timeline: '2026',
                rationale: 'Volume play with streamlined onboarding and self-service',
                allocation: '10% of resources',
                targets: 'Small businesses and teams looking for simple solutions'
              }
            ].map((priority, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold">{priority.phase}</h3>
                    <p className="text-sm text-muted-foreground">{priority.timeline}</p>
                  </div>
                  <Badge variant="outline">{priority.allocation}</Badge>
                </div>
                <p className="text-sm mb-2">{priority.rationale}</p>
                <p className="text-xs text-muted-foreground">{priority.targets}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TargetMarkets;