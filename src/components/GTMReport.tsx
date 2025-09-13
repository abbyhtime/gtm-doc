import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Badge } from '@/components/ui/badge';
import { 
  Target, 
  TrendingUp, 
  Users, 
  Zap, 
  BarChart3, 
  MapPin, 
  DollarSign,
  Calendar,
  Moon,
  Sun,
  Shield
} from 'lucide-react';

// Section Components
import ExecutiveSummary from '@/components/gtm-sections/ExecutiveSummary';
import MarketAnalysis from '@/components/gtm-sections/MarketAnalysis';
import ProductStrategy from '@/components/gtm-sections/ProductStrategy';
import { GTMPhasesEditable } from '@/components/gtm-sections/GTMPhasesEditable';
import BusinessModel from '@/components/gtm-sections/BusinessModel';
import TargetMarkets from '@/components/gtm-sections/TargetMarkets';
import MetricsKPIs from '@/components/gtm-sections/MetricsKPIs';
import { DataVerificationManager } from '@/components/DataVerificationManager';

const GTMReport = () => {
  const [activeTab, setActiveTab] = useState('executive');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const sections = [
    {
      id: 'executive',
      label: 'Executive Summary',
      icon: Target,
      color: 'text-gtm-executive',
      bgColor: 'bg-gtm-executive/10'
    },
    {
      id: 'market',
      label: 'Market Analysis',
      icon: TrendingUp,
      color: 'text-gtm-market',
      bgColor: 'bg-gtm-market/10'
    },
    {
      id: 'product',
      label: 'Product Strategy',
      icon: Zap,
      color: 'text-gtm-product',
      bgColor: 'bg-gtm-product/10'
    },
    {
      id: 'phases',
      label: 'GTM Phases',
      icon: Calendar,
      color: 'text-gtm-phases',
      bgColor: 'bg-gtm-phases/10'
    },
    {
      id: 'business',
      label: 'Business Model',
      icon: DollarSign,
      color: 'text-gtm-business',
      bgColor: 'bg-gtm-business/10'
    },
    {
      id: 'targets',
      label: 'Target Markets',
      icon: Users,
      color: 'text-gtm-targets',
      bgColor: 'bg-gtm-targets/10'
    },
    {
      id: 'metrics',
      label: 'Metrics & KPIs',
      icon: BarChart3,
      color: 'text-gtm-metrics',
      bgColor: 'bg-gtm-metrics/10'
    },
    {
      id: 'verification',
      label: 'Data Verification',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="border-b bg-gradient-glass backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  hTime GTM Plan 2025 V1.5
                </h1>
                <Badge variant="secondary" className="text-xs">
                  Go-to-Market Strategy
                </Badge>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-8 bg-gradient-glass p-1 rounded-xl border border-primary/10 h-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg transition-all duration-300 hover:scale-105 data-[state=active]:${section.bgColor} data-[state=active]:${section.color} data-[state=active]:shadow-elevated min-h-[80px]`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium hidden sm:block">{section.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab Content */}
          <div className="space-y-8">
            <TabsContent value="executive" className="space-y-6">
              <ExecutiveSummary />
            </TabsContent>

            <TabsContent value="market" className="space-y-6">
              <MarketAnalysis />
            </TabsContent>

            <TabsContent value="product" className="space-y-6">
              <ProductStrategy />
            </TabsContent>

            <TabsContent value="phases" className="space-y-6">
              <GTMPhasesEditable />
            </TabsContent>

            <TabsContent value="business" className="space-y-6">
              <BusinessModel />
            </TabsContent>

            <TabsContent value="targets" className="space-y-6">
              <TargetMarkets />
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6">
              <MetricsKPIs />
            </TabsContent>

            <TabsContent value="verification" className="space-y-6">
              <DataVerificationManager />
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default GTMReport;