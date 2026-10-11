import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-4 max-w-lg">
        <h1 className="mb-4 text-6xl font-serif font-bold text-foreground">404</h1>
        <h2 className="mb-4 text-2xl font-serif text-foreground">Page Not Found</h2>
        <p className="mb-8 text-lg text-muted-foreground">
          This sunset hasn't been found yet. Let's get you back on the road.
        </p>
        <Button asChild size="lg">
          <Link to="/">
            <Home size={20} className="mr-2" />
            Return Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
