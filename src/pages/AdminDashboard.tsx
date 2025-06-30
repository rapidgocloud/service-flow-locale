
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Users, 
  Server, 
  DollarSign, 
  ArrowUpRight, 
  Activity,
  CreditCard,
  Package,
  MessageSquare,
  BarChart3
} from 'lucide-react';

const AdminDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const stats = [
    { 
      title: 'Total Revenue', 
      value: '$48,392', 
      change: '+15%', 
      icon: DollarSign,
      color: 'bg-gradient-to-r from-green-500 to-emerald-500',
      textColor: 'text-white'
    },
    { 
      title: 'Active Users', 
      value: '1,247', 
      change: '+12%', 
      icon: Users,
      color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
      textColor: 'text-white'
    },
    { 
      title: 'Active Services', 
      value: '2,156', 
      change: '+8%', 
      icon: Server,
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      textColor: 'text-white'
    },
    { 
      title: 'Support Tickets', 
      value: '23', 
      change: '-5%', 
      icon: MessageSquare,
      color: 'bg-gradient-to-r from-orange-500 to-red-500',
      textColor: 'text-white'
    },
  ];

  const recentOrders = [
    { id: '#ORD-1001', customer: 'John Doe', service: 'VPS Pro', amount: '$29.99', status: 'Active' },
    { id: '#ORD-1002', customer: 'Jane Smith', service: 'Hosting Plus', amount: '$19.99', status: 'Pending' },
    { id: '#ORD-1003', customer: 'Mike Johnson', service: 'Dedicated Server', amount: '$199.99', status: 'Active' },
  ];

  const quickActions = [
    { 
      name: 'Manage Users', 
      path: '/admin/users', 
      icon: Users, 
      description: 'View and manage user accounts',
      color: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    { 
      name: 'View Orders', 
      path: '/admin/orders', 
      icon: Package, 
      description: 'Monitor customer orders',
      color: 'hover:bg-green-50 dark:hover:bg-green-900/20'
    },
    { 
      name: 'Service Plans', 
      path: '/admin/services', 
      icon: Server, 
      description: 'Configure service offerings',
      color: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
    },
    { 
      name: 'Support Hub', 
      path: '/admin/support', 
      icon: MessageSquare, 
      description: 'Handle customer support',
      color: 'hover:bg-orange-50 dark:hover:bg-orange-900/20'
    },
    { 
      name: 'Analytics', 
      path: '/admin/reports', 
      icon: BarChart3, 
      description: 'View detailed reports',
      color: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20'
    },
    { 
      name: 'Payments', 
      path: '/admin/payments', 
      icon: CreditCard, 
      description: 'Manage payment settings',
      color: 'hover:bg-pink-50 dark:hover:bg-pink-900/20'
    },
  ];

  return (
    <DashboardLayout 
      userRole="admin" 
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="p-6 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Welcome back! Here's what's happening with your platform.
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => navigate('/admin/reports')} className="flex items-center">
                <Activity className="h-4 w-4 mr-2" />
                View Reports
              </Button>
              <Button 
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg"
                onClick={() => navigate('/admin/services')}
              >
                <Server className="h-4 w-4 mr-2" />
                Manage Services
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className={`${stat.color} p-6`}>
                    <div className="flex items-center justify-between">
                      <div className={stat.textColor}>
                        <p className="text-sm font-medium opacity-90">{stat.title}</p>
                        <p className="text-3xl font-bold mt-1">{stat.value}</p>
                        <div className="flex items-center mt-2">
                          <TrendingUp className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <IconComponent className={`h-12 w-12 ${stat.textColor} opacity-80`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Activity className="h-6 w-6 mr-2 text-blue-600" />
                Quick Actions
              </CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <Button
                      key={action.path}
                      variant="ghost"
                      className={`h-auto p-6 flex flex-col items-start text-left ${action.color} transition-all duration-200 border border-slate-200 dark:border-slate-700`}
                      onClick={() => navigate(action.path)}
                    >
                      <div className="flex items-center w-full mb-2">
                        <IconComponent className="h-5 w-5 mr-3 text-blue-600 dark:text-blue-400" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{action.name}</span>
                        <ArrowUpRight className="h-4 w-4 ml-auto text-slate-400" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{action.description}</p>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2 text-green-600" />
                  Recent Orders
                </CardTitle>
                <CardDescription>Latest customer orders and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">{order.id}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{order.customer}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-500">{order.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{order.amount}</p>
                        <Badge className={
                          order.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }>
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/admin/orders')}>
                  View All Orders
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-orange-600" />
                  System Status
                </CardTitle>
                <CardDescription>Platform health and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Server Status</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Database</span>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Payment Gateway</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Monitoring</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
