import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClickableTile } from "@/components/ui/clickable-tile";
import { ParentTileModal } from "@/components/ui/parent-tile-modal";
import { PhaseTimeline, ActivityTimeline } from "@/components/ui/timeline";
import { ActivityDetailModal } from "@/components/ui/activity-detail-modal";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { DatePicker } from "@/components/ui/date-picker";
import { useGTMPhases, GTMPhase, GTMPhaseActivity, GTMPhaseCriteria, GTMPhaseMetric } from "@/hooks/useGTMPhases";
import { useParentTile } from "@/hooks/useParentTile";
import { usePresentation } from "@/hooks/usePresentation";
import { PresentationModal } from "@/components/ui/presentation-modal";
import { toast } from "@/hooks/use-toast";
import { 
  CheckCircle, Clock, AlertCircle, Calendar, Target, Users, 
  DollarSign, Settings, Play, Pause, Plus, Edit3, Save, X,
  Activity, ChevronRight, User, FileText, Trash2, TrendingUp
} from "lucide-react";

// Helper functions
const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed': return CheckCircle;
    case 'in-progress': return Play;
    case 'blocked': return AlertCircle;
    case 'paused': return Pause;
    default: return Clock;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/20 text-green-700 border-green-200';
    case 'in-progress':
    case 'current':
      return 'bg-blue-500/20 text-blue-700 border-blue-200';
    case 'blocked':
      return 'bg-red-500/20 text-red-700 border-red-200';
    case 'paused':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-200';
    case 'upcoming':
    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-200';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'bg-red-600/20 text-red-800 border-red-300';
    case 'high':
      return 'bg-orange-500/20 text-orange-800 border-orange-300';
    case 'medium':
      return 'bg-yellow-500/20 text-yellow-800 border-yellow-300';
    case 'low':
    default:
      return 'bg-green-500/20 text-green-800 border-green-300';
  }
};

// Standard phases (removed Phase 4)
const standardPhases = [
  {
    phase_number: 1,
    name: "Foundation & Market Research",
    timeline: "Months 1-2",
    description: "Build foundational understanding of market, competitors, and target audience through comprehensive research and analysis.",
    status: "upcoming",
    revenue_goal: "$0 - Focus on learning",
    users_goal: "100 survey responses",
    features_goal: "MVP specification"
  },
  {
    phase_number: 2,
    name: "Product Development & Testing",
    timeline: "Months 3-6",
    description: "Develop MVP, conduct user testing, and iterate based on feedback to ensure product-market fit.",
    status: "upcoming",
    revenue_goal: "$10K MRR",
    users_goal: "500 beta users",
    features_goal: "Core features + feedback system"
  },
  {
    phase_number: 3,
    name: "Launch & Scale",
    timeline: "Months 7-12",
    description: "Execute go-to-market strategy, acquire customers, and scale operations for sustainable growth.",
    status: "upcoming",
    revenue_goal: "$100K MRR",
    users_goal: "5,000 active users",
    features_goal: "Full feature set + analytics"
  }
];

interface EditableTileProps {
  title: string;
  value: string | null;
  onSave: (value: string) => void;
  icon?: React.ComponentType<any>;
  placeholder?: string;
  multiline?: boolean;
}

const EditableTile: React.FC<EditableTileProps> = ({ 
  title, 
  value, 
  onSave, 
  icon: Icon, 
  placeholder, 
  multiline = false 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editValue);
      setIsEditing(false);
      toast({ title: "Success", description: `${title} updated successfully` });
    } catch (error) {
      toast({ title: "Error", description: `Failed to update ${title}`, variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value || '');
    setIsEditing(false);
  };

  return (
    <ClickableTile
      onClick={() => !isEditing && setIsEditing(true)}
      className="h-full transition-all duration-200"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          <span className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4" />}
            {title}
          </span>
          {!isEditing && <Edit3 className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-3">
            {multiline ? (
              <Textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
                rows={3}
              />
            ) : (
              <Input
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                placeholder={placeholder}
              />
            )}
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={isSaving}>
                <Save className="h-3 w-3 mr-1" />
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {value || <span className="italic">Click to add {title.toLowerCase()}</span>}
          </p>
        )}
      </CardContent>
    </ClickableTile>
  );
};

export default function GTMPhasesEditable() {
  const {
    phases,
    activities,
    criteria,
    metrics,
    loading,
    error,
    addPhase,
    updatePhase,
    addActivity,
    updateActivity,
    deleteActivity,
    addCriterion,
    updateCriterion,
    deleteCriterion,
    addMetric,
    updateMetric,
    deleteMetric,
  } = useGTMPhases();

  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);
  const [isEditingTimeline, setIsEditingTimeline] = useState(false);
  const [editedTimeline, setEditedTimeline] = useState('');
  const [selectedActivity, setSelectedActivity] = useState<GTMPhaseActivity | null>(null);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [isActivityEditing, setIsActivityEditing] = useState(false);
  const [isAddingPhase, setIsAddingPhase] = useState(false);
  const [newPhaseData, setNewPhaseData] = useState({
    name: '',
    timeline: '',
    description: ''
  });

  const { isParentOpen, parentItem, openParentTile, closeParentTile } = useParentTile();

  // Use database phases or fallback to standard phases
  const allPhases = phases.length > 0 ? phases : standardPhases.map((phase, index) => ({
    ...phase,
    id: `standard-${index}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  const currentPhase = allPhases.find(p => p.id === selectedPhaseId) || allPhases[0];
  
  // Filter data for current phase
  const phaseActivities = activities.filter(a => a.phase_id === currentPhase?.id);
  const phaseCriteria = criteria.filter(c => c.phase_id === currentPhase?.id);
  const phaseMetrics = metrics.filter(m => m.phase_id === currentPhase?.id);

  useEffect(() => {
    if (allPhases.length > 0 && !selectedPhaseId) {
      setSelectedPhaseId(allPhases[0].id);
    }
  }, [allPhases, selectedPhaseId]);

  const handleAddPhase = async () => {
    if (!newPhaseData.name.trim()) return;

    try {
      const nextPhaseNumber = allPhases.length + 1;
      await addPhase({
        phase_number: nextPhaseNumber,
        name: newPhaseData.name,
        timeline: newPhaseData.timeline,
        description: newPhaseData.description,
        status: 'upcoming',
        revenue_goal: null,
        users_goal: null,
        features_goal: null
      });
      
      setIsAddingPhase(false);
      setNewPhaseData({ name: '', timeline: '', description: '' });
      toast({ title: "Success", description: "New phase added successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add new phase", variant: "destructive" });
    }
  };

  const handleUpdatePhaseField = async (field: keyof GTMPhase, value: string) => {
    if (!currentPhase) return;
    await updatePhase(currentPhase.id, { [field]: value });
  };

  const handleSaveTimeline = async () => {
    if (!currentPhase) return;
    
    try {
      await updatePhase(currentPhase.id, { timeline: editedTimeline });
      setIsEditingTimeline(false);
      toast({ title: "Success", description: "Timeline updated successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update timeline", variant: "destructive" });
    }
  };

  const handleAddActivity = async () => {
    if (!currentPhase) return;

    try {
      await addActivity(currentPhase.id, {
        title: "New Activity",
        description: null,
        order_index: phaseActivities.length,
        due_date: null,
        owner: null,
        status: 'not-started',
        priority: 'medium',
        notes: null
      });
      toast({ title: "Success", description: "Activity added successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add activity", variant: "destructive" });
    }
  };

  const handleActivityClick = (activity: GTMPhaseActivity) => {
    setSelectedActivity(activity);
    setIsActivityModalOpen(true);
    setIsActivityEditing(false);
  };

  const handleActivitySave = async (updates: Partial<GTMPhaseActivity>) => {
    if (!selectedActivity) return;
    await updateActivity(selectedActivity.id, updates);
  };

  const handleActivityDelete = async (activityId: string) => {
    await deleteActivity(activityId);
    setIsActivityModalOpen(false);
    setSelectedActivity(null);
  };

  const openActivitiesModal = () => {
    if (!currentPhase) return;

    const activitiesContent = (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Key Activities</h3>
          <Button size="sm" onClick={handleAddActivity}>
            <Plus className="h-4 w-4 mr-2" />
            Add Activity
          </Button>
        </div>
        
        {phaseActivities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No activities yet. Click "Add Activity" to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {phaseActivities.map((activity) => (
              <ClickableTile
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{activity.title}</h5>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(activity.priority)}>
                          {activity.priority}
                        </Badge>
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {activity.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {activity.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {activity.due_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(activity.due_date).toLocaleDateString()}
                        </div>
                      )}
                      {activity.owner && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {activity.owner}
                        </div>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </ClickableTile>
            ))}
          </div>
        )}
      </div>
    );

    openParentTile({
      id: 'activities',
      title: `${currentPhase.name} - Key Activities`,
      description: `Manage activities for ${currentPhase.name}`,
      content: activitiesContent
    });
  };

  const openCriteriaModal = () => {
    const criteriaContent = (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Exit Criteria</h3>
          <Button 
            size="sm" 
            onClick={() => currentPhase && addCriterion(currentPhase.id, {
              criterion: "New criterion",
              status: 'pending',
              order_index: phaseCriteria.length
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Criterion
          </Button>
        </div>
        
        {phaseCriteria.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No exit criteria defined yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {phaseCriteria.map((criterion) => (
              <div key={criterion.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <p className="flex-1">{criterion.criterion}</p>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(criterion.status)}>
                    {criterion.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteCriterion(criterion.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    openParentTile({
      id: 'criteria',
      title: `${currentPhase?.name} - Exit Criteria`,
      description: `Exit criteria for ${currentPhase?.name}`,
      content: criteriaContent
    });
  };

  const openMetricsModal = () => {
    const metricsContent = (
      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Key Metrics</h3>
          <Button 
            size="sm" 
            onClick={() => currentPhase && addMetric(currentPhase.id, {
              metric_name: "New Metric",
              target_value: "0",
              current_value: null,
              unit: null,
              order_index: phaseMetrics.length
            })}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Metric
          </Button>
        </div>
        
        {phaseMetrics.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No metrics defined yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {phaseMetrics.map((metric) => (
              <div key={metric.id} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium">{metric.metric_name}</h5>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteMetric(metric.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Target:</span>
                    <p>{metric.target_value} {metric.unit}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Current:</span>
                    <p>{metric.current_value || 'Not set'} {metric.unit}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    openParentTile({
      id: 'metrics',
      title: `${currentPhase?.name} - Key Metrics`,
      description: `Key metrics for ${currentPhase?.name}`,
      content: metricsContent
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading GTM phases: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Phase Timeline */}
      <PhaseTimeline 
        phases={allPhases}
        onPhaseClick={(phase) => setSelectedPhaseId(phase.id)}
      />

      {/* Phase Selection */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4">
        {allPhases.map((phase) => {
          const StatusIcon = getStatusIcon(phase.status);
          return (
            <Card
              key={phase.id}
              className={`cursor-pointer transition-all duration-200 flex-shrink-0 ${
                selectedPhaseId === phase.id
                  ? 'ring-2 ring-primary shadow-lg'
                  : 'hover:shadow-md'
              }`}
              onClick={() => setSelectedPhaseId(phase.id)}
            >
              <CardContent className="p-4 min-w-[200px]">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    Phase {phase.phase_number}
                  </Badge>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-sm mb-1">{phase.name}</h3>
                <p className="text-xs text-muted-foreground">{phase.timeline}</p>
              </CardContent>
            </Card>
          );
        })}
        
        {/* Add Phase Button */}
        <Card className="cursor-pointer transition-all duration-200 flex-shrink-0 hover:shadow-md border-dashed">
          <CardContent className="p-4 min-w-[200px]">
            {isAddingPhase ? (
              <div className="space-y-3">
                <Input
                  placeholder="Phase name"
                  value={newPhaseData.name}
                  onChange={(e) => setNewPhaseData(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Timeline"
                  value={newPhaseData.timeline}
                  onChange={(e) => setNewPhaseData(prev => ({ ...prev, timeline: e.target.value }))}
                />
                <Textarea
                  placeholder="Description"
                  value={newPhaseData.description}
                  onChange={(e) => setNewPhaseData(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleAddPhase}>
                    <Save className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setIsAddingPhase(false)}>
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="flex flex-col items-center justify-center h-full text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsAddingPhase(true)}
              >
                <Plus className="h-8 w-8 mb-2" />
                <span className="text-sm font-medium">Add Phase</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {currentPhase && (
        <>
          {/* Current Phase Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Phase {currentPhase.phase_number}: {currentPhase.name}
                    <Badge className={getStatusColor(currentPhase.status)}>
                      {currentPhase.status}
                    </Badge>
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">{currentPhase.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Timeline */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">Timeline:</span>
                  </div>
                  {isEditingTimeline ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={editedTimeline}
                        onChange={(e) => setEditedTimeline(e.target.value)}
                        placeholder="Enter timeline"
                        className="w-48"
                      />
                      <Button size="sm" onClick={handleSaveTimeline}>
                        <Save className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditingTimeline(false)}>
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div 
                      className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 px-2 py-1 rounded"
                      onClick={() => {
                        setEditedTimeline(currentPhase.timeline);
                        setIsEditingTimeline(true);
                      }}
                    >
                      <span>{currentPhase.timeline}</span>
                      <Edit3 className="h-3 w-3 opacity-50" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Timeline */}
          <ActivityTimeline 
            activities={phaseActivities}
            onActivityClick={handleActivityClick}
          />

          {/* Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EditableTile
              title="Revenue Goal"
              value={currentPhase.revenue_goal}
              onSave={(value) => handleUpdatePhaseField('revenue_goal', value)}
              icon={DollarSign}
              placeholder="e.g., $10K MRR"
            />
            <EditableTile
              title="User Goal"
              value={currentPhase.users_goal}
              onSave={(value) => handleUpdatePhaseField('users_goal', value)}
              icon={Users}
              placeholder="e.g., 1000 users"
            />
            <EditableTile
              title="Feature Goal"
              value={currentPhase.features_goal}
              onSave={(value) => handleUpdatePhaseField('features_goal', value)}
              icon={Settings}
              placeholder="e.g., MVP features"
            />
          </div>

          {/* Key Activities, Exit Criteria, Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ClickableTile onClick={openActivitiesModal}>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Key Activities
                  <Badge variant="outline">{phaseActivities.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {phaseActivities.length > 0 
                    ? `${phaseActivities.length} activities planned` 
                    : "Click to add activities"
                  }
                </p>
              </CardContent>
            </ClickableTile>

            <ClickableTile onClick={openCriteriaModal}>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Exit Criteria
                  <Badge variant="outline">{phaseCriteria.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {phaseCriteria.length > 0 
                    ? `${phaseCriteria.length} criteria defined` 
                    : "Click to add criteria"
                  }
                </p>
              </CardContent>
            </ClickableTile>

            <ClickableTile onClick={openMetricsModal}>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Key Metrics
                  <Badge variant="outline">{phaseMetrics.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {phaseMetrics.length > 0 
                    ? `${phaseMetrics.length} metrics tracked` 
                    : "Click to add metrics"
                  }
                </p>
              </CardContent>
            </ClickableTile>
          </div>
        </>
      )}

      {/* Modals */}
      <ParentTileModal
        isOpen={isParentOpen}
        onClose={closeParentTile}
        title={parentItem?.title || ''}
        description={parentItem?.description}
      >
        {parentItem?.content}
      </ParentTileModal>

      <ActivityDetailModal
        activity={selectedActivity}
        isOpen={isActivityModalOpen}
        onClose={() => {
          setIsActivityModalOpen(false);
          setSelectedActivity(null);
          setIsActivityEditing(false);
        }}
        onSave={handleActivitySave}
        onDelete={handleActivityDelete}
        isEditing={isActivityEditing}
        onEditToggle={() => setIsActivityEditing(!isActivityEditing)}
      />
    </div>
  );
}