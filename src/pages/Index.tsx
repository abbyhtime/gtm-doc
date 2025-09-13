import { useAuth } from "@/hooks/useAuth";
import { LoginScreen } from "@/components/auth/LoginScreen";
import { LogoutButton } from "@/components/auth/LogoutButton";
import GTMReport from "@/components/GTMReport";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={login} />;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <h1 className="text-lg font-semibold">GTM Strategy Dashboard</h1>
          <LogoutButton onLogout={logout} />
        </div>
      </header>
      <GTMReport />
    </div>
  );
};

export default Index;
