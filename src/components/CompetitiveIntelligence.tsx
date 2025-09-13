import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Users, 
  DollarSign, 
  MapPin,
  BarChart3,
  Building2,
  Star,
  Eye
} from 'lucide-react';

interface Company {
  id: string;
  name: string;
  logo: string;
  marketCap: string;
  revenue: string;
  employees: string;
  industry: string;
  position: { x: number; y: number };
  marketShare: number;
  growth: number;
  founded: string;
  headquarters: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  tier: 'leader' | 'challenger' | 'niche' | 'visionary';
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Global',
    logo: '🏢',
    marketCap: '$125B',
    revenue: '$45B',
    employees: '180K',
    industry: 'Enterprise Software',
    position: { x: 75, y: 25 },
    marketShare: 22.5,
    growth: 15.2,
    founded: '1995',
    headquarters: 'Seattle, WA',
    description: 'Leading enterprise software solutions provider with strong cloud infrastructure.',
    strengths: ['Market Leadership', 'Strong R&D', 'Global Presence'],
    weaknesses: ['Legacy Systems', 'Slow Innovation'],
    tier: 'leader'
  },
  {
    id: '2',
    name: 'InnovateAI',
    logo: '🤖',
    marketCap: '$85B',
    revenue: '$28B',
    employees: '95K',
    industry: 'AI/ML Platform',
    position: { x: 65, y: 70 },
    marketShare: 18.3,
    growth: 32.1,
    founded: '2010',
    headquarters: 'San Francisco, CA',
    description: 'AI-first company revolutionizing enterprise automation and intelligence.',
    strengths: ['AI Innovation', 'Fast Growth', 'Strong Talent'],
    weaknesses: ['Limited Enterprise Sales', 'Cash Burn'],
    tier: 'visionary'
  },
  {
    id: '3',
    name: 'DataFlow Systems',
    logo: '📊',
    marketCap: '$42B',
    revenue: '$18B',
    employees: '125K',
    industry: 'Data Analytics',
    position: { x: 35, y: 40 },
    marketShare: 12.7,
    growth: 8.5,
    founded: '2001',
    headquarters: 'Austin, TX',
    description: 'Comprehensive data analytics and business intelligence solutions.',
    strengths: ['Data Expertise', 'Strong Partnerships', 'Proven Track Record'],
    weaknesses: ['Limited AI Capabilities', 'Complex Pricing'],
    tier: 'challenger'
  },
  {
    id: '4',
    name: 'CloudNative Co',
    logo: '☁️',
    marketCap: '$15B',
    revenue: '$5.2B',
    employees: '45K',
    industry: 'Cloud Infrastructure',
    position: { x: 25, y: 80 },
    marketShare: 8.1,
    growth: 45.3,
    founded: '2015',
    headquarters: 'New York, NY',
    description: 'Cloud-native infrastructure specialist focusing on containerization and microservices.',
    strengths: ['Modern Architecture', 'Developer-Friendly', 'High Growth'],
    weaknesses: ['Limited Market Presence', 'Young Company'],
    tier: 'niche'
  }
];

const CompetitiveIntelligence = () => {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState<string>('all');

  const filteredCompanies = mockCompanies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'all' || company.tier === filterTier;
    return matchesSearch && matchesTier;
  });

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'leader': return 'bg-accent-success text-white';
      case 'challenger': return 'bg-accent-info text-white';
      case 'visionary': return 'bg-accent-warning text-white';
      case 'niche': return 'bg-accent-danger text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">Competitive Intelligence Platform</h1>
              <p className="text-lg opacity-90">Enterprise Software Market Analysis • Q4 2024</p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-white/10 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold">$847B</div>
                <div className="text-sm opacity-80">Total Market Size</div>
              </Card>
              <Card className="bg-white/10 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold">+18.5%</div>
                <div className="text-sm opacity-80">Market Growth</div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="flex gap-4 mb-8 animate-slide-up">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value)}
            className="px-4 py-2 border border-border rounded-md bg-background text-foreground"
          >
            <option value="all">All Tiers</option>
            <option value="leader">Leaders</option>
            <option value="challenger">Challengers</option>
            <option value="visionary">Visionaries</option>
            <option value="niche">Niche Players</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Map */}
          <Card className="lg:col-span-2 p-6 shadow-elevated animate-scale-in">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold">Market Positioning Map</h2>
            </div>
            
            <div className="relative h-96 bg-gradient-to-br from-primary/5 to-primary-glow/10 rounded-lg border-2 border-dashed border-primary/20 overflow-hidden">
              {/* Axis Labels */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm font-medium text-muted-foreground">
                Innovation Leadership →
              </div>
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90 text-sm font-medium text-muted-foreground">
                Market Execution →
              </div>
              
              {/* Quadrant Labels */}
              <div className="absolute top-4 right-4 text-xs text-muted-foreground font-medium bg-background/80 px-2 py-1 rounded">
                Leaders
              </div>
              <div className="absolute bottom-4 right-4 text-xs text-muted-foreground font-medium bg-background/80 px-2 py-1 rounded">
                Visionaries
              </div>
              <div className="absolute top-4 left-4 text-xs text-muted-foreground font-medium bg-background/80 px-2 py-1 rounded">
                Challengers
              </div>
              <div className="absolute bottom-4 left-4 text-xs text-muted-foreground font-medium bg-background/80 px-2 py-1 rounded">
                Niche Players
              </div>
              
              {/* Company Positions */}
              {filteredCompanies.map((company) => (
                <div
                  key={company.id}
                  className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-glow ${
                    selectedCompany?.id === company.id ? 'ring-4 ring-primary shadow-glow' : 'shadow-card'
                  } bg-background border-2 border-primary/20`}
                  style={{
                    left: `${company.position.x}%`,
                    top: `${company.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => setSelectedCompany(company)}
                  title={company.name}
                >
                  {company.logo}
                </div>
              ))}
            </div>
          </Card>

          {/* Company Details */}
          <div className="space-y-6">
            {selectedCompany ? (
              <Card className="p-6 shadow-elevated animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{selectedCompany.logo}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{selectedCompany.name}</h3>
                      <Badge className={`mt-1 ${getTierColor(selectedCompany.tier)}`}>
                        {selectedCompany.tier.charAt(0).toUpperCase() + selectedCompany.tier.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedCompany(null)}
                  >
                    ×
                  </Button>
                </div>
                
                <p className="text-muted-foreground mb-4">{selectedCompany.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="font-semibold text-lg">{selectedCompany.marketCap}</div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="font-semibold text-lg">{selectedCompany.revenue}</div>
                    <div className="text-sm text-muted-foreground">Revenue</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="font-semibold text-lg">{selectedCompany.marketShare}%</div>
                    <div className="text-sm text-muted-foreground">Market Share</div>
                  </div>
                  <div className="text-center p-3 bg-secondary/50 rounded-lg">
                    <div className="font-semibold text-lg text-accent-success">+{selectedCompany.growth}%</div>
                    <div className="text-sm text-muted-foreground">Growth</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-accent-success mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Strengths
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCompany.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-accent-warning mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Areas to Watch
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedCompany.weaknesses.map((weakness, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {weakness}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center text-muted-foreground shadow-card">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click on a company in the market map to view detailed analysis</p>
              </Card>
            )}

            {/* Market Insights */}
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Key Market Insights
              </h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-accent-success/10 border border-accent-success/20 rounded-lg">
                  <div className="font-medium text-accent-success">Growth Opportunity</div>
                  <div className="text-muted-foreground">AI integration driving 32% average growth in visionary segment</div>
                </div>
                <div className="p-3 bg-accent-warning/10 border border-accent-warning/20 rounded-lg">
                  <div className="font-medium text-accent-warning">Market Shift</div>
                  <div className="text-muted-foreground">Cloud-native solutions gaining market share from legacy players</div>
                </div>
                <div className="p-3 bg-accent-info/10 border border-accent-info/20 rounded-lg">
                  <div className="font-medium text-accent-info">Investment Trend</div>
                  <div className="text-muted-foreground">$12.5B invested in enterprise automation this quarter</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Company Directory */}
        <Card className="mt-8 p-6 shadow-elevated">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" />
            Company Directory
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCompanies.map((company) => (
              <Card 
                key={company.id}
                className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-glow hover:scale-105 ${
                  selectedCompany?.id === company.id ? 'ring-2 ring-primary shadow-glow' : 'shadow-card'
                }`}
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{company.logo}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{company.name}</div>
                    <div className="text-xs text-muted-foreground">{company.industry}</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Revenue:</span>
                    <span className="font-medium">{company.revenue}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Growth:</span>
                    <span className="font-medium text-accent-success">+{company.growth}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Tier:</span>
                    <Badge className={`text-xs ${getTierColor(company.tier)}`}>
                      {company.tier}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CompetitiveIntelligence;