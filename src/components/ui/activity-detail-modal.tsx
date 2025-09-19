import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { RichTextEditor } from '@/components/ui/rich-text-editor';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, AlertCircle, Target, FileText, Trash2, Save } from 'lucide-react';
import { GTMPhaseActivity } from '@/hooks/useGTMPhases';
import { toast } from '@/hooks/use-toast';

interface ActivityDetailModalProps {
  activity: GTMPhaseActivity | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (activity: Partial<GTMPhaseActivity>) => Promise<void>;
  onDelete?: (activityId: string) => Promise<void>;
  isEditing?: boolean;
  onEditToggle?: () => void;
}

const statusOptions = [
  { value: 'not-started', label: 'Not Started' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
  { value: 'blocked', label: 'Blocked' }
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'critical', label: 'Critical' }
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/20 text-green-700 border-green-200';
    case 'in-progress':
      return 'bg-blue-500/20 text-blue-700 border-blue-200';
    case 'blocked':
      return 'bg-red-500/20 text-red-700 border-red-200';
    case 'not-started':
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

export const ActivityDetailModal: React.FC<ActivityDetailModalProps> = ({
  activity,
  isOpen,
  onClose,
  onSave,
  onDelete,
  isEditing = false,
  onEditToggle
}) => {
  const [editedActivity, setEditedActivity] = useState<Partial<GTMPhaseActivity>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (activity) {
      setEditedActivity({
        title: activity.title,
        description: activity.description,
        due_date: activity.due_date,
        owner: activity.owner,
        status: activity.status,
        priority: activity.priority,
        notes: activity.notes
      });
    }
  }, [activity]);

  const handleSave = async () => {
    if (!activity) return;
    
    setIsSaving(true);
    try {
      await onSave(editedActivity);
      toast({
        title: "Activity Updated",
        description: "Activity details have been saved successfully."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save activity details.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!activity || !onDelete) return;
    
    try {
      await onDelete(activity.id);
      toast({
        title: "Activity Deleted",
        description: "Activity has been deleted successfully."
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",  
        description: "Failed to delete activity.",
        variant: "destructive"
      });
    }
  };

  if (!activity) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Activity Details
            </span>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onEditToggle}
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onEditToggle}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {isSaving ? 'Saving...' : 'Save'}
                  </Button>
                </div>
              )}
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Activity Title</Label>
            {isEditing ? (
              <Input
                id="title"
                value={editedActivity.title || ''}
                onChange={(e) => setEditedActivity(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter activity title"
              />
            ) : (
              <h3 className="text-lg font-semibold">{activity.title}</h3>
            )}
          </div>

          {/* Status and Priority Badges */}
          <div className="flex items-center gap-3">
            <div className="space-y-2">
              <Label>Status</Label>
              {isEditing ? (
                <Select
                  value={editedActivity.status || activity.status}
                  onValueChange={(value) => setEditedActivity(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getStatusColor(activity.status)}>
                  {statusOptions.find(opt => opt.value === activity.status)?.label || activity.status}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              {isEditing ? (
                <Select
                  value={editedActivity.priority || activity.priority}
                  onValueChange={(value) => setEditedActivity(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {priorityOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Badge className={getPriorityColor(activity.priority)}>
                  {priorityOptions.find(opt => opt.value === activity.priority)?.label || activity.priority}
                </Badge>
              )}
            </div>
          </div>

          {/* Due Date and Owner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Due Date
              </Label>
              {isEditing ? (
                <DatePicker
                  date={editedActivity.due_date ? new Date(editedActivity.due_date) : undefined}
                  onDateChange={(date) => setEditedActivity(prev => ({ 
                    ...prev, 
                    due_date: date ? date.toISOString().split('T')[0] : null 
                  }))}
                  placeholder="Select due date"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {activity.due_date ? new Date(activity.due_date).toLocaleDateString() : 'Not set'}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Owner
              </Label>
              {isEditing ? (
                <Input
                  value={editedActivity.owner || ''}
                  onChange={(e) => setEditedActivity(prev => ({ ...prev, owner: e.target.value }))}
                  placeholder="Enter owner name"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  {activity.owner || 'Not assigned'}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Description
            </Label>
            {isEditing ? (
              <RichTextEditor
                value={editedActivity.description || ''}
                onChange={(value) => setEditedActivity(prev => ({ ...prev, description: value }))}
                height={150}
              />
            ) : (
              <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3 min-h-[100px]">
                {activity.description ? (
                  <div dangerouslySetInnerHTML={{ __html: activity.description }} />
                ) : (
                  <span className="italic">No description provided</span>
                )}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Notes
            </Label>
            {isEditing ? (
              <RichTextEditor
                value={editedActivity.notes || ''}
                onChange={(value) => setEditedActivity(prev => ({ ...prev, notes: value }))}
                height={120}
              />
            ) : (
              <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3 min-h-[80px]">
                {activity.notes ? (
                  <div dangerouslySetInnerHTML={{ __html: activity.notes }} />
                ) : (
                  <span className="italic">No notes added</span>
                )}
              </div>
            )}
          </div>

          {/* Delete Button */}
          {isEditing && onDelete && (
            <div className="pt-4 border-t">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                className="flex items-center gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Delete Activity
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};