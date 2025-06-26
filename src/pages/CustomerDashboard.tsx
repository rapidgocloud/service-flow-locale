import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const activeServices = [
    { name: 'Web Hosting Pro', status: 'Active', expires: '2024-12-15', price: '$9.99/mo' },
    { name: 'VPS Standard', status: 'Active', expires: '2024-11-30', price: '$29.99/mo' },
  ];

  const recentInvoices = [
    { id: '#INV-001', date: '2024-06-20', amount: '$39.98', status: 'Paid' },
    { id: '#INV-002', date: '2024-05-20', amount: '$39.98', status: 'Paid' },
  ];

  const supportTickets = [
    { id: '#TKT-123', subject: 'SSL Certificate Issue', status: 'Open', date: '2024-06-22' },
    { id: '#TKT-122', subject: 'Server Performance', status: 'Resolved', date: '2024-06-20' },
  ];

  // Chart data
  const usageData = [
    { month: 'Jan', hosting: 65, vps: 80 },
    { month: 'Feb', hosting: 72, vps: 85 },
    { month: 'Mar', hosting: 68, vps: 78 },
    { month: 'Apr', hosting: 75, vps: 82 },
    { month: 'May', hosting: 70, vps: 88 },
    { month: 'Jun', hosting: 78, vps: 92 }
  ];

  const spendingData = [
    { month: 'Jan', amount: 39.98 },
    { month: 'Feb', amount: 39.98 },
    { month: 'Mar', amount: 39.98 },
    { month: 'Apr', amount: 39.98 },
    { month: 'May', amount: 39.98 },
    { month: 'Jun', amount: 39.98 }
  ];

  const chartConfig = {
    hosting: { label: "Web Hosting", color: "#3b82f6" },
    vps: { label: "VPS", color: "#10b981" },
    amount: { label: "Amount", color: "#8b5cf6" }
  };

  return (
    <DashboardLayout 
      userRole="customer" 
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <Button 
            onClick={() => navigate('/purchase')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            Purchase New Service
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Active Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{activeServices.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Monthly Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">$39.98</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">1 Open</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Service Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Service Usage</CardTitle>
              <CardDescription>Monthly resource utilization percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="hosting" stroke="var(--color-hosting)" strokeWidth={2} />
                    <Line type="monotone" dataKey="vps" stroke="var(--color-vps)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Spending History */}
          <Card>
            <CardHeader>
              <CardTitle>Spending History</CardTitle>
              <CardDescription>Monthly billing amounts</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="var(--color-amount)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Active Services */}
        <Card>
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Manage your current service subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                  <div>
                    <h3 className="font-semibold text-slate-800">{service.name}</h3>
                    <p className="text-sm text-slate-600">Expires: {service.expires}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800">{service.status}</Badge>
                    <span className="font-semibold text-slate-800">{service.price}</span>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Invoices */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
              <CardDescription>Your latest billing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentInvoices.map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div>
                      <p className="font-medium text-slate-800">{invoice.id}</p>
                      <p className="text-sm text-slate-600">{invoice.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-slate-800">{invoice.amount}</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">{invoice.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                View All Invoices
              </Button>
            </CardContent>
          </Card>

          {/* Support Tickets */}
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
              <CardDescription>Your recent support requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportTickets.map((ticket, index) => (
                  <div key={index} className="p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800">{ticket.id}</p>
                        <p className="text-sm text-slate-600 mt-1">{ticket.subject}</p>
                        <p className="text-xs text-slate-500 mt-1">{ticket.date}</p>
                      </div>
                      <Badge className={ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                        {ticket.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4" onClick={() => navigate('/support')}>
                View All Tickets
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
