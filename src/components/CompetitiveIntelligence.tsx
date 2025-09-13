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
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const finalTheme = savedTheme || 'dark';
    setTheme(finalTheme);
    document.documentElement.classList.toggle('dark', finalTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 transition-all duration-300">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent dark:from-black/20"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="animate-fade-in">
              <h1 className="text-5xl font-bold mb-3 text-primary-foreground tracking-tight">AI Scheduling Tools Market Intelligence</h1>
              <p className="text-xl text-primary-foreground/90 font-medium">Comprehensive Analysis • Q4 2024</p>
            </div>
            <div className="flex items-center gap-6">
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
              <div className="flex gap-6">
                <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm border-0 shadow-lg p-6 rounded-2xl text-center min-w-[140px] hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl font-bold text-foreground mb-1">$1.6B</div>
                  <div className="text-sm text-muted-foreground font-medium">Market Size (2032)</div>
                </div>
                <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm border-0 shadow-lg p-6 rounded-2xl text-center min-w-[140px] hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl font-bold text-foreground mb-1">16%</div>
                  <div className="text-sm text-muted-foreground font-medium">CAGR Growth</div>
                </div>
                <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm border-0 shadow-lg p-6 rounded-2xl text-center min-w-[140px] hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl font-bold text-foreground mb-1">920M+</div>
                  <div className="text-sm text-muted-foreground font-medium">Total Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-card border border-border shadow-sm p-2 rounded-xl">
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