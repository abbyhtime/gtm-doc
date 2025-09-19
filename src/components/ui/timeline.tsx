import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineItem {
  id: string;
  title: string;
  due_date: string | null;
  status: string | null;
  priority: string | null;
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
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

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  if (!items.length) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Activity Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No activities to display on timeline
          </p>
        </CardContent>
      </Card>
    );
  }

  // Sort items by due date
  const sortedItems = [...items]
    .filter(item => item.due_date)
    .sort((a, b) => {
      if (!a.due_date || !b.due_date) return 0;
      return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
    });

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-4">
            {sortedItems.map((item, index) => (
              <div key={item.id} className="relative flex items-start gap-4">
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full border-2 flex items-center justify-center",
                    item.status === 'completed' 
                      ? "bg-accent-success border-accent-success" 
                      : item.status === 'in-progress'
                      ? "bg-accent-warning border-accent-warning"
                      : "bg-background border-border"
                  )}>
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-8">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm">{item.title}</h4>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {item.priority && (
                        <Badge variant="outline" className={cn("text-xs", getPriorityColor(item.priority))}>
                          {item.priority}
                        </Badge>
                      )}
                      <Badge variant="outline" className={cn("text-xs", getStatusColor(item.status))}>
                        {item.status || 'not-started'}
                      </Badge>
                    </div>
                  </div>
                  {item.due_date && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Due: {new Date(item.due_date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};