import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-surface transition-all duration-300">
      {/* Header */}
      <header className="bg-gradient-primary text-white py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold mb-2 text-white">AI Scheduling Tools Market Intelligence</h1>
              <p className="text-lg text-white/90">Comprehensive Analysis • Q4 2024</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <div className="flex gap-4">
                <div className="metric-card bg-white/10 backdrop-blur-sm border border-white/20 text-center">
                  <div className="text-2xl font-bold text-white">$1.6B</div>
                  <div className="text-sm text-white/80">Market Size (2032)</div>
                </div>
                <div className="metric-card bg-white/10 backdrop-blur-sm border border-white/20 text-center">
                  <div className="text-2xl font-bold text-white">16%</div>
                  <div className="text-sm text-white/80">CAGR Growth</div>
                </div>
                <div className="metric-card bg-white/10 backdrop-blur-sm border border-white/20 text-center">
                  <div className="text-2xl font-bold text-white">920M+</div>
                  <div className="text-sm text-white/80">Total Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white/80 dark:bg-card/80 backdrop-blur-sm border border-white/20 dark:border-border p-1 rounded-lg shadow-glass">
            <TabsTrigger value="executive" className="flex items-center gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
              <TrendingUp className="w-4 h-4" />
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="landscape" className="flex items-center gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
              <Map className="w-4 h-4" />
              Market Landscape
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
              <Building2 className="w-4 h-4" />
              Company Profiles
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
              <BarChart3 className="w-4 h-4" />
              Data & Analytics
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200">
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