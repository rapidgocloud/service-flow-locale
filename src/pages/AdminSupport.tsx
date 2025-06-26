
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const AdminSupport = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const tickets = [
    {
      id: '#TKT-301',
      customer: 'Alice Brown',
      email: 'alice@example.com',
      subject: 'Server Migration Help',
      priority: 'High',
      status: 'Open',
      created: '2024-06-25',
      lastUpdate: '2024-06-26',
      category: 'Technical'
    },
    {
      id: '#TKT-302',
      customer: 'Bob Wilson',
      email: 'bob@example.com',
      subject: 'SSL Certificate Setup',
      priority: 'Medium',
      status: 'In Progress',
      created: '2024-06-24',
      lastUpdate: '2024-06-26',
      category: 'Technical'
    },
    {
      id: '#TKT-303',
      customer: 'Carol Davis',
      email: 'carol@example.com',
      subject: 'Billing Question',
      priority: 'Low',
      status: 'Resolved',
      created: '2024-06-23',
      lastUpdate: '2024-06-25',
      category: 'Billing'
    },
    {
      id: '#TKT-304',
      customer: 'David Smith',
      email: 'david@example.com',
      subject: 'VPS Performance Issues',
      priority: 'High',
      status: 'Open',
      created: '2024-06-26',
      lastUpdate: '2024-06-26',
      category: 'Technical'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Open': return <AlertCircle className="h-4 w-4" />;
      case 'In Progress': return <Clock className="h-4 w-4" />;
      case 'Resolved': return <CheckCircle className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <DashboardLayout 
      userRole="admin" 
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
    >
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Support Management</h1>
            <p className="text-slate-600">Manage customer support tickets</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search tickets by customer, subject, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md text-sm"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Support Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800">{tickets.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{tickets.filter(t => t.status === 'Open').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">High Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{tickets.filter(t => t.priority === 'High').length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Resolved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">1</div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>Manage all customer support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Ticket</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Subject</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Priority</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Last Update</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">{ticket.id}</div>
                        <div className="text-sm text-slate-600">{ticket.category}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">{ticket.customer}</div>
                        <div className="text-sm text-slate-600">{ticket.email}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800">{ticket.subject}</div>
                        <div className="text-sm text-slate-600">Created: {ticket.created}</div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(ticket.status)}>
                          <div className="flex items-center">
                            {getStatusIcon(ticket.status)}
                            <span className="ml-1">{ticket.status}</span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-slate-600">{ticket.lastUpdate}</td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Reply
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminSupport;
