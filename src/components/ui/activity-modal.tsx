import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Edit, Save, X, Trash2, Calendar, User, Flag } from 'lucide-react';
import { GTMPhaseActivity } from '@/hooks/useGTMPhases';
import { cn } from '@/lib/utils';

interface ActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  activities: GTMPhaseActivity[];
  onAddActivity: (activity: Partial<GTMPhaseActivity>) => Promise<void>;
  onUpdateActivity: (activityId: string, updates: Partial<GTMPhaseActivity>) => Promise<void>;
  onDeleteActivity: (activityId: string) => Promise<void>;
}

const getStatusColor = (status: string | null) => {
  switch (status) {
    case 'completed':
      return 'bg-accent-success/10 text-accent-success border-accent-success/20';
    case 'in-progress':
      return 'bg-accent-warning/10 text-accent-warning border-accent-warning/20';
    case 'blocked':
      return 'bg-accent-danger/10 text-accent-danger border-accent-danger/20';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

const getPriorityColor = (priority: string | null) => {
  switch (priority) {
    case 'high':
      return 'bg-accent-danger/10 text-accent-danger';
    case 'medium':
      return 'bg-accent-warning/10 text-accent-warning';
    case 'low':
      return 'bg-accent-success/10 text-accent-success';
    default:
      return 'bg-muted text-muted-foreground';
  }
};

export const ActivityModal: React.FC<ActivityModalProps> = ({
  isOpen,
  onClose,
  activities,
  onAddActivity,
  onUpdateActivity,
  onDeleteActivity
}) => {
  const [selectedActivity, setSelectedActivity] = useState<GTMPhaseActivity | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Partial<GTMPhaseActivity>>({});
  const [newActivity, setNewActivity] = useState<Partial<GTMPhaseActivity>>({
    title: '',
    description: '',
    status: 'not-started',
    priority: 'medium'
  });

  const handleActivityClick = (activity: GTMPhaseActivity) => {
    setSelectedActivity(activity);
    setEditingActivity({ ...activity });
    setIsEditMode(true);
  };

  const handleSaveActivity = async () => {
    if (selectedActivity && editingActivity.title) {
      await onUpdateActivity(selectedActivity.id, editingActivity);
      setSelectedActivity(null);
      setIsEditMode(false);
      setEditingActivity({});
    }
  };

  const handleAddActivity = async () => {
    if (newActivity.title) {
      await onAddActivity({
        ...newActivity,
        order_index: activities.length
      });
      setNewActivity({
        title: '',
        description: '',
        status: 'not-started',
        priority: 'medium'
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    await onDeleteActivity(activityId);
    if (selectedActivity?.id === activityId) {
      setSelectedActivity(null);
      setIsEditMode(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Key Activities Management
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
          {/* Activities List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Activities List</h3>
              <Button
                size="sm"
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Activity
              </Button>
            </div>

            {/* Add Activity Form */}
            {showAddForm && (
              <Card className="p-4 border-primary/20">
                <div className="space-y-3">
                  <Input
                    placeholder="Activity title..."
                    value={newActivity.title || ''}
                    onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                  />
                  <Textarea
                    placeholder="Activity description..."
                    value={newActivity.description || ''}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={newActivity.priority || 'medium'}
                      onValueChange={(value) => setNewActivity({ ...newActivity, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Owner..."
                      value={newActivity.owner || ''}
                      onChange={(e) => setNewActivity({ ...newActivity, owner: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddActivity}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setShowAddForm(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {/* Activities List */}
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {activities.map((activity) => (
                  <Card
                    key={activity.id}
                    className={cn(
                      "cursor-pointer transition-all duration-200 hover:shadow-md",
                      selectedActivity?.id === activity.id && "ring-2 ring-primary"
                    )}
                    onClick={() => handleActivityClick(activity)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm">{activity.title}</h4>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {activity.priority && (
                              <Badge variant="outline" className={cn("text-xs", getPriorityColor(activity.priority))}>
                                {activity.priority}
                              </Badge>
                            )}
                            <Badge variant="outline" className={cn("text-xs", getStatusColor(activity.status))}>
                              {activity.status || 'not-started'}
                            </Badge>
                          </div>
                        </div>
                        {activity.description && (
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {activity.description}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {activity.due_date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(activity.due_date).toLocaleDateString()}
                            </div>
                          )}
                          {activity.owner && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              {activity.owner}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {activities.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No activities yet. Click "Add Activity" to get started.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Activity Detail Editor */}
          <div className="space-y-4">
            {selectedActivity && isEditMode ? (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Edit Activity</h3>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleSaveActivity}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedActivity(null);
                        setIsEditMode(false);
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteActivity(selectedActivity.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>

                <ScrollArea className="h-[400px]">
                  <div className="space-y-4 pr-4">
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <Input
                        value={editingActivity.title || ''}
                        onChange={(e) => setEditingActivity({ ...editingActivity, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        rows={4}
                        value={editingActivity.description || ''}
                        onChange={(e) => setEditingActivity({ ...editingActivity, description: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select
                          value={editingActivity.status || 'not-started'}
                          onValueChange={(value) => setEditingActivity({ ...editingActivity, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="not-started">Not Started</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="blocked">Blocked</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Priority</label>
                        <Select
                          value={editingActivity.priority || 'medium'}
                          onValueChange={(value) => setEditingActivity({ ...editingActivity, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Due Date</label>
                      <DatePicker
                        date={editingActivity.due_date ? new Date(editingActivity.due_date) : undefined}
                        onDateChange={(date) => 
                          setEditingActivity({ 
                            ...editingActivity, 
                            due_date: date ? date.toISOString().split('T')[0] : null 
                          })
                        }
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Owner</label>
                      <Input
                        value={editingActivity.owner || ''}
                        onChange={(e) => setEditingActivity({ ...editingActivity, owner: e.target.value })}
                        placeholder="Who is responsible for this activity?"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">Notes</label>
                      <Textarea
                        rows={3}
                        value={editingActivity.notes || ''}
                        onChange={(e) => setEditingActivity({ ...editingActivity, notes: e.target.value })}
                        placeholder="Additional notes or comments..."
                      />
                    </div>
                  </div>
                </ScrollArea>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Select an activity to view and edit details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};