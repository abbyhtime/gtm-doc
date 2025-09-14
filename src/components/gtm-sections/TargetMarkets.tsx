import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ClickableTile } from "@/components/ui/clickable-tile";
import { ParentTileModal } from "@/components/ui/parent-tile-modal";
import { PresentationModal } from "@/components/ui/presentation-modal";
import { useParentTile } from "@/hooks/useParentTile";
import { usePresentation } from "@/hooks/usePresentation";
import { 
  Building2, 
  Users, 
  Briefcase, 
  TrendingUp,
  Target,
  MapPin,
  DollarSign,
  Calendar,
  Zap,
  Shield,
  Rocket
} from "lucide-react";

// Market Segments Data - aligned with $16.37B total market projection
const marketSegments = [
  {
    id: 'enterprise',
    name: 'Enterprise',
    size: '1000+ employees',
    marketSize: '$8.2B',
    icon: Building2,
    color: 'bg-blue-500 text-white',
    priority: 'Primary',
    description: 'Large corporations with complex scheduling needs and multiple departments',
    source: 'McKinsey Global Institute - Future of Work 2024'
  },
  {
    id: 'smb',
    name: 'SMB',
    size: '50-999 employees', 
    marketSize: '$6.1B',
    icon: Briefcase,
    color: 'bg-green-500 text-white',
    priority: 'Secondary',
    description: 'Small to medium businesses looking to scale their operations efficiently',
    source: 'McKinsey Global Institute - Future of Work 2024'
  },
  {
    id: 'startups',
    name: 'Startups',
    size: '10-49 employees',
    marketSize: '$2.1B', 
    icon: Rocket,
    color: 'bg-purple-500 text-white',
    priority: 'Growth',
    description: 'Fast-growing startups that need agile and cost-effective solutions',
    source: 'McKinsey Global Institute - Future of Work 2024'
  }
];

// Customer Personas by Segment
const customerPersonas = {
  enterprise: [
    {
      title: "Executive Assistant",
      role: "C-Suite Support",
      painPoints: ["Managing complex executive calendars", "Coordinating across time zones", "Handling last-minute changes"],
      motivations: ["Efficiency improvement", "Reducing manual work", "Professional appearance"],
      demographics: "25-45 years, experienced administrative professionals"
    },
    {
      title: "IT Director", 
      role: "Technology Decision Maker",
      painPoints: ["Integration complexity", "Security concerns", "User adoption challenges"],
      motivations: ["Seamless integrations", "Enterprise security", "Minimal IT overhead"],
      demographics: "35-55 years, technical background, budget authority"
    }
  ],
  smb: [
    {
      title: "Operations Manager",
      role: "Process Optimizer", 
      painPoints: ["Limited IT resources", "Manual scheduling overhead", "Team coordination challenges"],
      motivations: ["Cost-effective solutions", "Easy implementation", "Improved team productivity"],
      demographics: "30-50 years, business operations focus"
    },
    {
      title: "Small Business Owner",
      role: "Decision Maker",
      painPoints: ["Time management", "Customer scheduling", "Resource optimization"],
      motivations: ["Business growth", "Operational efficiency", "Customer satisfaction"],
      demographics: "35-60 years, entrepreneurial mindset"
    }
  ],
  startups: [
    {
      title: "Founder/CEO",
      role: "Visionary Leader",
      painPoints: ["Rapid scaling challenges", "Budget constraints", "Time to market pressure"],
      motivations: ["Fast implementation", "Scalable solutions", "Competitive advantage"],
      demographics: "25-45 years, tech-savvy, growth-focused"
    },
    {
      title: "Chief of Staff",
      role: "Operations Lead",
      painPoints: ["Cross-functional coordination", "Limited tools budget", "Rapid team growth"],
      motivations: ["Operational excellence", "Team alignment", "Efficient processes"],
      demographics: "25-40 years, operations background"
    }
  ]
};

// ICP Analysis by Segment
const icpAnalysis = {
  enterprise: {
    firmographics: {
      "Company Size": "1000+ employees",
      "Revenue": "$100M+ annually", 
      "Industry": "Technology, Financial Services, Healthcare",
      "Geographic": "North America, Europe"
    },
    technographics: {
      "Email Platform": "Microsoft 365, Google Workspace",
      "Calendar System": "Outlook, Google Calendar",
      "CRM": "Salesforce, Microsoft Dynamics",
      "Communication": "Teams, Slack, Zoom"
    },
    behavioral: {
      "Decision Process": "Committee-based, 6-12 month cycles",
      "Budget Authority": "$50K-$500K annually",
      "Technology Adoption": "Cautious, thorough evaluation",
      "Support Needs": "Dedicated customer success"
    }
  },
  smb: {
    firmographics: {
      "Company Size": "50-999 employees",
      "Revenue": "$5M-$100M annually",
      "Industry": "Professional Services, Manufacturing, Retail",
      "Geographic": "North America primary"
    },
    technographics: {
      "Email Platform": "Google Workspace, Microsoft 365",
      "Calendar System": "Google Calendar, Outlook",
      "CRM": "HubSpot, Salesforce Essentials",
      "Communication": "Zoom, Teams, Slack"
    },
    behavioral: {
      "Decision Process": "2-4 person team, 3-6 month cycles",
      "Budget Authority": "$5K-$50K annually", 
      "Technology Adoption": "Pragmatic, ROI-focused",
      "Support Needs": "Self-service with expert help"
    }
  },
  startups: {
    firmographics: {
      "Company Size": "10-49 employees",
      "Revenue": "$1M-$10M annually",
      "Industry": "Technology, SaaS, Digital Services", 
      "Geographic": "Silicon Valley, Austin, NYC, Remote"
    },
    technographics: {
      "Email Platform": "Google Workspace primarily",
      "Calendar System": "Google Calendar",
      "CRM": "HubSpot, Pipedrive, Notion",
      "Communication": "Slack, Discord, Zoom"
    },
    behavioral: {
      "Decision Process": "Founder-led, 1-3 month cycles",
      "Budget Authority": "$1K-$10K annually",
      "Technology Adoption": "Early adopter, innovation-seeking",
      "Support Needs": "Community-driven, quick resolution"
    }
  }
};

// GTM Priorities
const gtmPriorities = [
  {
    phase: "Phase 1",
    timeline: "Q1-Q2 2025",
    rationale: "Enterprise focus for revenue stability and market credibility",
    allocation: "70% Enterprise, 20% SMB, 10% Startups",
    targets: "10 Enterprise customers, $1M ARR"
  },
  {
    phase: "Phase 2", 
    timeline: "Q3-Q4 2025",
    rationale: "Expand to SMB market with proven enterprise success",
    allocation: "50% Enterprise, 40% SMB, 10% Startups",
    targets: "50 total customers, $5M ARR"
  },
  {
    phase: "Phase 3",
    timeline: "2026",
    rationale: "Scale across all segments with product-led growth",
    allocation: "40% Enterprise, 35% SMB, 25% Startups", 
    targets: "500 total customers, $25M ARR"
  }
];

export default function TargetMarkets() {
  const [currentSegment, setCurrentSegment] = useState('enterprise');

  // Presentation items for modal
  const presentationItems = [
    ...marketSegments.map(segment => ({
      id: `segment-${segment.id}`,
      title: segment.name,
      description: segment.description,
      category: "Market Segments",
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <segment.icon className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">{segment.name}</h2>
            <p className="text-lg text-muted-foreground mb-6">{segment.description}</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <h4 className="font-semibold mb-2">Market Size</h4>
              <div className="text-2xl font-bold text-primary">{segment.marketSize}</div>
              <div className="text-xs text-muted-foreground mt-1">
                Source: <a href="#" className="text-primary hover:underline">{segment.source}</a>
              </div>
            </Card>
            <Card className="p-4 text-center">
              <h4 className="font-semibold mb-2">Team Size</h4>
              <div className="text-2xl font-bold text-primary">{segment.size}</div>
            </Card>
            <Card className="p-4 text-center">
              <h4 className="font-semibold mb-2">Priority</h4>
              <Badge className="text-lg px-3 py-1">{segment.priority}</Badge>
            </Card>
          </div>
        </div>
      )
    }))
  ];

  const { isOpen: isPresentationOpen, openPresentation, closePresentation, currentItem, hasNext, hasPrevious, goToNext, goToPrevious } = usePresentation({ items: presentationItems });

  // Parent tile for market segments
  const segmentsParentTile = {
    id: 'market-segments',
    title: 'Market Segments Overview',
    description: 'Select a segment to view detailed analysis',
    content: (
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {marketSegments.map((segment) => (
          <ClickableTile
            key={segment.id}
            onClick={() => openPresentation(`segment-${segment.id}`)}
          >
            <Button
              variant={currentSegment === segment.id ? "default" : "outline"}
              className={`h-auto p-4 flex flex-col gap-2 w-full ${
                currentSegment === segment.id ? segment.color : ''
              }`}
            >
              <segment.icon className="h-6 w-6" />
              <div className="text-center">
                <div className="font-semibold">{segment.name}</div>
                <div className="text-xs opacity-80">{segment.size}</div>
              </div>
            </Button>
          </ClickableTile>
        ))}
      </div>
    )
  };

  const { isParentOpen: isSegmentsOpen, openParentTile: openSegments, closeParentTile: closeSegments } = useParentTile();

  return (
    <div className="space-y-8">
      {/* Market Segment Selection */}
      <ClickableTile onClick={() => openSegments(segmentsParentTile)}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Market Segments Overview
            </CardTitle>
            <CardDescription>Select a segment to view detailed analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              {marketSegments.map((segment) => (
                <Button
                  key={segment.id}
                  variant={currentSegment === segment.id ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col gap-2 ${
                    currentSegment === segment.id ? segment.color : ''
                  }`}
                  onClick={() => setCurrentSegment(segment.id)}
                >
                  <segment.icon className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold">{segment.name}</div>
                    <div className="text-xs opacity-80">{segment.size}</div>
                  </div>
                </Button>
              ))}
            </div>

            {/* Segment Overview */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {marketSegments.find(s => s.id === currentSegment)?.marketSize}
                </div>
                <div className="text-xs text-muted-foreground">Market Size</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <a href="#" className="text-primary hover:underline">
                    {marketSegments.find(s => s.id === currentSegment)?.source}
                  </a>
                </div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {currentSegment === 'enterprise' ? '95%' : 
                   currentSegment === 'smb' ? '78%' : '65%'}
                </div>
                <div className="text-xs text-muted-foreground">Email Integration</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {currentSegment === 'enterprise' ? '12 months' :
                   currentSegment === 'smb' ? '6 months' : '3 months'}
                </div>
                <div className="text-xs text-muted-foreground">Sales Cycle</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {currentSegment === 'enterprise' ? '40%' :
                   currentSegment === 'smb' ? '15%' : '25%'}
                </div>
                <div className="text-xs text-muted-foreground">Market Share Goal</div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </ClickableTile>

      {/* Detailed Segment Analysis */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Customer Personas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Personas
            </CardTitle>
            <CardDescription>Key decision makers and influencers for {marketSegments.find(s => s.id === currentSegment)?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {customerPersonas[currentSegment as keyof typeof customerPersonas]?.map((persona, index) => (
                <Card key={index} className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold">{persona.title}</h4>
                      <p className="text-sm text-muted-foreground">{persona.role}</p>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-red-600 mb-1">Pain Points:</h5>
                      <ul className="text-xs space-y-1">
                        {persona.painPoints.map((pain, painIndex) => (
                          <li key={painIndex} className="flex items-start gap-1">
                            <span className="text-red-500">•</span>
                            <span>{pain}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-green-600 mb-1">Motivations:</h5>
                      <ul className="text-xs space-y-1">
                        {persona.motivations.map((motivation, motIndex) => (
                          <li key={motIndex} className="flex items-start gap-1">
                            <span className="text-green-500">•</span>
                            <span>{motivation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">{persona.demographics}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ICP Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Ideal Customer Profile
            </CardTitle>
            <CardDescription>Detailed ICP breakdown for {marketSegments.find(s => s.id === currentSegment)?.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Firmographics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(icpAnalysis[currentSegment as keyof typeof icpAnalysis]?.firmographics || {}).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <div className="font-medium">{key}:</div>
                      <div className="text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Technographics
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(icpAnalysis[currentSegment as keyof typeof icpAnalysis]?.technographics || {}).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <div className="font-medium">{key}:</div>
                      <div className="text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Behavioral
                </h4>
                <div className="space-y-2">
                  {Object.entries(icpAnalysis[currentSegment as keyof typeof icpAnalysis]?.behavioral || {}).map(([key, value]) => (
                    <div key={key} className="text-xs">
                      <div className="font-medium">{key}:</div>
                      <div className="text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Go-to-Market Priorities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Go-to-Market Priorities
          </CardTitle>
          <CardDescription>Phased approach to market entry and expansion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {gtmPriorities.map((priority, index) => (
              <Card key={index} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{priority.phase}</Badge>
                    <span className="text-sm text-muted-foreground">{priority.timeline}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Rationale</h4>
                    <p className="text-sm text-muted-foreground">{priority.rationale}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Resource Allocation</h4>
                    <p className="text-sm">{priority.allocation}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <h4 className="font-semibold mb-1">Targets</h4>
                    <p className="text-sm text-primary">{priority.targets}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parent Tile Modal */}
      <ParentTileModal
        isOpen={isSegmentsOpen}
        onClose={closeSegments}
        title="Market Segments Overview"
        description="Select a segment to view detailed analysis"
      >
        {segmentsParentTile.content}
      </ParentTileModal>

      {/* Presentation Modal */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={closePresentation}
        title={currentItem?.title || ""}
        description={currentItem?.description}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
        onNext={goToNext}
        onPrevious={goToPrevious}
      >
        {currentItem?.content}
      </PresentationModal>
    </div>
  );
}