import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PresentationModal } from '@/components/ui/presentation-modal';
import { ClickableTile } from '@/components/ui/clickable-tile';
import { usePresentation } from '@/hooks/usePresentation';
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
      value: '$4.5B',
      description: 'AI Scheduling Market 2024',
      trend: '+45%',
      icon: Globe,
      color: 'text-blue-600'
    },
    {
      label: 'Target ARR',
      value: '$50M',
      description: 'By 2027',
      trend: '+300%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      label: 'Time Savings',
      value: '2.5hrs',
      description: 'Per user per week',
      trend: '+150%',
      icon: Clock,
      color: 'text-purple-600'
    },
    {
      label: 'User Base',
      value: '500K',
      description: 'Target by 2026',
      trend: '+250%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const marketStats = [
    {
      label: 'Professionals spending 4+ hours/week on scheduling',
      value: 89,
      description: 'Nearly 9 out of 10 knowledge workers',
      icon: Clock,
      color: 'text-red-600'
    },
    {
      label: 'Annual productivity loss (US)',
      value: 85, // Representing $399B as a high percentage
      description: '$399B lost to scheduling inefficiency',
      icon: DollarSign,
      color: 'text-red-600'
    },
    {
      label: 'Average emails per meeting scheduled',
      value: 73, // 7.3 emails as percentage
      description: '7.3 emails back-and-forth per meeting',
      icon: Mail,
      color: 'text-orange-600'
    },
    {
      label: 'Software engineers weekly meeting time',
      value: 65, // 10.9 hours as percentage of work week
      description: '10.9 hours per week in meetings',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Recruiter time spent on interview scheduling',
      value: 35,
      description: '35% of total working time',
      icon: UserCheck,
      color: 'text-purple-600'
    }
  ];

  const marketFacts = [
    { label: 'Calendly Users Globally', value: '20M+' },
    { label: 'Fortune 500 Adoption', value: '86%' },
    { label: 'Weekly Time Savings Potential', value: '1.5hrs' },
    { label: 'Conversion Rate Increase', value: '340%' },
    { label: 'Workers Excited About AI Scheduling', value: '49%' },
    { label: 'Productivity Increase with AI', value: '20%' }
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

  // Presentation items
  const presentationItems = [
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
          <div className="max-w-2xl text-lg text-muted-foreground">
            {metric.description}
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
          <div className="max-w-2xl text-lg text-muted-foreground">
            {stat.description}
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
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-500" />
              Vision
              {!isVisionEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVisionEdit}
                  className="ml-auto h-6 w-6 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </h3>
            {isVisionEdit ? (
              <div className="space-y-2">
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
                {visionLoading ? "Loading..." : vision || "No vision statement set"}
              </p>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              Mission
              {!isMissionEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMissionEdit}
                  className="ml-auto h-6 w-6 p-0"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              )}
            </h3>
            {isMissionEdit ? (
              <div className="space-y-2">
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
                {missionLoading ? "Loading..." : mission || "No mission statement set"}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card className="glass-card">
        <CardHeader>
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
      </Card>

      {/* Market Opportunity */}
      <Card className="glass-card">
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
      </Card>

      {/* Strategic Pillars */}
      <Card className="glass-card">
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
            <div className="flex gap-2">
              {isEditMode ? (
                <>
                  <Button size="sm" variant="outline" onClick={handleCancel}>
                    <X className="h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setIsEditMode(true)}>
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
                      <>
                        <Input
                          value={pillar.title}
                          onChange={(e) => updatePillar(index, 'title', e.target.value)}
                          maxLength={25}
                          className="font-semibold"
                        />
                        <div className="text-xs text-muted-foreground">
                          {25 - pillar.title.length} characters remaining
                        </div>
                        <Textarea
                          value={pillar.description}
                          onChange={(e) => updatePillar(index, 'description', e.target.value)}
                          maxLength={100}
                          className="text-sm min-h-[80px]"
                        />
                        <div className="text-xs text-muted-foreground">
                          {100 - pillar.description.length} characters remaining
                        </div>
                      </>
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
                <div key={index}>
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
      </Card>

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