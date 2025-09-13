import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Lightbulb, 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  Building,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Star,
  Clock,
  DollarSign,
  Shield
} from 'lucide-react';

const StrategicInsights = () => {
  const useCaseAnalysis = [
    {
      useCase: 'Individual Productivity',
      description: 'Personal calendar optimization and task scheduling',
      leaders: ['Reclaim.ai', 'Motion', 'Google Calendar'],
      trend: 'Growing',
      marketSize: 'Large',
      competition: 'High',
      recommendation: 'Focus on AI-driven personal insights and habit formation',
      icon: Users,
      color: 'bg-blue-50 border-blue-200 text-blue-800'
    },
    {
      useCase: 'Team Coordination',
      description: 'Internal team meeting scheduling and focus time optimization',
      leaders: ['Clockwise', 'Microsoft Outlook', 'Motion'],
      trend: 'Explosive',
      marketSize: 'Medium',
      competition: 'Medium',
      recommendation: 'Opportunity for AI-powered team workflow optimization',
      icon: Building,
      color: 'bg-green-50 border-green-200 text-green-800'
    },
    {
      useCase: 'External Scheduling',
      description: 'Client meetings, sales calls, and external coordination',
      leaders: ['Calendly', 'Cal.com', 'SavvyCal'],
      trend: 'Mature',
      marketSize: 'Large',
      competition: 'Very High',
      recommendation: 'Differentiate through AI personalization and integration depth',
      icon: Target,
      color: 'bg-orange-50 border-orange-200 text-orange-800'
    },
    {
      useCase: 'Email-based AI',
      description: 'Natural language scheduling through email assistants',
      leaders: ['Meet-Ting', 'Historical: x.ai/Clara'],
      trend: 'Emerging',
      marketSize: 'Small but growing',
      competition: 'Low',
      recommendation: 'High-risk, high-reward if technology timing is right',
      icon: Zap,
      color: 'bg-purple-50 border-purple-200 text-purple-800'
    }
  ];

  const competitiveAdvantages = [
    {
      advantage: 'AI-First Architecture',
      companies: ['Motion', 'Clockwise', 'Meet-Ting'],
      strength: 'High',
      sustainability: 'Medium',
      description: 'Built with AI as core capability, not add-on feature',
      risk: 'Technology commoditization over time'
    },
    {
      advantage: 'Ecosystem Integration',
      companies: ['Google', 'Microsoft', 'Calendly'],
      strength: 'Very High',
      sustainability: 'High',
      description: 'Deep integration with existing workflows and tools',
      risk: 'Platform dependency and potential disruption'
    },
    {
      advantage: 'User Base Network Effects',
      companies: ['Calendly', 'Doodle', 'Google'],
      strength: 'High',
      sustainability: 'Very High',
      description: 'Value increases with adoption across organizations',
      risk: 'Winner-take-all dynamics favor current leaders'
    },
    {
      advantage: 'Specialized Workflow',
      companies: ['Kronologic', 'SavvyCal', 'Cal.com'],
      strength: 'Medium',
      sustainability: 'Medium',
      description: 'Deep specialization in specific use cases or industries',
      risk: 'Limited addressable market and vulnerability to generalists'
    },
    {
      advantage: 'Free/Open Source Model',
      companies: ['Supercal', 'Cal.com'],
      strength: 'Medium',
      sustainability: 'Low',
      description: 'Removes cost barrier and enables rapid adoption',
      risk: 'Monetization challenges and unsustainable unit economics'
    }
  ];

  const marketGaps = [
    {
      gap: 'Cross-Platform AI Orchestration',
      description: 'AI that works seamlessly across Google, Microsoft, and third-party tools',
      opportunity: 'High',
      difficulty: 'High',
      timeframe: '1-2 years',
      rationale: 'Most AI scheduling is siloed within ecosystems. Cross-platform intelligence is largely unsolved.'
    },
    {
      gap: 'Proactive Meeting Intelligence',
      description: 'AI that suggests meeting necessity, attendee optimization, and agenda prep',
      opportunity: 'Medium',
      difficulty: 'Medium',
      timeframe: '6-12 months',
      rationale: 'Current tools schedule meetings but don\'t question if meetings are needed or optimized.'
    },
    {
      gap: 'Cultural & Timezone Intelligence',
      description: 'AI understanding of cultural meeting preferences and global team coordination',
      opportunity: 'High',
      difficulty: 'Medium',
      timeframe: '12-18 months',
      rationale: 'Remote work creates complex cultural and temporal coordination challenges inadequately addressed.'
    },
    {
      gap: 'Meeting ROI Analytics',
      description: 'Quantifying meeting value and providing actionable insights for optimization',
      opportunity: 'Medium',
      difficulty: 'Low',
      timeframe: '3-6 months',
      rationale: 'Teams know meetings consume time but lack data-driven insights for improvement.'
    }
  ];

  const strategicRecommendations = [
    {
      scenario: 'Large Enterprise Teams',
      recommendation: 'Hybrid Approach: Microsoft/Google + Clockwise',
      reasoning: 'Leverage incumbent integration for basic scheduling, add AI optimization for team productivity',
      investment: 'Low-Medium',
      risk: 'Low',
      icon: Building
    },
    {
      scenario: 'SMB/Startups with Heavy Client Interaction',
      recommendation: 'Calendly + Motion for internal workflow',
      reasoning: 'Proven external scheduling with emerging AI workflow automation for internal productivity',
      investment: 'Medium',
      risk: 'Low-Medium',
      icon: Target
    },
    {
      scenario: 'AI-Forward Organizations',
      recommendation: 'Motion or all-in on emerging AI tools',
      reasoning: 'Accept higher complexity for maximum AI automation and competitive advantage in productivity',
      investment: 'High',
      risk: 'Medium-High',
      icon: Zap
    },
    {
      scenario: 'Cost-Conscious Teams',
      recommendation: 'Google/Microsoft native + Supercal for external',
      reasoning: 'Maximize free tier capabilities while testing emerging AI features at low cost',
      investment: 'Very Low',
      risk: 'Medium',
      icon: DollarSign
    },
    {
      scenario: 'Developer/Technical Teams',
      recommendation: 'Cal.com for customization + specialized AI tools',
      reasoning: 'Build custom scheduling workflows while integrating best-of-breed AI capabilities',
      investment: 'High (development time)',
      risk: 'Medium',
      icon: Shield
    }
  ];

  const futureOutlook = [
    {
      trend: 'AI Commoditization',
      timeline: '12-18 months',
      impact: 'High',
      description: 'Basic AI scheduling becomes table stakes; differentiation moves to specialized intelligence'
    },
    {
      trend: 'Voice & Conversational UI',
      timeline: '6-12 months',
      impact: 'Medium',
      description: 'Meeting scheduling through voice assistants and natural conversation becomes mainstream'
    },
    {
      trend: 'Ecosystem Consolidation',
      timeline: '18-24 months',
      impact: 'High',
      description: 'Major acquisitions as incumbents buy AI capabilities and startups seek distribution'
    },
    {
      trend: 'Meeting Intelligence Platform',
      timeline: '2-3 years',
      impact: 'Very High',
      description: 'Evolution from scheduling tools to comprehensive meeting lifecycle management platforms'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Executive Summary */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Lightbulb className="h-6 w-6 text-primary" />
            Strategic Intelligence Summary
          </CardTitle>
          <CardDescription className="text-base">
            Key insights and strategic recommendations for the AI-powered scheduling landscape
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white/60 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-700" />
                Market Momentum
              </h4>
              <p className="text-sm text-muted-foreground">
                AI scheduling tools are reaching inflection point with proven ROI (1.5hr/week savings, 20% productivity boost) 
                driving rapid enterprise adoption.
              </p>
            </div>
            <div className="bg-white/60 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Target className="h-4 w-4 text-blue-700" />
                Competitive Dynamics
              </h4>
              <p className="text-sm text-muted-foreground">
                Incumbents adding AI features while startups focus on AI-native experiences. 
                Consolidation beginning (Dropbox-Reclaim) signals market maturation.
              </p>
            </div>
            <div className="bg-white/60 p-4 rounded-lg border">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-700" />
                Technology Timing
              </h4>
              <p className="text-sm text-muted-foreground">
                Modern LLMs enable capabilities that failed previously (x.ai, Clara). 
                User acceptance of AI assistants creates window for email-based scheduling revival.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Use Case Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Market Segmentation & Use Case Analysis
          </CardTitle>
          <CardDescription>
            Strategic breakdown of key use cases and competitive positioning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {useCaseAnalysis.map((useCase, index) => (
              <Card key={index} className={`${useCase.color} border`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <useCase.icon className="h-5 w-5" />
                    <CardTitle className="text-lg">{useCase.useCase}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {useCase.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-foreground dark:text-foreground">Trend:</span>
                      <Badge variant="outline" className="ml-2 text-xs bg-foreground/5 text-foreground border-foreground/20">{useCase.trend}</Badge>
                    </div>
                    <div>
                      <span className="text-foreground dark:text-foreground">Competition:</span>
                      <Badge variant="outline" className="ml-2 text-xs bg-foreground/5 text-foreground border-foreground/20">{useCase.competition}</Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-foreground dark:text-foreground">Current Leaders:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {useCase.leaders.map((leader, i) => (
                        <Badge key={i} variant="secondary" className="text-xs bg-primary/10 text-primary">
                          {leader}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white/80 p-3 rounded border">
                    <span className="text-xs font-medium text-foreground dark:text-foreground">Strategic Recommendation:</span>
                    <p className="text-sm mt-1">{useCase.recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Competitive Advantages Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Competitive Advantage Matrix
          </CardTitle>
          <CardDescription>
            Analysis of sustainable competitive advantages in the market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competitiveAdvantages.map((advantage, index) => (
              <Card key={index} className="border-l-4 border-l-primary/30">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">{advantage.advantage}</h4>
                      <p className="text-sm text-muted-foreground">{advantage.description}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Strength:</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            advantage.strength === 'Very High' ? 'bg-green-100 text-green-800 border-green-400' :
                            advantage.strength === 'High' ? 'bg-blue-100 text-blue-800 border-blue-400' :
                            'bg-orange-100 text-orange-800 border-orange-400'
                          }`}
                        >
                          {advantage.strength}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Sustainability:</span>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            advantage.sustainability === 'Very High' ? 'bg-green-100 text-green-800 border-green-400' :
                            advantage.sustainability === 'High' ? 'bg-blue-100 text-blue-800 border-blue-400' :
                            advantage.sustainability === 'Medium' ? 'bg-orange-100 text-orange-800 border-orange-400' :
                            'bg-red-100 text-red-800 border-red-400'
                          }`}
                        >
                          {advantage.sustainability}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-foreground dark:text-foreground">Key Players:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {advantage.companies.map((company, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-primary/10 text-primary">
                              {company}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="bg-red-50 border border-red-200 p-2 rounded text-xs">
                        <span className="font-medium text-red-700">Risk:</span>
                        <span className="text-red-800 ml-1">{advantage.risk}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Market Gaps & Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Market Gaps & Strategic Opportunities
          </CardTitle>
          <CardDescription>
            Identified opportunities for innovation and market entry
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {marketGaps.map((gap, index) => (
              <Card key={index} className="border-l-4 border-l-green-400">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold">{gap.gap}</h4>
                      <div className="text-right space-y-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${
                            gap.opportunity === 'High' ? 'bg-green-100 text-green-800 border-green-400' :
                            'bg-blue-100 text-blue-800 border-blue-400'
                          }`}
                        >
                          {gap.opportunity} Opportunity
                        </Badge>
                        <div className="text-xs text-muted-foreground">{gap.timeframe}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{gap.description}</p>
                    <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                      <span className="text-xs font-medium text-blue-700">Strategic Rationale:</span>
                      <p className="text-sm text-blue-600 mt-1">{gap.rationale}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Implementation Difficulty:</span>
                      <Badge 
                        variant="outline" 
                        className={`${
                          gap.difficulty === 'High' ? 'bg-red-100 text-red-800 border-red-400' :
                          gap.difficulty === 'Medium' ? 'bg-orange-100 text-orange-800 border-orange-400' :
                          'bg-green-100 text-green-800 border-green-400'
                        }`}
                      >
                        {gap.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Recommendations by Team Type */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Strategic Recommendations by Team Profile
          </CardTitle>
          <CardDescription>
            Tailored guidance for different organizational contexts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {strategicRecommendations.map((rec, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-lg">
                      <rec.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{rec.scenario}</h4>
                          <p className="text-sm font-medium text-primary mt-1">{rec.recommendation}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <Badge variant="outline" className="text-xs bg-foreground/5 text-foreground border-foreground/20">{rec.investment} Investment</Badge>
                          <div className="text-xs text-foreground dark:text-foreground">{rec.risk} Risk</div>
                        </div>
                      </div>
                      <p className="text-sm text-foreground dark:text-foreground">{rec.reasoning}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Future Market Outlook */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Future Market Outlook (Next 2-3 Years)
          </CardTitle>
          <CardDescription>
            Key trends and predictions for market evolution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {futureOutlook.map((outlook, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-center min-w-20">
                  <div className="text-xs text-muted-foreground">Timeline</div>
                  <div className="text-sm font-medium">{outlook.timeline}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{outlook.trend}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        outlook.impact === 'Very High' ? 'bg-red-100 text-red-800 border-red-400' :
                        outlook.impact === 'High' ? 'bg-orange-100 text-orange-800 border-orange-400' :
                        'bg-blue-100 text-blue-800 border-blue-400'
                      }`}
                    >
                      {outlook.impact} Impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{outlook.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>

          <Separator className="my-6" />

          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-lg border border-primary/20">
            <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
              <Star className="h-5 w-5" />
              Strategic Conclusion
            </h4>
            <div className="space-y-3 text-sm">
              <p>
                <strong>The AI scheduling market is at an inflection point.</strong> Early technology limitations have been resolved, 
                user acceptance is high, and proven ROI is driving adoption. The window for AI-native disruption is open but narrowing 
                as incumbents add AI capabilities.
              </p>
              <p>
                <strong>Success factors for the next 24 months:</strong> Cross-platform intelligence, proactive meeting optimization, 
                and specialized workflow integration. Companies that solve these gaps while the market is still fragmented will 
                capture disproportionate value.
              </p>
              <p>
                <strong>For enterprises:</strong> Hybrid strategies combining incumbent reliability with AI innovation offer the best 
                risk-adjusted returns. Pure-play AI adoption should be tested in limited contexts before full deployment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StrategicInsights;