import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Lock, FileText } from "lucide-react";

interface AccessCodeLoginProps {
  onSuccess: () => void;
}

// Simple hash function for access codes - matches database
const simpleHash = (str: string): string => {
  // Convert string to hex for simple but consistent hashing
  let result = '';
  for (let i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  }
  return result.substring(0, 8);
};

export const AccessCodeLogin = ({ onSuccess }: AccessCodeLoginProps) => {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateCode = async (inputCode: string) => {
    const codeHash = simpleHash(inputCode);
    console.log("Input code:", inputCode);
    console.log("Generated hash:", codeHash);
    
    const { data, error } = await supabase
      .from("access_codes")
      .select("id")
      .eq("code_hash", codeHash)
      .eq("is_active", true)
      .maybeSingle();

    console.log("Query result:", { data, error });

    if (error || !data) {
      return false;
    }

    // Update last_used_at
    await supabase
      .from("access_codes")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", data.id);

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      const isValid = await validateCode(code.trim());
      
      if (isValid) {
        onSuccess();
      } else {
        setError("Invalid access code. Please check and try again.");
      }
    } catch (err) {
      setError("Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-3 rounded-full">
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">GTM Strategy Document</CardTitle>
            <CardDescription>
              Enter your access code to view the Go-to-Market strategy
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="Enter access code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !code.trim()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Access Document"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};