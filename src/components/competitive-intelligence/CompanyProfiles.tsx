import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  DollarSign, 
  Calendar, 
  Search, 
  Building, 
  Zap, 
  Target,
  TrendingUp,
  TrendingDown,
  Star,
  AlertCircle
} from 'lucide-react';

const CompanyProfiles = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const companies = [
    {
      name: 'Calendly',
      category: 'incumbent',
      founded: 2013,
      users: '20+ million users',
      revenue: '$276M (2023)',
      funding: '$351M',
      valuation: '$3B',
      growth: '+40% YoY ARR',
      marketShare: '86% Fortune 500',
      strengths: [
        'Market leader in scheduling links',
        'Strong enterprise adoption',
        'Robust integrations ecosystem',
        'Brand recognition and trust'
      ],
      weaknesses: [
        'Premium pricing model',
        'Limited AI features vs newcomers',
        'Interface becoming dated',
        'Slow innovation pace'
      ],
      keyMetrics: {
        companies: '100K+',
        pricing: '$8-16/user/month',
        integrations: '100+',
        satisfaction: 4.5
      },
      recentNews: 'Added Routing for lead assignment, expanding into workflow automation'
    },
    {
      name: 'Google Calendar',
      category: 'incumbent',
      founded: 2006,
      users: '500+ million users',
      revenue: 'Part of Workspace',
      funding: 'N/A',
      valuation: 'N/A',
      growth: 'Stable',
      marketShare: '3B+ Workspace accounts',
      strengths: [
        'Ubiquitous integration',
        'Free for personal use',
        'Deep Google ecosystem',
        'Mobile-first experience'
      ],
      weaknesses: [
        'Basic scheduling features',
        'Limited customization',
        'No advanced analytics',
        'Enterprise features lacking'
      ],
      keyMetrics: {
        companies: '10M businesses',
        pricing: 'Free / Workspace',
        integrations: 'Google ecosystem',
        satisfaction: 4.2
      },
      recentNews: 'Launched Duet AI for meeting summaries and scheduling assistance'
    },
    {
      name: 'Motion',
      category: 'ai-native',
      founded: 2019,
      users: '10K+ businesses',
      revenue: '$10M ARR (new features)',
      funding: '$75M',
      valuation: '$550M (2025)',
      growth: 'Explosive recent growth',
      marketShare: 'SMB focus',
      strengths: [
        'AI-first workflow automation',
        'Multiple AI agents in one platform',
        'Task + calendar integration',
        'Strong product-market fit'
      ],
      weaknesses: [
        'Complex interface',
        'Higher learning curve',
        'Premium pricing only',
        'Limited enterprise features'
      ],
      keyMetrics: {
        companies: '10K+',
        pricing: '$29+/month',
        integrations: 'Major productivity tools',
        satisfaction: 4.3
      },
      recentNews: 'Launched AI executive assistant agents, $10M new ARR in 4 months'
    },
    {
      name: 'Clockwise',
      category: 'ai-native',
      founded: 2016,
      users: '15K+ organizations',
      revenue: '~$15M ARR',
      funding: '$76M',
      valuation: 'Private',
      growth: 'Steady growth',
      marketShare: 'Team productivity niche',
      strengths: [
        'Focus time optimization',
        'Team-wide calendar intelligence',
        'Strong Google integration',
        'Proven ROI metrics'
      ],
      weaknesses: [
        'Google-centric',
        'Limited individual features',
        'Narrow use case',
        'Enterprise sales needed'
      ],
      keyMetrics: {
        companies: '15K+',
        pricing: '$6.75/user/month',
        integrations: 'Google + Slack',
        satisfaction: 4.4
      },
      recentNews: 'Expanding team features, calculating "Focus Time cost" for meetings'
    },
    {
      name: 'Reclaim.ai',
      category: 'ai-native',
      founded: 2019,
      users: '320K users, 43K companies',
      revenue: 'Acquired',
      funding: '$9.5M',
      valuation: 'Acquired by Dropbox',
      growth: 'Acquisition exit',
      marketShare: 'Personal productivity',
      strengths: [
        'Personal time defense AI',
        'Habit and routine optimization',
        'Cross-calendar integration',
        'Strong user loyalty'
      ],
      weaknesses: [
        'Individual focus only',
        'Limited team features',
        'Acquisition uncertainty',
        'Modest funding history'
      ],
      keyMetrics: {
        companies: '43K',
        pricing: '$8/user/month',
        integrations: 'Google + Outlook',
        satisfaction: 4.6
      },
      recentNews: 'Acquired by Dropbox in Aug 2024 for productivity integration'
    },
    {
      name: 'Meet-Ting',
      category: 'ai-native',
      founded: 2024,
      users: 'Beta users',
      revenue: 'Pre-revenue',
      funding: '£250K seed',
      valuation: 'Early stage',
      growth: 'Just launched',
      marketShare: 'Email scheduling niche',
      strengths: [
        'Email-native AI assistant',
        'Modern LLM technology',
        'No app required',
        'Natural language processing'
      ],
      weaknesses: [
        'Very early stage',
        'Unproven at scale',
        'Limited funding',
        'Historical precedent of failures'
      ],
      keyMetrics: {
        companies: 'Beta',
        pricing: 'Free (beta)',
        integrations: 'Google Calendar',
        satisfaction: 'TBD'
      },
      recentNews: 'Launched beta, backed by Google Gemini LLM technology'
    },
    {
      name: 'Cal.com',
      category: 'specialized',
      founded: 2021,
      users: '20K customers',
      revenue: '$5.1M',
      funding: '$32M',
      valuation: 'Private',
      growth: 'Steady developer adoption',
      marketShare: 'Developer/customization niche',
      strengths: [
        'Open-source flexibility',
        'Self-hosting options',
        'Developer-friendly',
        'Customization capabilities'
      ],
      weaknesses: [
        'Technical complexity',
        'Smaller ecosystem',
        'Limited AI features',
        'Enterprise support gaps'
      ],
      keyMetrics: {
        companies: '20K',
        pricing: 'Freemium + Enterprise',
        integrations: 'Marketplace model',
        satisfaction: 4.2
      },
      recentNews: 'Expanding marketplace integrations, targeting "billion people by 2031"'
    },
    {
      name: 'Supercal',
      category: 'ai-native',
      founded: 2023,
      users: 'Free users',
      revenue: '$1K/month',
      funding: 'Bootstrapped',
      valuation: 'M&A offers received',
      growth: 'Organic growth',
      marketShare: 'Free alternative niche',
      strengths: [
        'Completely free model',
        'Meeting time optimization',
        'Multiple calendar support',
        'Simple user experience'
      ],
      weaknesses: [
        'No monetization model',
        'Solo founder risk',
        'Limited features',
        'Uncertain sustainability'
      ],
      keyMetrics: {
        companies: 'Individual users',
        pricing: 'Free',
        integrations: '6 calendars max',
        satisfaction: 4.0
      },
      recentNews: 'Received M&A offer in April 2025, challenging premium models'
    }
  ];

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.strengths.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         company.weaknesses.some(w => w.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'incumbent': return Building;
      case 'ai-native': return Zap;
      case 'specialized': return Target;
      default: return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'incumbent': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ai-native': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'specialized': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Users className="h-6 w-6 text-primary" />
            Company Profiles
          </CardTitle>
          <CardDescription>
            Detailed analysis of key players in the AI-powered scheduling market
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search companies, strengths, weaknesses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === 'incumbent' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('incumbent')}
              >
                Incumbents
              </Button>
              <Button 
                variant={selectedCategory === 'ai-native' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('ai-native')}
              >
                AI-Native
              </Button>
              <Button 
                variant={selectedCategory === 'specialized' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('specialized')}
              >
                Specialized
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company, index) => {
          const CategoryIcon = getCategoryIcon(company.category);
          
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold">{company.name}</h3>
                      <Badge className={getCategoryColor(company.category)} variant="outline">
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {company.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Founded {company.founded}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="flex items-center gap-1 text-green-600 mb-1">
                      <TrendingUp className="h-3 w-3" />
                      <span className="font-medium">{company.growth}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>{company.keyMetrics.satisfaction}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      Users
                    </div>
                    <p className="font-semibold text-sm">{company.users}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <DollarSign className="h-3 w-3" />
                      Revenue
                    </div>
                    <p className="font-semibold text-sm">{company.revenue}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      Funding
                    </div>
                    <p className="font-semibold text-sm">{company.funding}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Building className="h-3 w-3" />
                      Market
                    </div>
                    <p className="font-semibold text-sm">{company.marketShare}</p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <Tabs defaultValue="strengths" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="strengths" className="text-xs">Strengths</TabsTrigger>
                    <TabsTrigger value="weaknesses" className="text-xs">Weaknesses</TabsTrigger>
                    <TabsTrigger value="metrics" className="text-xs">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="strengths" className="mt-4">
                    <ul className="space-y-2">
                      {company.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <TrendingUp className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="weaknesses" className="mt-4">
                    <ul className="space-y-2">
                      {company.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-3 w-3 text-red-500 mt-0.5 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="metrics" className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Companies:</span>
                        <span className="font-medium">{company.keyMetrics.companies}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Pricing:</span>
                        <span className="font-medium">{company.keyMetrics.pricing}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Recent News:</p>
                      <p className="text-sm">{company.recentNews}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCompanies.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No companies found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CompanyProfiles;