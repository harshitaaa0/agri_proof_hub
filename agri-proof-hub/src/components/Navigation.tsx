import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, ArrowRight, LogIn, UserPlus, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface NavigationProps {
  currentPath: string;
}

export const Navigation = ({ currentPath }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();

  const routes = [
    { path: "/", name: "Home" },
    { path: "/farmer-input", name: "Farmer Input" },
    { path: "/proofs", name: "My Proofs" }, 
    { path: "/dashboard", name: "Dashboard" },
    { path: "/login", name: "Login" },
    { path: "/register", name: "Register" }
  ];

  const currentIndex = routes.findIndex(route => route.path === currentPath);
  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < routes.length - 1;

  const goBack = () => {
    if (canGoBack) {
      navigate(routes[currentIndex - 1].path);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      navigate(routes[currentIndex + 1].path);
    }
  };

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Home Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Button>

          {/* Authentication & Navigation */}
          <div className="flex items-center gap-4">
            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={goBack}
                disabled={!canGoBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>

              <Button
                variant="outline" 
                size="sm"
                onClick={goForward}
                disabled={!canGoForward}
                className="flex items-center gap-2"
              >
                Forward
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Authentication Buttons */}
            {user ? (
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-white"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="flex items-center gap-2 text-forest-green border-forest-green hover:bg-forest-green hover:text-white"
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};