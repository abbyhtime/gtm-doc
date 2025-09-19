import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Calendar, Clock, User, Target } from 'lucide-react';
import { GTMPhase, GTMPhaseActivity } from '@/hooks/useGTMPhases';

interface TimelineProps {
  className?: string;
}

interface PhaseTimelineProps extends TimelineProps {
  phases: GTMPhase[];
  onPhaseClick?: (phase: GTMPhase) => void;
}

interface ActivityTimelineProps extends TimelineProps {
  activities: GTMPhaseActivity[];
  onActivityClick?: (activity: GTMPhaseActivity) => void;
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'completed':
      return 'bg-green-500/20 text-green-700 border-green-200';
    case 'in-progress':
      return 'bg-blue-500/20 text-blue-700 border-blue-200';  
    case 'blocked':
      return 'bg-red-500/20 text-red-700 border-red-200';
    case 'not-started':
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

export const PhaseTimeline: React.FC<PhaseTimelineProps> = ({ 
  phases, 
  onPhaseClick, 
  className 
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Phase Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-6">
            {phases.map((phase, index) => (
              <div 
                key={phase.id} 
                className={cn(
                  "relative flex items-start gap-4 group cursor-pointer transition-all duration-200 hover:bg-muted/50 rounded-lg p-3 -m-3",
                  onPhaseClick && "hover:shadow-md"
                )}
                onClick={() => onPhaseClick?.(phase)}
              >
                {/* Timeline dot */}
                <div className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background text-xs font-semibold",
                  getStatusColor(phase.status)
                )}>
                  {phase.phase_number}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold truncate">{phase.name}</h4>
                    <Badge variant="outline" className={getStatusColor(phase.status)}>
                      {phase.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {phase.description}
                  </p>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {phase.timeline}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ 
  activities, 
  onActivityClick, 
  className 
}) => {
  // Sort activities by due date
  const sortedActivities = [...activities].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-4">
            {sortedActivities.map((activity, index) => (
              <div 
                key={activity.id} 
                className={cn(
                  "relative flex items-start gap-4 group cursor-pointer transition-all duration-200 hover:bg-muted/50 rounded-lg p-3 -m-3",
                  onActivityClick && "hover:shadow-md"
                )}
                onClick={() => onActivityClick?.(activity)}
              >
                {/* Timeline dot */}
                <div className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background text-xs",
                  getStatusColor(activity.status)
                )}>
                  •
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h5 className="font-medium truncate">{activity.title}</h5>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="outline" className={getPriorityColor(activity.priority)}>
                        {activity.priority}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(activity.status)}>
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {activity.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {activity.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    {activity.due_date && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(activity.due_date), 'MMM dd, yyyy')}
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
              </div>
            ))}
            
            {sortedActivities.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No activities scheduled
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};