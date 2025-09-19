import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  Users,
  DollarSign,
  Target,
  Activity,
  Edit,
  Plus,
  Save,
  X,
  Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGTMPhases } from "@/hooks/useGTMPhases";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { DatePicker } from "@/components/ui/date-picker";
import { MultiValueInput } from "@/components/ui/multi-value-input";
import { ClickableTile } from "@/components/ui/clickable-tile";
import { ParentTileModal } from "@/components/ui/parent-tile-modal";
import { useParentTile } from "@/hooks/useParentTile";

const getStatusIcon = (status: string) => {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-accent-success" />;
    case "in-progress":
      return <Clock className="w-4 h-4 text-accent-warning" />;
    default:
      return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-accent-success/10 text-accent-success border-accent-success/20";
    case "in-progress":
      return "bg-accent-warning/10 text-accent-warning border-accent-warning/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export const GTMPhasesEditable = () => {
  const { 
    phases, 
    activities, 
    criteria, 
    metrics, 
    loading, 
    error, 
    updatePhase, 
    addActivity, 
    updateActivity, 
    deleteActivity,
    addCriterion,
    updateCriterion,
    deleteCriterion,
    addMetric,
    updateMetric,
    deleteMetric
  } = useGTMPhases();
  const { toast } = useToast();
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPhase, setEditingPhase] = useState<any>(null);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [newActivity, setNewActivity] = useState({ title: "", description: "" });
  const [showAddActivity, setShowAddActivity] = useState(false);
  
  // Criteria and Metrics state
  const [editingCriterion, setEditingCriterion] = useState<any>(null);
  const [newCriterion, setNewCriterion] = useState({ criterion: "", status: "upcoming" });
  const [showAddCriterion, setShowAddCriterion] = useState(false);
  
  const [editingMetric, setEditingMetric] = useState<any>(null);
  const [newMetric, setNewMetric] = useState({ metric_name: "", target_value: "", unit: "" });
  const [showAddMetric, setShowAddMetric] = useState(false);
  
  // Parent tile functionality
  const [currentParentIndex, setCurrentParentIndex] = useState(0);
  const { 
    isParentOpen, 
    parentItem, 
    openParentTile, 
    closeParentTile 
  } = useParentTile();
  
  // Parse goals as arrays
  const parseGoalsAsArray = (goals: string | undefined): string[] => {
    if (!goals) return [];
    return goals.split(',').map(g => g.trim()).filter(g => g.length > 0);
  };
  
  const formatGoalsAsString = (goals: string[]): string => {
    return goals.join(', ');
  };

  // Standard GTM Phase data aligned with industry framework
  const standardPhases = [
    {
      id: 'mission',
      phase_number: 1,
      name: 'Mission (MVP Launch)',
      timeline: 'Q1 2025 (3 months)',
      description: 'Validate product-market fit with core features and initial customer segment',
      status: 'in-progress',
      revenue_goal: '$150K ARR',
      users_goal: '500 MAU',
      features_goal: 'Core Scheduling Suite',
      source: 'SaaS GTM Framework by Jason Lemkin'
    },
    {
      id: 'wild',
      phase_number: 2,
      name: 'Wild (Growth Phase)',
      timeline: 'Q2-Q3 2025 (6 months)',
      description: 'Scale proven features, expand market reach, and achieve predictable growth',
      status: 'upcoming',
      revenue_goal: '$1.15M ARR',
      users_goal: '8K MAU',
      features_goal: 'AI Assistant + Analytics',
      source: 'SaaS GTM Framework by Jason Lemkin'
    },
    {
      id: 'scale',
      phase_number: 3,
      name: 'Scale (Market Expansion)',
      timeline: 'Q4 2025 - Q2 2026 (9 months)',
      description: 'Enter adjacent markets, build enterprise features, establish market leadership',
      status: 'upcoming',
      revenue_goal: '$5M ARR',
      users_goal: '25K MAU',
      features_goal: 'Enterprise Suite + Integrations',
      source: 'SaaS GTM Framework by Jason Lemkin'
    },
    {
      id: 'north',
      phase_number: 4,
      name: 'North (Market Leadership)',
      timeline: '2026+ (12+ months)',
      description: 'Achieve market dominance, expand internationally, build platform ecosystem',
      status: 'upcoming',
      revenue_goal: '$25M ARR',
      users_goal: '100K MAU',
      features_goal: 'Platform Ecosystem + Global',
      source: 'SaaS GTM Framework by Jason Lemkin'
    }
  ];

  if (loading) {
    return (
      <Card className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/3"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8">
        <div className="text-center text-accent-danger">
          <AlertCircle className="w-8 h-8 mx-auto mb-2" />
          <p>Error loading GTM phases: {error}</p>
        </div>
      </Card>
    );
  }

  const currentPhase = phases.length > 0 ? phases.find(p => p.phase_number === selectedPhase) : standardPhases.find(p => p.phase_number === selectedPhase);
  const phaseActivities = activities.filter(a => a.phase_id === currentPhase?.id);
  const phaseCriteria = criteria.filter(c => c.phase_id === currentPhase?.id);
  const phaseMetrics = metrics.filter(m => m.phase_id === currentPhase?.id);

  // Use database phases if available, otherwise use standard phases
  const displayPhases = phases.length > 0 ? phases : standardPhases;

  const handleSavePhase = async () => {
    if (!editingPhase || !currentPhase) return;
    
    try {
      await updatePhase(currentPhase.id, editingPhase);
      setIsEditMode(false);
      setEditingPhase(null);
      toast({ title: "Success", description: "Phase updated successfully" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to update phase", variant: "destructive" });
    }
  };

  const handleAddActivity = async () => {
    if (!currentPhase || !newActivity.title.trim()) return;
    
    try {
      await addActivity(currentPhase.id, {
        title: newActivity.title,
        description: newActivity.description,
        order_index: phaseActivities.length,
      });
      setNewActivity({ title: "", description: "" });
      setShowAddActivity(false);
      toast({ title: "Success", description: "Activity added successfully" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to add activity", variant: "destructive" });
    }
  };

  const handleUpdateActivity = async (activityId: string, updates: any) => {
    try {
      await updateActivity(activityId, updates);
      setEditingActivity(null);
      toast({ title: "Success", description: "Activity updated successfully" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to update activity", variant: "destructive" });
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity(activityId);
      toast({ title: "Success", description: "Activity deleted successfully" });
    } catch (err) {
      toast({ title: "Error", description: "Failed to delete activity", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with Edit Mode Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">GTM Phases</h2>
          <p className="text-muted-foreground mt-2">
            Track progress through key go-to-market milestones
          </p>
        </div>
        <Button
          variant={isEditMode ? "destructive" : "outline"}
          onClick={() => {
            setIsEditMode(!isEditMode);
            if (!isEditMode && currentPhase) {
              setEditingPhase({ ...currentPhase });
            } else {
              setEditingPhase(null);
            }
          }}
          className="flex items-center gap-2"
        >
          {isEditMode ? (
            <>
              <X className="w-4 h-4" />
              Cancel Edit
            </>
          ) : (
            <>
              <Edit className="w-4 h-4" />
              Edit Report
            </>
          )}
        </Button>
      </div>

      {/* Phase Selection Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayPhases.map((phase) => (
          <Card
            key={phase.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
              selectedPhase === phase.phase_number 
                ? "ring-2 ring-primary shadow-glow" 
                : ""
            }`}
            onClick={() => {
              setSelectedPhase(phase.phase_number);
              if (isEditMode) {
                setEditingPhase({ ...phase });
              }
            }}
          >
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center">
                  {getStatusIcon(phase.status)}
                </div>
                <Badge className={getStatusColor(phase.status)}>
                  Phase {phase.phase_number}
                </Badge>
                <h3 className="font-semibold text-sm">{phase.name}</h3>
                <p className="text-xs text-muted-foreground">{phase.timeline}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {currentPhase && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phase Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {getStatusIcon(currentPhase.status)}
                  {isEditMode && editingPhase ? (
                    <Input
                      value={editingPhase.name}
                      onChange={(e) => setEditingPhase({ ...editingPhase, name: e.target.value })}
                      className="font-semibold"
                    />
                  ) : (
                    <span>{currentPhase.name}</span>
                  )}
                  <Badge className={getStatusColor(currentPhase.status)}>
                    {isEditMode && editingPhase ? (
                      <Select
                        value={editingPhase.status}
                        onValueChange={(value) => setEditingPhase({ ...editingPhase, status: value })}
                      >
                        <SelectTrigger className="w-32 h-6 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      currentPhase.status
                    )}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {isEditMode && editingPhase ? (
                      <Input
                        value={editingPhase.timeline || ''}
                        onChange={(e) => 
                          setEditingPhase({ 
                            ...editingPhase, 
                            timeline: e.target.value 
                          })
                        }
                        placeholder="e.g., Q1 2025 (3 months)"
                        className="text-sm"
                      />
                    ) : (
                      <span>{currentPhase.timeline}</span>
                    )}
                  </div>
                
                {isEditMode && editingPhase ? (
                  <RichTextEditor
                    value={editingPhase.description}
                    onChange={(value) => setEditingPhase({ ...editingPhase, description: value || "" })}
                    height={150}
                  />
                ) : (
                  <div 
                    className="text-muted-foreground prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentPhase.description }}
                  />
                )}

                {/* Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
                    <DollarSign className="w-5 h-5 text-primary mt-1" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">Revenue Goals</p>
                      {isEditMode && editingPhase ? (
                        <MultiValueInput
                          values={parseGoalsAsArray(editingPhase.revenue_goal)}
                          onChange={(values) => 
                            setEditingPhase({ 
                              ...editingPhase, 
                              revenue_goal: formatGoalsAsString(values) 
                            })
                          }
                          placeholder="Add revenue goal..."
                          maxValues={5}
                        />
                      ) : (
                        <div className="space-y-1">
                          {parseGoalsAsArray(currentPhase?.revenue_goal).map((goal, index) => (
                            <p key={index} className="font-medium text-primary text-sm">• {goal}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-accent-info/5">
                    <Users className="w-5 h-5 text-accent-info mt-1" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">User Goals</p>
                      {isEditMode && editingPhase ? (
                        <MultiValueInput
                          values={parseGoalsAsArray(editingPhase.users_goal)}
                          onChange={(values) => 
                            setEditingPhase({ 
                              ...editingPhase, 
                              users_goal: formatGoalsAsString(values) 
                            })
                          }
                          placeholder="Add user goal..."
                          maxValues={5}
                        />
                      ) : (
                        <div className="space-y-1">
                          {parseGoalsAsArray(currentPhase?.users_goal).map((goal, index) => (
                            <p key={index} className="font-medium text-accent-info text-sm">• {goal}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-accent-success/5">
                    <Target className="w-5 h-5 text-accent-success mt-1" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">Feature Goals</p>
                      {isEditMode && editingPhase ? (
                        <MultiValueInput
                          values={parseGoalsAsArray(editingPhase.features_goal)}
                          onChange={(values) => 
                            setEditingPhase({ 
                              ...editingPhase, 
                              features_goal: formatGoalsAsString(values) 
                            })
                          }
                          placeholder="Add feature goal..."
                          maxValues={5}
                        />
                      ) : (
                        <div className="space-y-1">
                          {parseGoalsAsArray(currentPhase?.features_goal).map((goal, index) => (
                            <p key={index} className="font-medium text-accent-success text-sm">• {goal}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Save Button for Phase */}
                {isEditMode && editingPhase && (
                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSavePhase} size="sm">
                      <Save className="w-4 h-4 mr-2" />
                      Save Phase
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Key Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Key Activities
                  </div>
                  {isEditMode && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowAddActivity(true)}
                    >
                      <Plus className="w-4 h-4 mr-1" />
                      Add Activity
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {phaseActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4 text-accent-success mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      {editingActivity === activity.id ? (
                        <div className="space-y-3">
                          <Input
                            value={activity.title}
                            onChange={(e) => handleUpdateActivity(activity.id, { title: e.target.value })}
                            className="font-medium"
                            placeholder="Activity title..."
                          />
                          <RichTextEditor
                            value={activity.description || ""}
                            onChange={(value) => handleUpdateActivity(activity.id, { description: value || "" })}
                            height={120}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => setEditingActivity(null)}>
                              <Save className="w-4 h-4 mr-1" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setEditingActivity(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <h4 className="font-medium">{activity.title}</h4>
                          {activity.description && (
                            <div 
                              className="text-sm text-muted-foreground mt-1 prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: activity.description }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                    {isEditMode && editingActivity !== activity.id && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingActivity(activity.id)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteActivity(activity.id)}
                        >
                          <Trash2 className="w-4 h-4 text-accent-danger" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Activity Form */}
                {showAddActivity && (
                  <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 space-y-3">
                    <Input
                      placeholder="Activity title..."
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    />
                    <RichTextEditor
                      value={newActivity.description}
                      onChange={(value) => setNewActivity({ ...newActivity, description: value || "" })}
                      height={120}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleAddActivity}>
                        <Plus className="w-4 h-4 mr-1" />
                        Add
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowAddActivity(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Phase Progress & Metrics */}
          <div className="space-y-6">
            {/* Exit Criteria - Clickable Parent Tile */}
            <ClickableTile 
              onClick={() => {
                setCurrentParentIndex(0);
                openParentTile({
                  id: `gtm-phases-exit-criteria-${selectedPhase}`,
                  title: `Exit Criteria - ${currentPhase?.name}`,
                  description: 'Conditions that must be met before advancing to the next phase',
                  content: (
                    <div className="space-y-6">
                      {phaseCriteria.length > 0 ? (
                        <div className="space-y-4">
                          {phaseCriteria.map((criterion) => (
                            <ClickableTile 
                              key={criterion.id}
                              className="p-4"
                              hoverScale={false}
                            >
                              <div className="flex items-start gap-3">
                                {editingCriterion === criterion.id ? (
                                  <div className="flex-1 space-y-3">
                                    <RichTextEditor
                                      value={criterion.criterion}
                                      onChange={(value) => updateCriterion(criterion.id, { criterion: value || "" })}
                                      height={120}
                                    />
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => setEditingCriterion(null)}>
                                        <Save className="w-4 h-4 mr-1" />
                                        Save
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => setEditingCriterion(null)}>
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <CheckCircle className="w-4 h-4 text-accent-success mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                      <div 
                                        className="text-sm prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: criterion.criterion }}
                                      />
                                    </div>
                                    {isEditMode && (
                                      <div className="flex gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => setEditingCriterion(criterion.id)}
                                        >
                                          <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => deleteCriterion(criterion.id)}
                                        >
                                          <Trash2 className="w-4 h-4 text-accent-danger" />
                                        </Button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>
                            </ClickableTile>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">No exit criteria defined for this phase</p>
                      )}
                      
                      {/* Add Criterion Form */}
                      {showAddCriterion && (
                        <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 space-y-3">
                          <RichTextEditor
                            value={newCriterion.criterion}
                            onChange={(value) => setNewCriterion({ ...newCriterion, criterion: value || "" })}
                            height={120}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={async () => {
                              if (currentPhase && newCriterion.criterion.trim()) {
                                await addCriterion(currentPhase.id, {
                                  criterion: newCriterion.criterion,
                                  status: newCriterion.status,
                                  order_index: phaseCriteria.length
                                });
                                setNewCriterion({ criterion: "", status: "upcoming" });
                                setShowAddCriterion(false);
                              }
                            }}>
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowAddCriterion(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {isEditMode && (
                        <div className="text-center">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddCriterion(true)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Exit Criterion
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                });
              }}
              className="glass-card"
            >
              <CardHeader>
                <CardTitle className="text-lg">Exit Criteria</CardTitle>
                <CardDescription>Click to view and edit exit criteria for this phase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {phaseCriteria.length > 0 ? (
                  <div className="space-y-2">
                    {phaseCriteria.slice(0, 3).map((criterion) => (
                      <div key={criterion.id} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{criterion.criterion.substring(0, 60)}...</span>
                      </div>
                    ))}
                    {phaseCriteria.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{phaseCriteria.length - 3} more criteria
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No exit criteria defined</p>
                )}
              </CardContent>
            </ClickableTile>

            {/* Key Metrics - Clickable Parent Tile */}
            <ClickableTile 
              onClick={() => {
                setCurrentParentIndex(1);
                openParentTile({
                  id: `gtm-phases-key-metrics-${selectedPhase}`,
                  title: `Key Metrics - ${currentPhase?.name}`,
                  description: 'Performance indicators to track for this phase',
                  content: (
                    <div className="space-y-6">
                      {phaseMetrics.length > 0 ? (
                        <div className="space-y-4">
                          {phaseMetrics.map((metric) => (
                            <ClickableTile 
                              key={metric.id}
                              className="p-4"
                              hoverScale={false}
                            >
                              <div className="space-y-3">
                                {editingMetric === metric.id ? (
                                  <div className="space-y-3">
                                    <Input
                                      value={metric.metric_name}
                                      onChange={(e) => updateMetric(metric.id, { metric_name: e.target.value })}
                                      placeholder="Metric name..."
                                    />
                                    <div className="grid grid-cols-3 gap-2">
                                      <Input
                                        value={metric.target_value}
                                        onChange={(e) => updateMetric(metric.id, { target_value: e.target.value })}
                                        placeholder="Target value..."
                                      />
                                      <Input
                                        value={metric.current_value || ""}
                                        onChange={(e) => updateMetric(metric.id, { current_value: e.target.value })}
                                        placeholder="Current value..."
                                      />
                                      <Input
                                        value={metric.unit || ""}
                                        onChange={(e) => updateMetric(metric.id, { unit: e.target.value })}
                                        placeholder="Unit (e.g., %, $, users)..."
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <Button size="sm" onClick={() => setEditingMetric(null)}>
                                        <Save className="w-4 h-4 mr-1" />
                                        Save
                                      </Button>
                                      <Button variant="outline" size="sm" onClick={() => setEditingMetric(null)}>
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <div className="flex items-center justify-between">
                                      <span className="text-sm font-medium">{metric.metric_name}</span>
                                      <div className="flex items-center gap-2">
                                        <span className="text-sm text-primary">
                                          {metric.current_value || "0"} / {metric.target_value} {metric.unit}
                                        </span>
                                        {isEditMode && (
                                          <div className="flex gap-1">
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => setEditingMetric(metric.id)}
                                            >
                                              <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              onClick={() => deleteMetric(metric.id)}
                                            >
                                              <Trash2 className="w-4 h-4 text-accent-danger" />
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    <Progress 
                                      value={
                                        metric.current_value 
                                          ? (parseInt(metric.current_value) / parseInt(metric.target_value)) * 100
                                          : 0
                                      } 
                                      className="h-2" 
                                    />
                                  </>
                                )}
                              </div>
                            </ClickableTile>
                          ))}
                        </div>
                      ) : (
                        <p className="text-center text-muted-foreground py-8">No metrics defined for this phase</p>
                      )}
                      
                      {/* Add Metric Form */}
                      {showAddMetric && (
                        <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 space-y-3">
                          <Input
                            placeholder="Metric name..."
                            value={newMetric.metric_name}
                            onChange={(e) => setNewMetric({ ...newMetric, metric_name: e.target.value })}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Target value..."
                              value={newMetric.target_value}
                              onChange={(e) => setNewMetric({ ...newMetric, target_value: e.target.value })}
                            />
                            <Input
                              placeholder="Unit (e.g., %, $, users)..."
                              value={newMetric.unit}
                              onChange={(e) => setNewMetric({ ...newMetric, unit: e.target.value })}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" onClick={async () => {
                              if (currentPhase && newMetric.metric_name.trim() && newMetric.target_value.trim()) {
                                await addMetric(currentPhase.id, {
                                  metric_name: newMetric.metric_name,
                                  target_value: newMetric.target_value,
                                  unit: newMetric.unit,
                                  current_value: "0",
                                  order_index: phaseMetrics.length
                                });
                                setNewMetric({ metric_name: "", target_value: "", unit: "" });
                                setShowAddMetric(false);
                              }
                            }}>
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowAddMetric(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}
                      
                      {isEditMode && (
                        <div className="text-center">
                          <Button
                            variant="outline"
                            onClick={() => setShowAddMetric(true)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Key Metric
                          </Button>
                        </div>
                      )}
                    </div>
                  )
                });
              }}
              className="glass-card"
            >
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
                <CardDescription>Click to view and edit key metrics for this phase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {phaseMetrics.length > 0 ? (
                  <div className="space-y-3">
                    {phaseMetrics.slice(0, 3).map((metric) => (
                      <div key={metric.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{metric.metric_name}</span>
                          <span className="text-sm text-primary">
                            {metric.current_value || "0"} / {metric.target_value} {metric.unit}
                          </span>
                        </div>
                        <Progress 
                          value={
                            metric.current_value 
                              ? (parseInt(metric.current_value) / parseInt(metric.target_value)) * 100
                              : 0
                          } 
                          className="h-2" 
                        />
                      </div>
                    ))}
                    {phaseMetrics.length > 3 && (
                      <div className="text-xs text-muted-foreground">
                        +{phaseMetrics.length - 3} more metrics
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No metrics defined</p>
                )}
              </CardContent>
            </ClickableTile>

            {/* Phase Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline Overview</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Source: SaaS GTM Framework by Jason Lemkin - Point Nine Capital
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {displayPhases.map((phase, index) => (
                    <div key={phase.id} className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        phase.status === 'completed' 
                          ? 'bg-accent-success' 
                          : phase.status === 'in-progress'
                          ? 'bg-accent-warning'
                          : 'bg-muted'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{phase.name}</p>
                        <p className="text-xs text-muted-foreground">{phase.timeline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Parent Tile Modal for Exit Criteria and Key Metrics */}
      <ParentTileModal
        isOpen={isParentOpen}
        onClose={closeParentTile}
        title={parentItem?.title || ""}
        description={parentItem?.description}
      >
        {parentItem?.content}
      </ParentTileModal>
    </div>
  );
};