
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, LogOut, Sun, Moon, Shield } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'customer' | 'admin';
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userRole,
  currentLanguage,
  onLanguageChange
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const customerMenuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Purchase Service', path: '/purchase', icon: '🛒' },
    { name: 'Support', path: '/support', icon: '🎧' },
  ];

  const adminMenuItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Users', path: '/admin/users', icon: '👥' },
    { name: 'Orders', path: '/admin/orders', icon: '📦' },
    { name: 'Services', path: '/admin/services', icon: '⚙️' },
    { name: 'Support', path: '/admin/support', icon: '🎧' },
    { name: 'Reports', path: '/admin/reports', icon: '📈' },
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : customerMenuItems;

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-4 lg:px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden mr-2 hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            {userRole === 'admin' && (
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">ADMIN</span>
              </div>
            )}
            <h1 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
              {userRole === 'admin' ? 'Admin Panel' : 'Dashboard'}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </Button>
          <LanguageSelector 
            currentLanguage={currentLanguage}
            onLanguageChange={onLanguageChange}
          />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700
          transform transition-transform duration-300 ease-in-out lg:transform-none shadow-lg lg:shadow-none
        `}>
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-slate-200 dark:border-slate-700">
            <span className="text-lg font-semibold text-slate-800 dark:text-slate-200">Menu</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSidebarOpen(false)}
              className="hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          <nav className="mt-8 lg:mt-4 px-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center px-4 py-3 text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 rounded-lg mb-1 group"
              >
                <span className="mr-3 text-lg group-hover:scale-110 transition-transform duration-200">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
