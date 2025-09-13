import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface LogoutButtonProps {
  onLogout: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const { toast } = useToast();

  const handleLogout = () => {
    onLogout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="text-muted-foreground hover:text-foreground"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Logout
    </Button>
  );
}