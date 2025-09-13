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
      id: 1,
      name: "Calendly",
      category: "External Scheduling",
      founded: 2013,
      users: "20M+",
      revenue: "$100M+ ARR",
      funding: "$350M",
      marketShare: "22%",
      logo: "📅",
      description: "Market leader in external scheduling with 20M+ users and strong enterprise adoption",
      strengths: ["Dominant market position", "Extensive integrations ecosystem", "Strong enterprise features", "High user retention"],
      weaknesses: ["Premium pricing limits SMB adoption", "Limited AI automation", "Interface complexity for simple scheduling"],
      keyMetrics: {
        userGrowth: "+35%",
        retention: "85%",
        nps: "65"
      },
      recentNews: [
        "Reached 20M+ user milestone",
        "Enhanced enterprise security features", 
        "Expanded integration marketplace"
      ]
    },
    {
      id: 2,
      name: "Motion",
      category: "AI-Powered",
      founded: 2019,
      users: "100K+",
      revenue: "$10M ARR",
      funding: "$75M",
      marketShare: "5%",
      logo: "🚀",
      description: "AI-first calendar that achieved $10M ARR in just 4 months, leading the AI scheduling renaissance",
      strengths: ["Revolutionary AI automation", "Rapid revenue growth ($10M ARR in 4 months)", "Integrated task + calendar management", "High user satisfaction"],
      weaknesses: ["Premium pricing ($34/month)", "Steep learning curve", "Limited third-party integrations"],
      keyMetrics: {
        userGrowth: "+300%",
        retention: "92%",
        nps: "78"
      },
      recentNews: [
        "Achieved $10M ARR in record 4 months",
        "Launched advanced AI scheduling algorithms",
        "Expanded team collaboration features"
      ]
    },
    {
      id: 3,
      name: "Clockwise",
      category: "Team Productivity", 
      founded: 2017,
      users: "15K organizations",
      revenue: "$25M ARR",
      funding: "$45M",
      marketShare: "8%",
      logo: "⏰",
      description: "Focus time optimization platform serving 15,000+ organizations with AI-powered productivity insights",
      strengths: ["Unique focus time optimization", "Strong enterprise adoption", "Comprehensive team analytics", "Excellent Slack integration"],
      weaknesses: ["Niche market focus", "Less external scheduling features", "Requires behavior change adoption"],
      keyMetrics: {
        userGrowth: "+75%",
        retention: "82%",
        nps: "68"
      },
      recentNews: [
        "Reached 15,000 organizations milestone",
        "Launched AI-powered focus time insights",
        "Enhanced Microsoft Teams integration"
      ]
    },
    {
      id: 4,
      name: "Acuity Scheduling",
      category: "External Scheduling",
      founded: 2006,
      users: "50K+ businesses",
      revenue: "$30M ARR",
      funding: "Acquired by Squarespace",
      marketShare: "15%",
      logo: "📋",
      description: "Veteran scheduling platform acquired by Squarespace, strong in service industries",
      strengths: ["Mature platform with 18 years experience", "Strong service industry features", "Squarespace integration", "Comprehensive customization"],
      weaknesses: ["Legacy interface", "Limited AI capabilities", "Primarily service-focused"],
      keyMetrics: {
        userGrowth: "+15%",
        retention: "78%",
        nps: "58"
      },
      recentNews: [
        "Enhanced Squarespace integration",
        "Mobile app improvements",
        "New payment processing features"
      ]
    },
    {
      id: 5,
      name: "Reclaim.ai",
      category: "AI-Powered",
      founded: 2019,
      users: "50K+",
      revenue: "Acquired",
      funding: "Acquired by Dropbox",
      marketShare: "3%",
      logo: "🔄",
      description: "AI calendar blocking tool acquired by Dropbox for $15M, pioneered habit scheduling",
      strengths: ["Innovative habit-based scheduling", "Strong AI algorithms", "Dropbox backing", "Smart calendar blocking"],
      weaknesses: ["Acquisition uncertainty", "Limited standalone growth", "Niche feature set"],
      keyMetrics: {
        userGrowth: "Acquisition",
        retention: "85%",
        nps: "72"
      },
      recentNews: [
        "Acquired by Dropbox for $15M",
        "Integration with Dropbox ecosystem",
        "Continued product development"
      ]
    },
    {
      id: 6,
      name: "YouCanBookMe",
      category: "External Scheduling",
      founded: 2011,
      users: "100K+ users",
      revenue: "$15M ARR",
      funding: "Bootstrapped",
      marketShare: "8%",
      logo: "📖",
      description: "Bootstrapped UK-based scheduling platform with strong European presence",
      strengths: ["Profitable bootstrapped model", "Strong European market", "Competitive pricing", "Simple interface"],
      weaknesses: ["Limited AI features", "Smaller team vs funded competitors", "Less enterprise focus"],
      keyMetrics: {
        userGrowth: "+25%",
        retention: "75%",
        nps: "62"
      },
      recentNews: [
        "Expanded European data centers",
        "Enhanced mobile experience",
        "New integration partnerships"
      ]
    },
    {
      id: 7,
      name: "Doodle",
      category: "Group Scheduling",
      founded: 2007,
      users: "30M MAU",
      revenue: "$25M ARR",
      funding: "$50M",
      marketShare: "18%",
      logo: "🗳️",
      description: "Swiss-based group scheduling pioneer with 30M+ monthly active users specializing in polls",
      strengths: ["Massive user base (30M MAU)", "Group scheduling leader", "Global brand recognition", "Poll-based innovation"],
      weaknesses: ["Limited individual scheduling", "Less AI integration", "Dated interface"],
      keyMetrics: {
        userGrowth: "+20%",
        retention: "68%",
        nps: "55"
      },
      recentNews: [
        "Reached 30M monthly active users",
        "Launched premium business features",
        "Enhanced mobile polling experience"
      ]
    },
    {
      id: 8,
      name: "Microsoft Outlook",
      category: "Traditional Calendar",
      founded: 1997,
      users: "400M+",
      revenue: "Part of Office Suite",
      funding: "Microsoft",
      marketShare: "45%",
      logo: "📧",
      description: "Enterprise calendar backbone with 400M+ users, slowly adding scheduling features",
      strengths: ["Massive user base (400M+)", "Enterprise integration", "Microsoft ecosystem", "Universal adoption"],
      weaknesses: ["Slow innovation cycle", "Complex interface", "Limited modern scheduling features"],
      keyMetrics: {
        userGrowth: "+10%",
        retention: "95%",
        nps: "48"
      },
      recentNews: [
        "Added basic scheduling features",
        "Enhanced Teams integration",
        "AI assistant improvements"
      ]
    },
    {
      id: 9,
      name: "SavvyCal",
      category: "External Scheduling",
      founded: 2020,
      users: "Growing",
      revenue: "Bootstrapped",
      funding: "Bootstrapped",
      marketShare: "2%",
      logo: "💡",
      description: "Bootstrapped scheduling tool focused on superior UX and recipient experience",
      strengths: ["Superior user experience design", "Recipient-focused approach", "Bootstrapped profitability", "Innovation in UX"],
      weaknesses: ["Small market share", "Limited enterprise features", "Newer brand"],
      keyMetrics: {
        userGrowth: "+150%",
        retention: "88%",
        nps: "82"
      },
      recentNews: [
        "Achieved profitability while bootstrapped",
        "Won design awards for UX",
        "Growing enterprise interest"
      ]
    },
    {
      id: 10,
      name: "Kronologic",
      category: "Sales Automation",
      founded: 2018,
      users: "Enterprise focus",
      revenue: "Private",
      funding: "$20M",
      marketShare: "3%",
      logo: "⚡",
      description: "Sales-focused scheduling automation with $20M funding, targeting enterprise sales teams",
      strengths: ["Sales automation focus", "Enterprise sales features", "Strong funding", "Specialized market"],
      weaknesses: ["Narrow market focus", "High complexity", "Limited general market appeal"],
      keyMetrics: {
        userGrowth: "+80%",
        retention: "78%",
        nps: "65"
      },
      recentNews: [
        "Raised $20M funding round",
        "Expanded sales automation features",
        "New enterprise partnerships"
      ]
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
      case 'External Scheduling': return Calendar;
      case 'AI-Powered': return Zap;
      case 'Team Productivity': return Users;
      case 'Group Scheduling': return Building;
      case 'Traditional Calendar': return Building;
      case 'Sales Automation': return Target;
      default: return Users;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'External Scheduling': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'AI-Powered': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Team Productivity': return 'bg-green-50 text-green-700 border-green-200';
      case 'Group Scheduling': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Traditional Calendar': return 'bg-gray-50 text-gray-700 border-gray-200';
      case 'Sales Automation': return 'bg-red-50 text-red-700 border-red-200';
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
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={selectedCategory === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === 'External Scheduling' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('External Scheduling')}
              >
                External
              </Button>
              <Button 
                variant={selectedCategory === 'AI-Powered' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('AI-Powered')}
              >
                AI-Powered
              </Button>
              <Button 
                variant={selectedCategory === 'Team Productivity' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setSelectedCategory('Team Productivity')}
              >
                Team
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
                      <span className="font-medium">{company.keyMetrics.userGrowth}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-600" />
                      <span>{company.keyMetrics.nps}</span>
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
                      Market Share
                    </div>
                    <p className="font-semibold text-sm">{company.marketShare}</p>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <Tabs defaultValue="strengths" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="strengths" className="text-xs">Strengths</TabsTrigger>
                    <TabsTrigger value="weaknesses" className="text-xs">Weaknesses</TabsTrigger>
                    <TabsTrigger value="news" className="text-xs">News</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="strengths" className="mt-4">
                    <ul className="space-y-2">
                      {company.strengths.map((strength, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <TrendingUp className="h-3 w-3 text-green-700 mt-0.5 flex-shrink-0" />
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="weaknesses" className="mt-4">
                    <ul className="space-y-2">
                      {company.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="h-3 w-3 text-red-700 mt-0.5 flex-shrink-0" />
                          <span>{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="news" className="mt-4 space-y-3">
                    <div className="space-y-2">
                      {company.recentNews.map((news, i) => (
                        <div key={i} className="p-3 bg-muted/50 rounded-lg">
                          <p className="text-sm">{news}</p>
                        </div>
                      ))}
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