import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Zap,
  Globe,
  Award
} from 'lucide-react';

const ExecutiveSummary = () => {
  const keyMetrics = [
    {
      label: 'Market Size',
      value: '$4.5B',
      description: 'AI Scheduling Market 2024',
      trend: '+45%',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      label: 'Target ARR',
      value: '$50M',
      description: 'By 2027',
      trend: '+300%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Time Savings',
      value: '2.5hrs',
      description: 'Per user per week',
      trend: '+150%',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      label: 'User Base',
      value: '500K',
      description: 'Target by 2026',
      trend: '+250%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const strategicPillars = [
    {
      title: 'AI-Native Experience',
      description: 'Built from ground up with AI at the core, not as an add-on feature',
      icon: Zap,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
    },
    {
      title: 'Email-First Approach',
      description: 'Seamless integration with existing email workflows for maximum adoption',
      icon: Target,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
      title: 'Enterprise Ready',
      description: 'Security, compliance, and scalability built for enterprise customers',
      icon: Award,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Vision & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium mb-4">
              "To eliminate the friction of scheduling and give time back to what matters most"
            </p>
            <p className="text-muted-foreground">
              We envision a world where scheduling is invisible, intelligent, and effortless. 
              Where professionals spend their time creating value, not coordinating calendars.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-medium mb-4">
              "Revolutionize scheduling through AI-powered email assistance"
            </p>
            <p className="text-muted-foreground">
              We're building the world's most intelligent scheduling assistant that works 
              seamlessly through email, understanding context, preferences, and priorities.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Executive Metrics
          </CardTitle>
          <CardDescription>
            Key performance indicators driving our go-to-market strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Icon className={`h-5 w-5 ${metric.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      {metric.trend}
                    </Badge>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="text-sm font-medium text-muted-foreground">
                      {metric.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {metric.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Strategic Pillars */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            Strategic Pillars
          </CardTitle>
          <CardDescription>
            Core principles driving our product and market strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategicPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="space-y-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${pillar.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Market Opportunity Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Market Opportunity
          </CardTitle>
          <CardDescription>
            The perfect storm for AI-powered scheduling disruption
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-semibold">Market Dynamics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Adoption Readiness</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Remote Work Impact</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scheduling Pain Points</span>
                  <span className="text-sm font-medium">78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Competitive Advantage</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <span>First-mover advantage in AI-native email scheduling</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <span>Superior user experience through contextual AI</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <span>Enterprise-grade security and compliance</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />
                  <span>Seamless integration with existing workflows</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveSummary;