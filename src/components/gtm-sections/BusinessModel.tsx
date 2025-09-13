import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Building, 
  Target,
  Zap,
  CheckCircle,
  BarChart3,
  PieChart,
  CreditCard
} from 'lucide-react';

const BusinessModel = () => {
  const pricingTiers = [
    {
      name: 'Individual',
      price: '$15',
      period: 'per user/month',
      description: 'Perfect for freelancers and solo professionals',
      features: [
        'AI scheduling assistant',
        'Gmail integration',
        'Basic calendar sync',
        '50 meetings/month',
        'Email support'
      ],
      targetSegment: 'Freelancers, Consultants',
      color: 'bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800',
      popular: false
    },
    {
      name: 'Professional',
      price: '$35',
      period: 'per user/month',
      description: 'Ideal for growing teams and small businesses',
      features: [
        'Everything in Individual',
        'Outlook integration',
        'Team scheduling',
        'Unlimited meetings',
        'Advanced AI features',
        'Priority support'
      ],
      targetSegment: 'Small teams, Growing businesses',
      color: 'bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800',
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$75',
      period: 'per user/month',
      description: 'Comprehensive solution for large organizations',
      features: [
        'Everything in Professional',
        'SSO integration',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantees'
      ],
      targetSegment: 'Large enterprises, Fortune 500',
      color: 'bg-purple-50 border-purple-200 dark:bg-purple-950/20 dark:border-purple-800',
      popular: false
    }
  ];

  const revenueProjections = [
    { year: '2025', individual: 150, professional: 800, enterprise: 200, total: 1150 },
    { year: '2026', individual: 300, professional: 1800, enterprise: 900, total: 3000 },
    { year: '2027', individual: 500, professional: 3200, enterprise: 2800, total: 6500 }
  ];

  const unitEconomics = [
    {
      metric: 'Customer Acquisition Cost (CAC)',
      individual: '$45',
      professional: '$180',
      enterprise: '$1,200',
      description: 'Blended cost across all channels'
    },
    {
      metric: 'Lifetime Value (LTV)',
      individual: '$540',
      professional: '$1,680',
      enterprise: '$5,400',
      description: '3-year average customer lifetime'
    },
    {
      metric: 'LTV:CAC Ratio',
      individual: '12:1',
      professional: '9.3:1',
      enterprise: '4.5:1',
      description: 'Target ratio >3:1 for healthy unit economics'
    },
    {
      metric: 'Payback Period',
      individual: '3 months',
      professional: '5 months',
      enterprise: '16 months',
      description: 'Time to recover acquisition cost'
    }
  ];

  const revenueStreams = [
    {
      stream: 'SaaS Subscriptions',
      percentage: 85,
      description: 'Monthly/annual recurring revenue from software licenses',
      color: 'bg-blue-500'
    },
    {
      stream: 'Professional Services',
      percentage: 10,
      description: 'Implementation, training, and consultation services',
      color: 'bg-green-500'
    },
    {
      stream: 'API & Integrations',
      percentage: 5,
      description: 'Revenue from API usage and custom integrations',
      color: 'bg-purple-500'
    }
  ];

  const marketSizing = [
    {
      segment: 'Total Addressable Market (TAM)',
      size: '$4.5B',
      description: 'Global scheduling software market',
      color: 'text-blue-600'
    },
    {
      segment: 'Serviceable Addressable Market (SAM)',
      size: '$1.8B',
      description: 'AI-powered scheduling tools segment',
      color: 'text-green-600'
    },
    {
      segment: 'Serviceable Obtainable Market (SOM)',
      size: '$450M',
      description: 'Realistic market capture (25% of SAM)',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Pricing Strategy */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Pricing Strategy
          </CardTitle>
          <CardDescription>
            Three-tier pricing model designed for different customer segments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div key={tier.name} className={`relative p-6 rounded-lg border-2 ${tier.color}`}>
                {tier.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold mb-1">{tier.price}</div>
                  <div className="text-sm text-muted-foreground mb-3">{tier.period}</div>
                  <p className="text-sm">{tier.description}</p>
                </div>

                <div className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="text-xs text-muted-foreground">
                    <strong>Target:</strong> {tier.targetSegment}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Projections */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Revenue Projections
          </CardTitle>
          <CardDescription>
            3-year revenue forecast by pricing tier (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {revenueProjections.map((projection) => (
              <div key={projection.year} className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{projection.year}</h3>
                  <div className="text-2xl font-bold text-primary">
                    ${projection.total}K ARR
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg dark:bg-blue-950/20">
                    <div className="text-lg font-semibold text-blue-600">
                      ${projection.individual}K
                    </div>
                    <div className="text-xs text-muted-foreground">Individual</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg dark:bg-green-950/20">
                    <div className="text-lg font-semibold text-green-600">
                      ${projection.professional}K
                    </div>
                    <div className="text-xs text-muted-foreground">Professional</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg dark:bg-purple-950/20">
                    <div className="text-lg font-semibold text-purple-600">
                      ${projection.enterprise}K
                    </div>
                    <div className="text-xs text-muted-foreground">Enterprise</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unit Economics */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Unit Economics
          </CardTitle>
          <CardDescription>
            Key financial metrics by customer segment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2">Metric</th>
                  <th className="text-center py-3 px-2">Individual</th>
                  <th className="text-center py-3 px-2">Professional</th>
                  <th className="text-center py-3 px-2">Enterprise</th>
                  <th className="text-left py-3 px-2">Notes</th>
                </tr>
              </thead>
              <tbody>
                {unitEconomics.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-muted/30">
                    <td className="py-3 px-2 font-medium">{row.metric}</td>
                    <td className="text-center py-3 px-2">{row.individual}</td>
                    <td className="text-center py-3 px-2">{row.professional}</td>
                    <td className="text-center py-3 px-2">{row.enterprise}</td>
                    <td className="py-3 px-2 text-muted-foreground text-xs">{row.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Streams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-primary" />
              Revenue Streams
            </CardTitle>
            <CardDescription>
              Diversified revenue model breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueStreams.map((stream) => (
                <div key={stream.stream} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{stream.stream}</span>
                    <span className="text-sm">{stream.percentage}%</span>
                  </div>
                  <Progress value={stream.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground">{stream.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Market Sizing
            </CardTitle>
            <CardDescription>
              Addressable market opportunity analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {marketSizing.map((market, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{market.segment}</div>
                    <div className="text-xs text-muted-foreground">{market.description}</div>
                  </div>
                  <div className={`text-2xl font-bold ${market.color}`}>
                    {market.size}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Business Model Canvas Summary */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Business Model Summary
          </CardTitle>
          <CardDescription>
            Key elements of the hTime business model
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-green-600">Value Propositions</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>AI-powered scheduling automation</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Seamless email integration</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-600 mt-0.5" />
                  <span>Enterprise-grade security</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-blue-600">Revenue Model</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>SaaS subscription (85%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>Professional services (10%)</span>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
                  <span>API & integrations (5%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-purple-600">Key Metrics</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Target ARR 2027:</span>
                  <span className="font-medium">$50M</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Margin:</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Revenue Retention:</span>
                  <span className="font-medium">120%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessModel;