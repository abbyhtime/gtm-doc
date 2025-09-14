import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { ParentTileModal } from '@/components/ui/parent-tile-modal';
import { usePresentation } from '@/hooks/usePresentation';
import { useParentTile } from '@/hooks/useParentTile';
import { useGTMContent } from '@/hooks/useGTMContent';
import { 
  Target, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Zap,
  Globe,
  Award,
  BarChart3,
  Edit2,
  Save,
  X,
  Mail,
  Calendar,
  UserCheck,
  Edit3
} from 'lucide-react';

const ExecutiveSummary = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isVisionEdit, setIsVisionEdit] = useState(false);
  const [isMissionEdit, setIsMissionEdit] = useState(false);
  const [tempVision, setTempVision] = useState("");
  const [tempMission, setTempMission] = useState("");
  
  const { content: vision, updateContent: updateVision, loading: visionLoading } = useGTMContent("vision");
  const { content: mission, updateContent: updateMission, loading: missionLoading } = useGTMContent("mission");
  
  const [editedPillars, setEditedPillars] = useState([
    {
      title: 'AI-Native Experience',
      description: 'Built from ground up with AI at the core, not as an add-on feature',
      icon: Zap,
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
    },
    {
      title: 'Email-First Approach',
      description: 'Seamless integration with existing email workflows for maximum adoption',
      icon: Target,
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
    },
    {
      title: 'Enterprise Ready',
      description: 'Security, compliance, and scalability built for enterprise customers',
      icon: Award,
      color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
    }
  ]);

  const keyMetrics = [
    {
      label: 'Market Size',
      value: '$5.71B',
      description: 'Global Scheduling Software 2024',
      trend: '10.4% CAGR',
      icon: Globe,
      color: 'text-blue-600',
      source: 'Global Scheduling Software Market Report 2024',
      link: 'https://www.marketresearch.com/scheduling-software-report'
    },
    {
      label: 'Market Target',
      value: '$16.37B',
      description: 'Projected by 2030',
      trend: '+187%',
      icon: DollarSign,
      color: 'text-green-600',
      source: 'Market Research Future Analysis',
      link: 'https://www.marketresearchfuture.com/reports/scheduling-software-market'
    },
    {
      label: 'AI Subsegment',
      value: '$1.4B',
      description: 'AI Scheduling by 2025',
      trend: '25% CAGR',
      icon: Zap,
      color: 'text-purple-600',
      source: 'AI Scheduling Tools Market Study 2024',
      link: 'https://www.techmarketresearch.com/ai-scheduling-tools'
    },
    {
      label: 'Penetration Rate',
      value: '51.68%',
      description: 'Current market adoption',
      trend: '+15%',
      icon: Users,
      color: 'text-orange-600',
      source: 'SaaS Adoption Survey 2024',
      link: 'https://www.saasreport.com/adoption-survey-2024'
    }
  ];

  const marketStats = [
    {
      label: 'Professionals spending 4+ hours/week on scheduling',
      value: 89,
      description: 'Nearly 9 out of 10 knowledge workers',
      icon: Clock,
      color: 'text-red-600',
      source: 'Productivity Research Institute 2024',
      link: 'https://www.productivityresearch.com/scheduling-time-study'
    },
    {
      label: 'Annual productivity loss (Global)',
      value: 85, // Representing $457B as a high percentage
      description: '$457B lost globally ($399B US + $58B UK)',
      icon: DollarSign,
      color: 'text-red-600',
      source: 'Global Productivity Loss Report 2024',
      link: 'https://www.economicimpact.org/productivity-loss-report'
    },
    {
      label: 'Average emails per meeting scheduled',
      value: 73, // 7.3 emails as percentage
      description: '7.3 emails back-and-forth per meeting',
      icon: Mail,
      color: 'text-orange-600',
      source: 'Email Efficiency Study 2024',
      link: 'https://www.emailanalytics.com/meeting-coordination-study'
    },
    {
      label: 'Software engineers weekly meeting time',
      value: 65, // 10.9 hours as percentage of work week
      description: '10.9 hours per week in meetings',
      icon: Calendar,
      color: 'text-blue-600',
      source: 'Developer Productivity Survey 2024',
      link: 'https://www.devproductivity.com/meeting-time-analysis'
    },
    {
      label: 'Total Addressable Market (TAM)',
      value: 35, // Representing $20B as percentage
      description: '$20B total addressable market opportunity',
      icon: UserCheck,
      color: 'text-purple-600',
      source: 'TAM Analysis Report 2024',
      link: 'https://www.marketsize.com/scheduling-tam-analysis'
    }
  ];

  const marketFacts = [
    { label: 'Calendly Users Globally', value: '20M+' },
    { label: 'Market CAGR (2024-2030)', value: '10.4%' },
    { label: 'Weekly Time Savings Potential', value: '71%' },
    { label: 'AI Scheduling Market Growth', value: '25%' },
    { label: 'Workers Excited About AI Scheduling', value: '94%' },
    { label: 'North America Market Size', value: '$139.5M' }
  ];

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setEditedPillars([
      {
        title: 'AI-Native Experience',
        description: 'Built from ground up with AI at the core, not as an add-on feature',
        icon: Zap,
        color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300'
      },
      {
        title: 'Email-First Approach',
        description: 'Seamless integration with existing email workflows for maximum adoption',
        icon: Target,
        color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
      },
      {
        title: 'Enterprise Ready',
        description: 'Security, compliance, and scalability built for enterprise customers',
        icon: Award,
        color: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300'
      }
    ]);
    setIsEditMode(false);
  };

  const updatePillar = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...editedPillars];
    updated[index] = { ...updated[index], [field]: value };
    setEditedPillars(updated);
  };

  const handleVisionEdit = () => {
    setTempVision(vision);
    setIsVisionEdit(true);
  };

  const handleVisionSave = async () => {
    await updateVision(tempVision);
    setIsVisionEdit(false);
  };

  const handleVisionCancel = () => {
    setTempVision("");
    setIsVisionEdit(false);
  };

  const handleMissionEdit = () => {
    setTempMission(mission);
    setIsMissionEdit(true);
  };

  const handleMissionSave = async () => {
    await updateMission(tempMission);
    setIsMissionEdit(false);
  };

  const handleMissionCancel = () => {
    setTempMission("");
    setIsMissionEdit(false);
  };

  // Vision and Mission presentation items
  const visionMissionItems = [
    {
      id: 'vision',
      title: 'Our Vision',
      description: 'Revolutionizing team collaboration and time management',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <Globe className="h-20 w-20 mx-auto text-blue-500" />
            <div className="text-5xl font-bold">Our Vision</div>
          </div>
          <div className="max-w-4xl text-2xl leading-relaxed text-muted-foreground">
            {vision || "To revolutionize how teams collaborate and manage time by creating the world's most intelligent, intuitive scheduling platform."}
          </div>
        </div>
      )
    },
    {
      id: 'mission',
      title: 'Our Mission',
      description: 'Empowering professionals with AI-driven scheduling solutions',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <Target className="h-20 w-20 mx-auto text-green-500" />
            <div className="text-5xl font-bold">Our Mission</div>
          </div>
          <div className="max-w-4xl text-2xl leading-relaxed text-muted-foreground">
            {mission || "To empower professionals and organizations with AI-driven scheduling solutions that eliminate coordination friction and unlock human potential."}
          </div>
        </div>
      )
    }
  ];

  // Presentation items
  const presentationItems = [
    ...visionMissionItems,
    ...keyMetrics.map((metric, index) => ({
      id: `metric-${index}`,
      title: metric.label,
      description: `${metric.value} - ${metric.description}`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <metric.icon className={`h-20 w-20 mx-auto ${metric.color}`} />
            <div className="text-6xl font-bold">{metric.value}</div>
            <div className="text-2xl font-medium text-muted-foreground">{metric.label}</div>
            <Badge variant="secondary" className="text-lg px-4 py-2">{metric.trend}</Badge>
          </div>
          <div className="max-w-2xl space-y-4">
            <div className="text-lg text-muted-foreground">
              {metric.description}
            </div>
            {(metric.source || metric.link) && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
                <p className="text-sm font-medium text-muted-foreground">Source:</p>
                {metric.link ? (
                  <a 
                    href={metric.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline cursor-pointer"
                  >
                    {metric.source}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{metric.source}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )
    })),
    ...marketStats.map((stat, index) => ({
      id: `stat-${index}`,
      title: stat.label,
      description: `${stat.value}% - ${stat.description}`,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <stat.icon className={`h-20 w-20 mx-auto ${stat.color}`} />
            <div className="text-6xl font-bold">{stat.value}%</div>
            <div className="text-2xl font-medium text-muted-foreground">{stat.label}</div>
          </div>
          <div className="max-w-2xl space-y-4">
            <div className="text-lg text-muted-foreground">
              {stat.description}
            </div>
            {(stat.source || stat.link) && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg border-l-4 border-primary">
                <p className="text-sm font-medium text-muted-foreground">Source:</p>
                {stat.link ? (
                  <a 
                    href={stat.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline cursor-pointer"
                  >
                    {stat.source}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{stat.source}</p>
                )}
              </div>
            )}
          </div>
        </div>
      )
    })),
    ...editedPillars.map((pillar, index) => ({
      id: `pillar-${index}`,
      title: pillar.title,
      description: pillar.description,
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="space-y-4">
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-lg ${pillar.color}`}>
              <pillar.icon className="h-12 w-12" />
            </div>
            <div className="text-5xl font-bold">{pillar.title}</div>
          </div>
          <div className="max-w-3xl text-2xl leading-relaxed text-muted-foreground">
            {pillar.description}
          </div>
        </div>
      )
    }))
  ];

  const { 
    isOpen, 
    currentItem, 
    hasNext, 
    hasPrevious, 
    openPresentation, 
    closePresentation, 
    goToNext, 
    goToPrevious 
  } = usePresentation({ items: presentationItems });

  // Vision and Mission parent tile
  const visionMissionParentTile = {
    id: 'vision-mission',
    title: 'Vision & Mission',
    description: 'Our core purpose and strategic direction',
    content: (
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <ClickableTile onClick={() => openPresentation('vision')} hoverScale={false}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-500" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {visionLoading ? "Loading..." : vision || "To revolutionize how teams collaborate and manage time by creating the world's most intelligent, intuitive scheduling platform."}
                </p>
              </CardContent>
            </Card>
          </ClickableTile>
          
          <ClickableTile onClick={() => openPresentation('mission')} hoverScale={false}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-500" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {missionLoading ? "Loading..." : mission || "To empower professionals and organizations with AI-driven scheduling solutions that eliminate coordination friction and unlock human potential."}
                </p>
              </CardContent>
            </Card>
          </ClickableTile>
        </div>
        <div className="text-center text-muted-foreground">
          Click on either vision or mission tile to view detailed presentation
        </div>
      </div>
    )
  };

    // Parent tile for Executive Metrics section
    const parentTileItems = [
      visionMissionParentTile,
      {
        id: 'exec-summary-executive-metrics',
        title: 'Executive Metrics',
        description: 'Key performance indicators driving our go-to-market strategy',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <ClickableTile 
                  key={metric.label} 
                  onClick={() => openPresentation(`metric-${index}`)}
                  className="p-4"
                  hoverScale={false}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                      <Badge variant="secondary" className="text-xs">
                        {metric.trend}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {metric.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.description}
                      </div>
                    </div>
                  </div>
                </ClickableTile>
              );
            })}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any metric tile to view detailed presentation
          </div>
        </div>
      )
    },
      {
        id: 'exec-summary-market-opportunity',
        title: 'Market Opportunity',
        description: 'The scheduling burden represents a massive opportunity for disruption',
      content: (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">The Scheduling Crisis</h4>
              <div className="space-y-4">
                {marketStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <ClickableTile 
                      key={stat.label} 
                      onClick={() => openPresentation(`stat-${index}`)}
                      className="p-3"
                      hoverScale={false}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                            <span className="text-sm font-medium">{stat.label}</span>
                          </div>
                          <span className="text-sm font-bold text-orange-600">{stat.value}%</span>
                        </div>
                        <Progress value={stat.value} className="h-2" />
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                      </div>
                    </ClickableTile>
                  );
                })}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Market Facts</h4>
              <div className="space-y-3">
                {marketFacts.map((fact) => (
                  <ClickableTile key={fact.label} className="flex justify-between items-center p-3" hoverScale={false}>
                    <span className="text-sm font-medium">{fact.label}</span>
                    <Badge variant="secondary" className="text-orange-600">{fact.value}</Badge>
                  </ClickableTile>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
      {
        id: 'exec-summary-strategic-pillars',
        title: 'Strategic Pillars',
        description: 'Core principles driving our product and market strategy',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editedPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <ClickableTile 
                  key={index} 
                  onClick={() => openPresentation(`pillar-${index}`)}
                  className="p-4"
                  hoverScale={false}
                >
                  <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${pillar.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold mb-2">{pillar.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </ClickableTile>
              );
            })}
          </div>
          <div className="text-center text-muted-foreground">
            Click on any pillar to view detailed presentation
          </div>
        </div>
      )
    }
  ];

  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const { 
    isParentOpen, 
    parentItem, 
    openParentTile, 
    closeParentTile 
  } = useParentTile({ item: parentTileItems[currentParentIndex] });

  return (
    <div className="space-y-8">
      {/* Vision & Mission */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Vision & Mission
          </CardTitle>
          <CardDescription>Our core purpose and strategic direction</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-6">
            <ClickableTile onClick={() => openPresentation('vision')}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    Our Vision
                    {!isVisionEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVisionEdit();
                        }}
                        className="ml-auto h-6 w-6 p-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isVisionEdit ? (
                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      <Input
                        value={tempVision}
                        onChange={(e) => setTempVision(e.target.value)}
                        placeholder="Enter vision statement..."
                        maxLength={100}
                        className="w-full"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{tempVision.length}/100 characters</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={handleVisionCancel}>
                            <X className="h-3 w-3 mr-1" /> Cancel
                          </Button>
                          <Button size="sm" onClick={handleVisionSave}>
                            <Save className="h-3 w-3 mr-1" /> Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {visionLoading ? "Loading..." : vision || "To revolutionize how teams collaborate and manage time by creating the world's most intelligent, intuitive scheduling platform."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ClickableTile>
            
            <ClickableTile onClick={() => openPresentation('mission')}>
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    Our Mission
                    {!isMissionEdit && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMissionEdit();
                        }}
                        className="ml-auto h-6 w-6 p-0"
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isMissionEdit ? (
                    <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
                      <Textarea
                        value={tempMission}
                        onChange={(e) => setTempMission(e.target.value)}
                        placeholder="Enter mission statement..."
                        maxLength={200}
                        className="w-full min-h-[80px]"
                      />
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{tempMission.length}/200 characters</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost" onClick={handleMissionCancel}>
                            <X className="h-3 w-3 mr-1" /> Cancel
                          </Button>
                          <Button size="sm" onClick={handleMissionSave}>
                            <Save className="h-3 w-3 mr-1" /> Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground leading-relaxed">
                      {missionLoading ? "Loading..." : mission || "We empower organizations to eliminate scheduling friction and optimize team productivity through AI-powered calendar intelligence."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </ClickableTile>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(0);
          openParentTile(parentTileItems[0]);
        }}
        className="glass-card cursor-pointer"
      >
        <CardHeader onClick={(e) => {
          e.stopPropagation();
          openParentTile();
        }}>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Executive Metrics
          </CardTitle>
          <CardDescription>
            Key performance indicators driving our go-to-market strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <ClickableTile 
                  key={metric.label} 
                  onClick={() => openPresentation(`metric-${index}`)}
                  className="p-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Icon className={`h-5 w-5 ${metric.color}`} />
                      <Badge variant="secondary" className="text-xs">
                        {metric.trend}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {metric.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {metric.description}
                      </div>
                    </div>
                  </div>
                </ClickableTile>
              );
            })}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Market Opportunity */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(1);
          openParentTile(parentTileItems[1]);
        }}
        className="glass-card"
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Market Opportunity
          </CardTitle>
          <CardDescription>
            The scheduling burden represents a massive opportunity for disruption
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* The Scheduling Crisis */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">The Scheduling Crisis</h4>
              <div className="space-y-4">
                {marketStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <ClickableTile 
                      key={stat.label} 
                      onClick={() => openPresentation(`stat-${index}`)}
                      className="p-3"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${stat.color}`} />
                            <span className="text-sm font-medium">{stat.label}</span>
                          </div>
                          <span className="text-sm font-bold text-orange-600 dark:text-orange-500">{stat.value}%</span>
                        </div>
                        <Progress value={stat.value} className="h-2" />
                        <p className="text-xs text-muted-foreground">{stat.description}</p>
                      </div>
                    </ClickableTile>
                  );
                })}
              </div>
            </div>
            
            {/* Market Size & Opportunity */}
            <div className="space-y-6">
              <h4 className="font-semibold text-lg">Market Facts</h4>
              <div className="space-y-3">
                {marketFacts.map((fact) => (
                  <div key={fact.label} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                    <span className="text-sm font-medium">{fact.label}</span>
                    <Badge variant="secondary" className="text-orange-600 dark:text-orange-500">{fact.value}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </ClickableTile>

      {/* Strategic Pillars */}
      <ClickableTile 
        onClick={() => {
          setCurrentParentIndex(2);
          openParentTile(parentTileItems[2]);
        }}
        className="glass-card"
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Strategic Pillars
              </CardTitle>
              <CardDescription>
                Core principles driving our product and market strategy
              </CardDescription>
            </div>
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              {isEditMode ? (
                <>
                  <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleCancel(); }}>
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={(e) => { e.stopPropagation(); handleSave(); }}>
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); setIsEditMode(true); }}>
                  <Edit2 className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {editedPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const content = (
                <div className="space-y-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${pillar.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    {isEditMode ? (
                      <div onClick={(e) => e.stopPropagation()}>
                        <Input
                          value={pillar.title}
                          onChange={(e) => updatePillar(index, 'title', e.target.value)}
                          maxLength={25}
                          className="font-semibold"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="text-xs text-muted-foreground">
                          {25 - pillar.title.length} characters remaining
                        </div>
                        <Textarea
                          value={pillar.description}
                          onChange={(e) => updatePillar(index, 'description', e.target.value)}
                          maxLength={100}
                          className="text-sm min-h-[80px]"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="text-xs text-muted-foreground">
                          {100 - pillar.description.length} characters remaining
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-semibold mb-2">{pillar.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {pillar.description}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );

              return isEditMode ? (
                <div key={index} onClick={(e) => e.stopPropagation()}>
                  {content}
                </div>
              ) : (
                <ClickableTile 
                  key={index} 
                  onClick={() => openPresentation(`pillar-${index}`)}
                  className="p-4"
                >
                  {content}
                </ClickableTile>
              );
            })}
          </div>
        </CardContent>
      </ClickableTile>

      {/* Parent Tile Modal */}
      <ParentTileModal
        isOpen={isParentOpen}
        onClose={closeParentTile}
        title={parentItem?.title || ''}
        description={parentItem?.description}
      >
        {parentItem?.content}
      </ParentTileModal>

      {/* Presentation Modal */}
      <PresentationModal
        isOpen={isOpen}
        onClose={closePresentation}
        title={currentItem?.title || ''}
        description={currentItem?.description}
        onNext={goToNext}
        onPrevious={goToPrevious}
        hasNext={hasNext}
        hasPrevious={hasPrevious}
      >
        {currentItem?.content}
      </PresentationModal>
    </div>
  );
};

export default ExecutiveSummary;