import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { toast } from "sonner";

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
  const { phases, activities, criteria, metrics, loading, error, updatePhase, addActivity, updateActivity, deleteActivity } = useGTMPhases();
  const [selectedPhase, setSelectedPhase] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingPhase, setEditingPhase] = useState<any>(null);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [newActivity, setNewActivity] = useState({ title: "", description: "" });
  const [showAddActivity, setShowAddActivity] = useState(false);

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

  const currentPhase = phases.find(p => p.phase_number === selectedPhase);
  const phaseActivities = activities.filter(a => a.phase_id === currentPhase?.id);
  const phaseCriteria = criteria.filter(c => c.phase_id === currentPhase?.id);
  const phaseMetrics = metrics.filter(m => m.phase_id === currentPhase?.id);

  const handleSavePhase = async () => {
    if (!editingPhase || !currentPhase) return;
    
    try {
      await updatePhase(currentPhase.id, editingPhase);
      setIsEditMode(false);
      setEditingPhase(null);
      toast.success("Phase updated successfully");
    } catch (err) {
      toast.error("Failed to update phase");
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
      toast.success("Activity added successfully");
    } catch (err) {
      toast.error("Failed to add activity");
    }
  };

  const handleUpdateActivity = async (activityId: string, updates: any) => {
    try {
      await updateActivity(activityId, updates);
      setEditingActivity(null);
      toast.success("Activity updated successfully");
    } catch (err) {
      toast.error("Failed to update activity");
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    try {
      await deleteActivity(activityId);
      toast.success("Activity deleted successfully");
    } catch (err) {
      toast.error("Failed to delete activity");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {phases.map((phase) => (
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
                      value={editingPhase.timeline}
                      onChange={(e) => setEditingPhase({ ...editingPhase, timeline: e.target.value })}
                      className="text-sm"
                    />
                  ) : (
                    <span>{currentPhase.timeline}</span>
                  )}
                </div>
                
                {isEditMode && editingPhase ? (
                  <Textarea
                    value={editingPhase.description}
                    onChange={(e) => setEditingPhase({ ...editingPhase, description: e.target.value })}
                    className="min-h-20"
                    placeholder="Phase description..."
                  />
                ) : (
                  <p className="text-muted-foreground">{currentPhase.description}</p>
                )}

                {/* Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/5">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Revenue Goal</p>
                      {isEditMode && editingPhase ? (
                        <Input
                          value={editingPhase.revenue_goal || ""}
                          onChange={(e) => setEditingPhase({ ...editingPhase, revenue_goal: e.target.value })}
                          className="font-semibold h-6 text-sm"
                        />
                      ) : (
                        <p className="font-semibold text-primary">{currentPhase.revenue_goal}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent-info/5">
                    <Users className="w-5 h-5 text-accent-info" />
                    <div>
                      <p className="text-xs text-muted-foreground">Users Goal</p>
                      {isEditMode && editingPhase ? (
                        <Input
                          value={editingPhase.users_goal || ""}
                          onChange={(e) => setEditingPhase({ ...editingPhase, users_goal: e.target.value })}
                          className="font-semibold h-6 text-sm"
                        />
                      ) : (
                        <p className="font-semibold text-accent-info">{currentPhase.users_goal}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-accent-success/5">
                    <Target className="w-5 h-5 text-accent-success" />
                    <div>
                      <p className="text-xs text-muted-foreground">Features Goal</p>
                      {isEditMode && editingPhase ? (
                        <Input
                          value={editingPhase.features_goal || ""}
                          onChange={(e) => setEditingPhase({ ...editingPhase, features_goal: e.target.value })}
                          className="font-semibold h-6 text-sm"
                        />
                      ) : (
                        <p className="font-semibold text-accent-success">{currentPhase.features_goal}</p>
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
                        <div className="space-y-2">
                          <Input
                            value={activity.title}
                            onChange={(e) => handleUpdateActivity(activity.id, { title: e.target.value })}
                            className="font-medium"
                          />
                          <Textarea
                            value={activity.description || ""}
                            onChange={(e) => handleUpdateActivity(activity.id, { description: e.target.value })}
                            className="text-sm"
                            placeholder="Activity description..."
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
                            <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
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
                  <div className="p-3 rounded-lg border-2 border-dashed border-primary/30 space-y-2">
                    <Input
                      placeholder="Activity title..."
                      value={newActivity.title}
                      onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                    />
                    <Textarea
                      placeholder="Activity description (optional)..."
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
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
            {/* Exit Criteria */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exit Criteria</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {phaseCriteria.length > 0 ? (
                  phaseCriteria.map((criterion) => (
                    <div key={criterion.id} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{criterion.criterion}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No exit criteria defined</p>
                )}
              </CardContent>
            </Card>

            {/* Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {phaseMetrics.length > 0 ? (
                  phaseMetrics.map((metric) => (
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
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No metrics defined</p>
                )}
              </CardContent>
            </Card>

            {/* Phase Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {phases.map((phase, index) => (
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
    </div>
  );
};