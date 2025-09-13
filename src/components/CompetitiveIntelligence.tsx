import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { 
  BarChart3, 
  Building2, 
  TrendingUp, 
  Users, 
  Brain,
  Map
} from 'lucide-react';

// Import all the detailed components
import ExecutiveDashboard from '@/components/competitive-intelligence/ExecutiveDashboard';
import MarketLandscape from '@/components/competitive-intelligence/MarketLandscape';
import CompanyProfiles from '@/components/competitive-intelligence/CompanyProfiles';
import DataAnalytics from '@/components/competitive-intelligence/DataAnalytics';
import StrategicInsights from '@/components/competitive-intelligence/StrategicInsights';

const CompetitiveIntelligence = () => {
  const [activeTab, setActiveTab] = useState('executive');

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold mb-2">AI Scheduling Tools Market Intelligence</h1>
              <p className="text-lg opacity-90">Comprehensive Analysis • Q4 2024</p>
            </div>
            <div className="flex gap-4">
              <Card className="bg-white/10 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold">$1.6B</div>
                <div className="text-sm opacity-80">Market Size (2032)</div>
              </Card>
              <Card className="bg-white/10 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold">16%</div>
                <div className="text-sm opacity-80">CAGR Growth</div>
              </Card>
              <Card className="bg-white/10 border-white/20 p-4 text-center">
                <div className="text-2xl font-bold">920M+</div>
                <div className="text-sm opacity-80">Total Users</div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="executive" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="landscape" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Market Landscape
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Company Profiles
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Data & Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Strategic Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive" className="animate-fade-in">
            <ExecutiveDashboard />
          </TabsContent>

          <TabsContent value="landscape" className="animate-fade-in">
            <MarketLandscape />
          </TabsContent>

          <TabsContent value="companies" className="animate-fade-in">
            <CompanyProfiles />
          </TabsContent>

          <TabsContent value="analytics" className="animate-fade-in">
            <DataAnalytics />
          </TabsContent>

          <TabsContent value="insights" className="animate-fade-in">
            <StrategicInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompetitiveIntelligence;