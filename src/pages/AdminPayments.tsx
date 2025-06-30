
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  Settings, 
  Shield, 
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

const AdminPayments = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showApiKey, setShowApiKey] = useState(false);
  const [stripeSettings, setStripeSettings] = useState({
    publicKey: 'pk_test_...',
    secretKey: 'sk_test_...',
    webhookSecret: 'whsec_...',
    testMode: true
  });

  const paymentStats = [
    {
      title: 'Total Revenue',
      value: '$48,392.50',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Successful Payments',
      value: '1,247',
      change: '+8.2%',
      icon: CheckCircle,
      color: 'text-blue-600'
    },
    {
      title: 'Failed Payments',
      value: '23',
      change: '-15.3%',
      icon: AlertCircle,
      color: 'text-red-600'
    },
    {
      title: 'Processing Fees',
      value: '$1,403.85',
      change: '+12.1%',
      icon: CreditCard,
      color: 'text-purple-600'
    }
  ];

  const recentTransactions = [
    {
      id: 'pi_1234567890',
      customer: 'john@example.com',
      amount: '$29.99',
      status: 'succeeded',
      date: '2024-06-30',
      service: 'VPS Pro'
    },
    {
      id: 'pi_0987654321',
      customer: 'jane@example.com',
      amount: '$19.99',
      status: 'succeeded',
      date: '2024-06-30',
      service: 'Web Hosting'
    },
    {
      id: 'pi_1122334455',
      customer: 'mike@example.com',
      amount: '$199.99',
      status: 'failed',
      date: '2024-06-29',
      service: 'Dedicated Server'
    }
  ];

  const handleSaveSettings = () => {
    // In a real app, this would save to a secure backend
    console.log('Saving Stripe settings...');
    alert('Settings saved successfully!');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <DashboardLayout 
      userRole="admin" 
      currentLanguage={currentLanguage}
      onLanguageChange={setCurrentLanguage}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="p-6 space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                Payment Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Manage Stripe integration and payment processing
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex items-center">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync with Stripe
              </Button>
            </div>
          </div>

          {/* Payment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paymentStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.title}
                      </CardTitle>
                      <IconComponent className={`h-5 w-5 ${stat.color}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                      {stat.value}
                    </div>
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600 dark:text-green-400">{stat.change}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Stripe Configuration */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-600" />
                  Stripe Configuration
                </CardTitle>
                <CardDescription>
                  Configure your Stripe payment integration settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                  <Shield className="h-4 w-4" />
                  <AlertDescription className="text-amber-800 dark:text-amber-200">
                    {stripeSettings.testMode ? 'Test Mode Enabled' : 'Live Mode Active'}
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="publicKey">Publishable Key</Label>
                  <Input
                    id="publicKey"
                    value={stripeSettings.publicKey}
                    onChange={(e) => setStripeSettings(prev => ({ ...prev, publicKey: e.target.value }))}
                    placeholder="pk_test_..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secretKey">Secret Key</Label>
                  <div className="relative">
                    <Input
                      id="secretKey"
                      type={showApiKey ? 'text' : 'password'}
                      value={stripeSettings.secretKey}
                      onChange={(e) => setStripeSettings(prev => ({ ...prev, secretKey: e.target.value }))}
                      placeholder="sk_test_..."
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookSecret">Webhook Secret</Label>
                  <Input
                    id="webhookSecret"
                    type="password"
                    value={stripeSettings.webhookSecret}
                    onChange={(e) => setStripeSettings(prev => ({ ...prev, webhookSecret: e.target.value }))}
                    placeholder="whsec_..."
                  />
                </div>

                <Button onClick={handleSaveSettings} className="w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>

            {/* Recent Transactions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-green-600" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>
                  Latest payment transactions from Stripe
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-slate-800 dark:text-slate-200">
                          {transaction.service}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {transaction.customer}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">
                          {transaction.id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {transaction.amount}
                        </p>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                        <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminPayments;
