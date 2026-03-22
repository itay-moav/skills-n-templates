import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="size-5 text-primary" />
              <span className="font-semibold text-primary">My App</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
