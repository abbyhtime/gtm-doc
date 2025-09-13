import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield } from 'lucide-react';
import { verifyAccessCode, setAuthSession } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';

interface LoginScreenProps {
  onLogin: () => void;
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [accessCode, setAccessCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accessCode.trim()) {
      setError('Please enter an access code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const isValid = await verifyAccessCode(accessCode.trim());
      
      if (isValid) {
        setAuthSession();
        toast({
          title: "Access granted",
          description: "Welcome to the GTM Strategy Dashboard",
        });
        onLogin();
      } else {
        setError('Invalid access code. Please check and try again.');
        setAccessCode('');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">GTM Strategy Access</CardTitle>
          <CardDescription>
            Enter your team access code to view the Go-to-Market strategy dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter access code"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                disabled={isLoading}
                className="text-center tracking-wider"
                autoComplete="off"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !accessCode.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Access Dashboard'
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-xs text-muted-foreground text-center">
            Need access? Contact your team administrator
          </div>
        </CardContent>
      </Card>
    </div>
  );
}