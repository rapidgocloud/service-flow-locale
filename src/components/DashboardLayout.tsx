
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import LanguageSelector from '@/components/LanguageSelector';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  ShoppingCart, 
  HeadphonesIcon, 
  BarChart3, 
  CreditCard,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { getTranslation } from '@/utils/translations';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'customer';
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  userRole, 
  currentLanguage, 
  onLanguageChange 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const adminMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: getTranslation(currentLanguage, 'dashboard'), 
      path: '/admin',
      key: 'dashboard'
    },
    { 
      icon: Users, 
      label: getTranslation(currentLanguage, 'userManagement'), 
      path: '/admin/users',
      key: 'users'
    },
    { 
      icon: Package, 
      label: getTranslation(currentLanguage, 'serviceManagement'), 
      path: '/admin/services',
      key: 'services'
    },
    { 
      icon: ShoppingCart, 
      label: getTranslation(currentLanguage, 'orderManagement'), 
      path: '/admin/orders',
      key: 'orders'
    },
    { 
      icon: HeadphonesIcon, 
      label: getTranslation(currentLanguage, 'supportManagement'), 
      path: '/admin/support',
      key: 'support'
    },
    { 
      icon: BarChart3, 
      label: 'Reports', 
      path: '/admin/reports',
      key: 'reports'
    },
    { 
      icon: CreditCard, 
      label: 'Payments', 
      path: '/admin/payments',
      key: 'payments'
    }
  ];

  const customerMenuItems = [
    { 
      icon: LayoutDashboard, 
      label: getTranslation(currentLanguage, 'dashboard'), 
      path: '/dashboard',
      key: 'dashboard'
    },
    { 
      icon: Package, 
      label: getTranslation(currentLanguage, 'services'), 
      path: '/purchase',
      key: 'services'
    },
    { 
      icon: HeadphonesIcon, 
      label: getTranslation(currentLanguage, 'support'), 
      path: '/support',
      key: 'support'
    }
  ];

  const menuItems = userRole === 'admin' ? adminMenuItems : customerMenuItems;

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      {/* Mobile menu overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-r`}>
        
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
          <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            {getTranslation(currentLanguage, 'adminPanel')}
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.path);
            
            return (
              <Button
                key={item.key}
                variant={active ? 'default' : 'ghost'}
                className={`w-full justify-start ${
                  active 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : theme === 'dark' 
                      ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                onClick={() => {
                  navigate(item.path);
                  setSidebarOpen(false);
                }}
              >
                <IconComponent className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
          <Button
            variant="ghost"
            className={`w-full justify-start ${theme === 'dark' ? 'text-slate-300 hover:text-white hover:bg-slate-700' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className={`${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border-b px-4 py-3`}>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={theme === 'dark' ? 'border-slate-600 text-slate-300' : ''}
              >
                {theme === 'clean' ? '🌙' : '☀️'}
              </Button>
              
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={onLanguageChange}
                variant="header"
              />
              
              <Badge variant="outline" className={theme === 'dark' ? 'border-slate-600 text-slate-300' : ''}>
                {userRole === 'admin' ? 'Admin' : 'Customer'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
