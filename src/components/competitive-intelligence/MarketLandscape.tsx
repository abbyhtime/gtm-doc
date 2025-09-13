import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Users, Zap, Building, Lightbulb, ArrowRight } from 'lucide-react';

const MarketLandscape = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const companies = [
    // Incumbents
    { 
      name: 'Calendly', 
      category: 'incumbent', 
      position: { x: 85, y: 20 }, 
      size: 'large',
      users: '20M users',
      revenue: '$276M',
      description: 'Market leader in scheduling links'
    },
    { 
      name: 'Google Calendar', 
      category: 'incumbent', 
      position: { x: 90, y: 40 }, 
      size: 'large',
      users: '500M users',
      revenue: 'N/A (Workspace)',
      description: 'Ubiquitous calendar platform'
    },
    { 
      name: 'Microsoft Outlook', 
      category: 'incumbent', 
      position: { x: 88, y: 60 }, 
      size: 'large',
      users: '400M users',
      revenue: 'N/A (Office 365)',
      description: 'Enterprise calendar standard'
    },
    { 
      name: 'Doodle', 
      category: 'incumbent', 
      position: { x: 70, y: 75 }, 
      size: 'medium',
      users: '30M MAU',
      revenue: 'Private',
      description: 'Group scheduling polls'
    },
    
    // AI-Native Disruptors
    { 
      name: 'Motion', 
      category: 'ai-native', 
      position: { x: 35, y: 25 }, 
      size: 'medium',
      users: '10K+ business',
      revenue: '$10M ARR',
      description: 'AI workspace with agents'
    },
    { 
      name: 'Clockwise', 
      category: 'ai-native', 
      position: { x: 45, y: 35 }, 
      size: 'medium',
      users: '15K+ orgs',
      revenue: '~$15M ARR',
      description: 'Focus time optimization'
    },
    { 
      name: 'Reclaim.ai', 
      category: 'ai-native', 
      position: { x: 40, y: 55 }, 
      size: 'medium',
      users: '320K users',
      revenue: 'Acquired by Dropbox',
      description: 'Personal time defense'
    },
    { 
      name: 'Meet-Ting', 
      category: 'ai-native', 
      position: { x: 20, y: 45 }, 
      size: 'small',
      users: 'Beta',
      revenue: '£250K seed',
      description: 'Email AI assistant'
    },
    { 
      name: 'Supercal', 
      category: 'ai-native', 
      position: { x: 25, y: 70 }, 
      size: 'small',
      users: 'Free users',
      revenue: '$1K/mo',
      description: 'Free Calendly alternative'
    },
    
    // Specialized Players
    { 
      name: 'Cal.com', 
      category: 'specialized', 
      position: { x: 60, y: 30 }, 
      size: 'medium',
      users: '20K customers',
      revenue: '$5.1M',
      description: 'Open-source scheduling'
    },
    { 
      name: 'SavvyCal', 
      category: 'specialized', 
      position: { x: 55, y: 50 }, 
      size: 'small',
      users: 'Thousands',
      revenue: 'Bootstrapped',
      description: 'UX-focused scheduling'
    },
    { 
      name: 'Kronologic', 
      category: 'specialized', 
      position: { x: 65, y: 65 }, 
      size: 'small',
      users: 'Sales teams',
      revenue: '$20M raised',
      description: 'Sales automation'
    }
  ];

  const marketSegments = [
    {
      title: 'Incumbent Leaders',
      description: 'Established platforms with massive user bases',
      companies: ['Calendly', 'Google Calendar', 'Microsoft Outlook', 'Doodle'],
      color: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: Building,
      stats: '920M+ total users'
    },
    {
      title: 'AI-Native Disruptors',
      description: 'Startups built with AI-first approach',
      companies: ['Motion', 'Clockwise', 'Reclaim.ai', 'Meet-Ting', 'Supercal'],
      color: 'bg-purple-50 border-purple-200 text-purple-800',
      icon: Zap,
      stats: '$150M+ raised'
    },
    {
      title: 'Specialized Players',
      description: 'Focused solutions for specific use cases',
      companies: ['Cal.com', 'SavvyCal', 'Kronologic'],
      color: 'bg-green-50 border-green-200 text-green-800',
      icon: Target,
      stats: 'Niche dominance'
    }
  ];

  const getCompanySize = (size: string) => {
    switch (size) {
      case 'large': return 'h-6 w-6';
      case 'medium': return 'h-4 w-4';
      case 'small': return 'h-3 w-3';
      default: return 'h-4 w-4';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'incumbent': return 'bg-blue-500 hover:bg-blue-600';
      case 'ai-native': return 'bg-purple-500 hover:bg-purple-600';
      case 'specialized': return 'bg-green-500 hover:bg-green-600';
      default: return 'bg-muted hover:bg-muted/80';
    }
  };

  const filteredCompanies = selectedCategory === 'all' 
    ? companies 
    : companies.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Market Positioning Map */}
      <Card className="bg-gradient-to-br from-background to-secondary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Target className="h-6 w-6 text-primary" />
            Market Positioning Map
          </CardTitle>
          <CardDescription>
            Companies positioned by market maturity (x-axis) and innovation level (y-axis)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button 
              variant={selectedCategory === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('all')}
            >
              All Companies
            </Button>
            <Button 
              variant={selectedCategory === 'incumbent' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('incumbent')}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Incumbents
            </Button>
            <Button 
              variant={selectedCategory === 'ai-native' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('ai-native')}
              className="bg-purple-500 hover:bg-purple-600"
            >
              AI-Native
            </Button>
            <Button 
              variant={selectedCategory === 'specialized' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setSelectedCategory('specialized')}
              className="bg-green-500 hover:bg-green-600"
            >
              Specialized
            </Button>
          </div>

          {/* Positioning Chart */}
          <div className="relative h-96 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg border p-4">
            {/* Axis Labels */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
              Market Maturity →
            </div>
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2 rotate-90 text-xs text-muted-foreground">
              Innovation Level →
            </div>
            
            {/* Quadrant Labels */}
            <div className="absolute top-4 left-4 text-xs font-medium text-muted-foreground">
              Emerging<br/>Innovative
            </div>
            <div className="absolute top-4 right-4 text-xs font-medium text-muted-foreground">
              Established<br/>Innovative
            </div>
            <div className="absolute bottom-8 left-4 text-xs font-medium text-muted-foreground">
              Emerging<br/>Traditional
            </div>
            <div className="absolute bottom-8 right-4 text-xs font-medium text-muted-foreground">
              Established<br/>Traditional
            </div>

            {/* Company Dots */}
            {filteredCompanies.map((company, index) => (
              <div
                key={index}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getCategoryColor(company.category)} rounded-full cursor-pointer transition-all hover:scale-110 group`}
                style={{ left: `${company.position.x}%`, top: `${100 - company.position.y}%` }}
              >
                <div className={`${getCompanySize(company.size)} rounded-full`} />
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                  <div className="bg-popover border rounded-lg shadow-lg p-3 min-w-48">
                    <h4 className="font-semibold text-sm">{company.name}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{company.description}</p>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span>Users:</span>
                        <span className="font-medium">{company.users}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-medium">{company.revenue}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 bg-blue-500 rounded-full" />
              <span>Incumbents</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 bg-purple-500 rounded-full" />
              <span>AI-Native</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="h-3 w-3 bg-green-500 rounded-full" />
              <span>Specialized</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {marketSegments.map((segment, index) => (
          <Card key={index} className={`${segment.color} border transition-shadow hover:shadow-lg`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <segment.icon className="h-5 w-5" />
                {segment.title}
              </CardTitle>
              <CardDescription>{segment.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {segment.companies.map((company, compIndex) => (
                  <div key={compIndex} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{company}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                  </div>
                ))}
              </div>
              <Badge variant="secondary" className="w-full justify-center">
                {segment.stats}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Evolution Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Market Evolution Timeline
          </CardTitle>
          <CardDescription>
            Key milestones in scheduling tool development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { year: '2006-2013', event: 'Foundation Era', description: 'Google Calendar (2006), Doodle (2007), Calendly (2013) establish the market' },
              { year: '2014-2018', event: 'First AI Wave', description: 'x.ai "Amy" and Clara Labs pioneer AI assistants but struggle with technology limitations' },
              { year: '2019-2021', event: 'AI Renaissance', description: 'Motion, Reclaim.ai, Clockwise launch with modern AI. Early AI assistants shut down' },
              { year: '2022-2024', event: 'Incumbent Response', description: 'Google adds Duet AI, Microsoft integrates Copilot. Dropbox acquires Reclaim.ai' },
              { year: '2024-2025', event: 'New Generation', description: 'Meet-Ting resurrects email assistants. Motion adds AI agents. Market consolidation begins' }
            ].map((milestone, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                {milestone.year}
              </Badge>
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold">{milestone.event}</h4>
                  <p className="text-sm text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketLandscape;