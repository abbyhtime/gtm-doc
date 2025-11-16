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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useGTMPhases } from "@/hooks/useGTMPhases";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { ClickableTile } from "@/components/ui/clickable-tile";
import { Timeline } from "@/components/ui/timeline";
import { ActivityModal } from "@/components/ui/activity-modal";
import { HtmlContent } from "@/components/ui/html-content";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

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
    deletePhase,
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
  
  const { toast } = useToast();
  const [selectedPhase, setSelectedPhase] = useState(1);
  const [editingPhase, setEditingPhase] = useState<any>(null);
  
  // Criteria and Metrics state
  const [editingCriterion, setEditingCriterion] = useState<any>(null);
  const [newCriterion, setNewCriterion] = useState({ criterion: "", status: "pending" });
  const [showAddCriterion, setShowAddCriterion] = useState(false);
  
  const [editingMetric, setEditingMetric] = useState<any>(null);
  const [newMetric, setNewMetric] = useState({ metric_name: "", target_value: "", unit: "" });
  const [showAddMetric, setShowAddMetric] = useState(false);
  
  // Modal states
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);
  const [isMetricsModalOpen, setIsMetricsModalOpen] = useState(false);

  // Parse goals as arrays
  const parseGoalsAsArray = (goals: string | undefined): string[] => {
    if (!goals) return [];
    return goals.split(/[\n,]+/).map(g => g.trim()).filter(g => g.length > 0);
  };

  const handleUpdateActivity = async (activityId: string, updates: any) => {
    try {
      await updateActivity(activityId, updates);
      toast({
        title: "Activity updated",
        description: "The activity has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update activity",
        variant: "destructive",
      });
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity(activityId);
      toast({
        title: "Activity deleted",
        description: "The activity has been deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete activity",
        variant: "destructive",
      });
    }
  };

  const handleEditPhase = (phase: any) => {
    setEditingPhase(phase);
    setIsEditModalOpen(true);
  };

  const handleSavePhase = async () => {
    if (!editingPhase || !editingPhase.id) return;
    
    try {
      await updatePhase(editingPhase.id, {
        name: editingPhase.name,
        description: editingPhase.description,
        timeline: editingPhase.timeline,
        status: editingPhase.status,
        revenue_goal: editingPhase.revenue_goal,
        users_goal: editingPhase.users_goal,
        features_goal: editingPhase.features_goal
      });
      
      setIsEditModalOpen(false);
      toast({
        title: "Phase Updated",
        description: "GTM phase has been updated successfully.",
      });
    } catch (error) {
      console.error('Error updating phase:', error);
      toast({
        title: "Error",
        description: "Failed to update phase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeletePhase = async () => {
    if (!editingPhase || !editingPhase.id) return;
    
    try {
      await deletePhase(editingPhase.id);
      setIsEditModalOpen(false);
      setEditingPhase(null);
      
      toast({
        title: "Phase Deleted",
        description: "GTM phase has been deleted successfully.",
      });
    } catch (error) {
      console.error('Error deleting phase:', error);
      toast({
        title: "Error",
        description: "Failed to delete phase. Please try again.",
        variant: "destructive",
      });
    }
  };

  const standardPhases = [
    {
      id: 'default-1',
      phase_number: 1,
      name: "Foundation Phase",
      description: "Establish core product capabilities and initial market presence",
      timeline: "Months 0-3",
      status: "in-progress",
      revenue_goal: "Initial revenue of $10K MRR",
      users_goal: "50-100 active users",
      features_goal: "Core MVP features, User authentication, Basic analytics"
    },
    {
      id: 'default-2',
      phase_number: 2,
      name: "Growth Phase",
      description: "Scale user acquisition and expand product capabilities",
      timeline: "Months 4-12",
      status: "upcoming",
      revenue_goal: "$50K MRR, Achieve product-market fit",
      users_goal: "500-1000 active users",
      features_goal: "Advanced features, Integrations, Team collaboration tools"
    },
    {
      id: 'default-3',
      phase_number: 3,
      name: "Scale Phase",
      description: "Optimize operations and accelerate market expansion",
      timeline: "Months 13-24",
      status: "upcoming",
      revenue_goal: "$200K+ MRR, Expand to new markets",
      users_goal: "5000+ active users",
      features_goal: "Enterprise features, API platform, White-label options"
    }
  ];

  const displayPhases = phases.length > 0 ? phases : standardPhases;
  const currentPhase = displayPhases.find(p => p.phase_number === selectedPhase) || displayPhases[0];
  
  const phaseActivities = activities.filter(a => a.phase_id === currentPhase?.id);
  const phaseCriteria = criteria.filter(c => c.phase_id === currentPhase?.id);
  const phaseMetrics = metrics.filter(m => m.phase_id === currentPhase?.id);

  if (loading) {
    return <div className="flex items-center justify-center p-12">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center p-12 text-destructive">Error loading phases</div>;
  }

  return (
    <div className="space-y-6">
      {/* Phase Timeline Selector */}
      <Card>
        <CardHeader>
          <CardTitle>GTM Phase Timeline</CardTitle>
          <CardDescription>Navigate through different phases of your go-to-market strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {displayPhases.map((phase) => (
              <div
                key={phase.id}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedPhase === phase.phase_number
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
                onClick={() => setSelectedPhase(phase.phase_number)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge variant="outline" className={cn("mb-2", getStatusColor(phase.status))}>
                      {getStatusIcon(phase.status)}
                      <span className="ml-1">{phase.status}</span>
                    </Badge>
                    <h3 className="font-semibold">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{phase.timeline}</p>
                  </div>
                  {phases.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditPhase(phase);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Phase Details */}
      {currentPhase && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Phase Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{currentPhase.name}</span>
                  {phases.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditPhase(currentPhase)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Phase
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>{currentPhase.timeline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <HtmlContent content={currentPhase.description} />
              </CardContent>
            </Card>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="w-5 h-5" />
                    Revenue Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {parseGoalsAsArray(currentPhase.revenue_goal).map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="w-4 h-4 mt-0.5 text-accent-success" />
                        <span className="text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5" />
                    User Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {parseGoalsAsArray(currentPhase.users_goal).map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="w-4 h-4 mt-0.5 text-accent-success" />
                        <span className="text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Activity className="w-5 h-5" />
                    Feature Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {parseGoalsAsArray(currentPhase.features_goal).map((goal, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Target className="w-4 h-4 mt-0.5 text-accent-success" />
                        <span className="text-sm">{goal}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Activity Timeline */}
            <Timeline 
              items={phaseActivities.map(activity => ({
                id: activity.id,
                title: activity.title,
                due_date: activity.due_date,
                status: activity.status,
                priority: activity.priority
              }))}
              className="mb-6"
            />

            {/* Key Activities */}
            <ClickableTile onClick={() => setShowActivityModal(true)}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Key Activities
                    </div>
                    <Badge variant="outline">
                      {phaseActivities.length} activities
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {phaseActivities.slice(0, 3).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-sm">{activity.title}</p>
                          {activity.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                              {activity.description}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                            {activity.due_date && (
                              <div className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(activity.due_date).toLocaleDateString()}
                              </div>
                            )}
                            {activity.owner && (
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {activity.owner}
                              </div>
                            )}
                          </div>
                        </div>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs ml-4", 
                            activity.status === 'completed' ? 'bg-accent-success/10 text-accent-success' :
                            activity.status === 'in-progress' ? 'bg-accent-warning/10 text-accent-warning' :
                            'bg-muted text-muted-foreground'
                          )}
                        >
                          {activity.status || 'not-started'}
                        </Badge>
                      </div>
                    ))}
                    {phaseActivities.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No activities defined for this phase</p>
                        <p className="text-sm">Click to add activities</p>
                      </div>
                    )}
                    {phaseActivities.length > 3 && (
                      <div className="text-center text-sm text-muted-foreground">
                        +{phaseActivities.length - 3} more activities...
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ClickableTile>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Exit Criteria */}
            <ClickableTile
              onClick={() => setIsCriteriaModalOpen(true)}
              className="glass-card"
            >
              <CardHeader>
                <CardTitle className="text-lg">Exit Criteria</CardTitle>
                <CardDescription>Click to view and edit criteria for advancing to next phase</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {phaseCriteria.length > 0 ? (
                  <div className="space-y-2">
                    {phaseCriteria.slice(0, 3).map((criterion) => (
                      <div key={criterion.id} className="flex items-center justify-between">
                        <p className="text-sm truncate">{criterion.criterion}</p>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs ml-2", 
                            criterion.status === 'completed' ? 'bg-accent-success/10 text-accent-success' :
                            criterion.status === 'in-progress' ? 'bg-accent-warning/10 text-accent-warning' :
                            'bg-muted text-muted-foreground'
                          )}
                        >
                          {criterion.status}
                        </Badge>
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

            {/* Key Metrics */}
            <ClickableTile
              onClick={() => setIsMetricsModalOpen(true)}
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
                  {displayPhases.map((phase) => (
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

      {/* Activity Management Modal */}
      <ActivityModal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        activities={phaseActivities}
        onAddActivity={async (activity) => {
          if (currentPhase) {
            await addActivity(currentPhase.id, {
              title: activity.title || '',
              description: activity.description || null,
              order_index: phaseActivities.length,
              due_date: activity.due_date || null,
              status: activity.status || 'not-started',
              priority: activity.priority || 'medium',
              notes: activity.notes || null,
              owner: activity.owner || null,
            });
          }
        }}
        onUpdateActivity={handleUpdateActivity}
        onDeleteActivity={handleDeleteActivity}
      />

      {/* Edit Phase Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editingPhase?.name || 'Edit Phase'}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6 py-4">
              <div>
                <label className="text-sm font-medium">Phase Name</label>
                <Input
                  value={editingPhase?.name || ''}
                  onChange={(e) => setEditingPhase({ 
                    ...editingPhase, 
                    name: e.target.value 
                  })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={editingPhase?.status || 'upcoming'}
                  onValueChange={(value) => setEditingPhase({ 
                    ...editingPhase, 
                    status: value 
                  })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Timeline</label>
                <Input
                  value={editingPhase?.timeline || ''}
                  onChange={(e) => setEditingPhase({ 
                    ...editingPhase, 
                    timeline: e.target.value 
                  })}
                  placeholder="e.g., Q1 2025 (3 months)"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <RichTextEditor
                  value={editingPhase?.description || ''}
                  onChange={(value) => setEditingPhase({ 
                    ...editingPhase, 
                    description: value || '' 
                  })}
                  height={200}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Revenue Goals</label>
                <Textarea
                  value={editingPhase?.revenue_goal || ''}
                  onChange={(e) => setEditingPhase({ 
                    ...editingPhase, 
                    revenue_goal: e.target.value 
                  })}
                  placeholder="Enter goals (one per line or comma-separated)&#10;Example:&#10;$150K ARR&#10;20% MoM growth&#10;Break even by Q3"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">User Goals</label>
                <Textarea
                  value={editingPhase?.users_goal || ''}
                  onChange={(e) => setEditingPhase({ 
                    ...editingPhase, 
                    users_goal: e.target.value 
                  })}
                  placeholder="Enter goals (one per line or comma-separated)&#10;Example:&#10;500 MAU&#10;75% activation rate&#10;30% conversion"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Feature Goals</label>
                <Textarea
                  value={editingPhase?.features_goal || ''}
                  onChange={(e) => setEditingPhase({ 
                    ...editingPhase, 
                    features_goal: e.target.value 
                  })}
                  placeholder="Enter features (one per line or comma-separated)&#10;Example:&#10;Core Scheduling Suite&#10;Calendar Integration&#10;Email Notifications"
                  className="mt-1"
                  rows={3}
                />
              </div>
            </div>
          </ScrollArea>
          <div className="flex gap-2 pt-4 border-t flex-shrink-0">
            <Button onClick={handleSavePhase} size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={displayPhases.length <= 1}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Phase
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Phase?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the phase and all associated activities, criteria, and metrics. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeletePhase} 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)} size="sm">
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Exit Criteria Dialog */}
      <Dialog open={isCriteriaModalOpen} onOpenChange={setIsCriteriaModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Exit Criteria</DialogTitle>
            <DialogDescription>
              Conditions that must be met before moving to the next phase
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {phaseCriteria.map((criterion) => (
                <div key={criterion.id} className="space-y-3">
                  {editingCriterion === criterion.id ? (
                    <div className="space-y-3">
                      <Textarea
                        value={criterion.criterion}
                        onChange={(e) => updateCriterion(criterion.id, { criterion: e.target.value })}
                        placeholder="Criterion description..."
                      />
                      <Select
                        value={criterion.status}
                        onValueChange={(value) => updateCriterion(criterion.id, { status: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
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
                    <div className="flex items-start gap-3 p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="text-sm">{criterion.criterion}</p>
                        <Badge 
                          variant="outline" 
                          className={cn("text-xs mt-2", 
                            criterion.status === 'completed' ? 'bg-accent-success/10 text-accent-success' :
                            criterion.status === 'in-progress' ? 'bg-accent-warning/10 text-accent-warning' :
                            'bg-muted text-muted-foreground'
                          )}
                        >
                          {criterion.status}
                        </Badge>
                      </div>
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
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add Criterion Form */}
              {showAddCriterion ? (
                <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 space-y-3">
                  <Textarea
                    placeholder="Criterion description..."
                    value={newCriterion.criterion}
                    onChange={(e) => setNewCriterion({ ...newCriterion, criterion: e.target.value })}
                  />
                  <Select
                    value={newCriterion.status}
                    onValueChange={(value) => setNewCriterion({ ...newCriterion, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={async () => {
                      if (currentPhase && newCriterion.criterion.trim()) {
                        await addCriterion(currentPhase.id, {
                          criterion: newCriterion.criterion,
                          status: newCriterion.status,
                          order_index: phaseCriteria.length,
                        });
                        setNewCriterion({ criterion: "", status: "pending" });
                        setShowAddCriterion(false);
                      }
                    }}>
                      <Save className="w-4 h-4 mr-1" />
                      Add Criterion
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowAddCriterion(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
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
          </ScrollArea>
        </DialogContent>
      </Dialog>

      {/* Key Metrics Dialog */}
      <Dialog open={isMetricsModalOpen} onOpenChange={setIsMetricsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col overflow-hidden">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Key Metrics</DialogTitle>
            <DialogDescription>
              Track progress and performance indicators for this phase
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-4">
              {phaseMetrics.map((metric) => (
                <div key={metric.id} className="space-y-3">
                  {editingMetric === metric.id ? (
                    <div className="space-y-3">
                      <Input
                        value={metric.metric_name}
                        onChange={(e) => updateMetric(metric.id, { metric_name: e.target.value })}
                        placeholder="Metric name..."
                      />
                      <div className="grid grid-cols-2 gap-2">
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
                      </div>
                      <Input
                        value={metric.unit || ""}
                        onChange={(e) => updateMetric(metric.id, { unit: e.target.value })}
                        placeholder="Unit (e.g., %, $, users)..."
                      />
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
                    <div className="space-y-2 p-3 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{metric.metric_name}</span>
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
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="text-primary">
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
                  )}
                </div>
              ))}
              
              {/* Add Metric Form */}
              {showAddMetric ? (
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
                      placeholder="Unit (optional)..."
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
                          current_value: null,
                          unit: newMetric.unit || null,
                          order_index: phaseMetrics.length,
                        });
                        setNewMetric({ metric_name: "", target_value: "", unit: "" });
                        setShowAddMetric(false);
                      }
                    }}>
                      <Save className="w-4 h-4 mr-1" />
                      Add Metric
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowAddMetric(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
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
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
