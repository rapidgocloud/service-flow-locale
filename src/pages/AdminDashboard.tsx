
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: '1,247', change: '+12%', color: 'text-blue-600' },
    { title: 'Active Services', value: '2,156', change: '+8%', color: 'text-green-600' },
    { title: 'Monthly Revenue', value: '$48,392', change: '+15%', color: 'text-purple-600' },
    { title: 'Support Tickets', value: '23', change: '-5%', color: 'text-orange-600' },
  ];

  const recentOrders = [
    { id: '#ORD-1001', customer: 'John Doe', service: 'VPS Pro', amount: '$29.99', status: 'Active' },
    { id: '#ORD-1002', customer: 'Jane Smith', service: 'Hosting Plus', amount: '$19.99', status: 'Pending' },
    { id: '#ORD-1003', customer: 'Mike Johnson', service: 'Dedicated Server', amount: '$199.99', status: 'Active' },
  ];

  const pendingTickets = [
    { id: '#TKT-301', customer: 'Alice Brown', subject: 'Server Migration Help', priority: 'High' },
    { id: '#TKT-302', customer: 'Bob Wilson', subject: 'SSL Certificate Setup', priority: 'Medium' },
    { id: '#TKT-303', customer: 'Carol Davis', subject: 'Billing Question', priority: 'Low' },
  ];

  return (
    <DashboardLayout 
      userRole="admin" 
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => navigate('/admin/reports')}>
              View Reports
            </Button>
            <Button 
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              onClick={() => navigate('/admin/services')}
            >
              Manage Services
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline space-x-2">
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <span className="text-sm text-green-600">{stat.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/admin/users')}
              >
                <span className="text-2xl mb-1">👥</span>
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/admin/orders')}
              >
                <span className="text-2xl mb-1">📦</span>
                <span className="text-sm">View Orders</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/admin/services')}
              >
                <span className="text-2xl mb-1">⚙️</span>
                <span className="text-sm">Service Plans</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center justify-center"
                onClick={() => navigate('/admin/support')}
              >
                <span className="text-2xl mb-1">🎧</span>
                <span className="text-sm">Support Hub</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest customer orders and subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{order.id}</p>
                      <p className="text-sm text-slate-600">{order.customer}</p>
                      <p className="text-sm text-slate-500">{order.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-800">{order.amount}</p>
                      <Badge className={
                        order.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
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

          {/* Pending Support Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Support Tickets</CardTitle>
              <CardDescription>Customer support requests requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingTickets.map((ticket, index) => (
                  <div key={index} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{ticket.id}</p>
                        <p className="text-sm text-slate-600 mt-1">{ticket.customer}</p>
                        <p className="text-sm text-slate-500 mt-1">{ticket.subject}</p>
                      </div>
                      <Badge className={
                        ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }>
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/admin/support')}>
                View All Tickets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
