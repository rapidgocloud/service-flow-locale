
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
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
  EyeOff,
  Save
} from 'lucide-react';
import { getTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';

const AdminPayments = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showApiKey, setShowApiKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);
  const { toast } = useToast();
  
  const [stripeSettings, setStripeSettings] = useState({
    publicKey: '',
    secretKey: '',
    webhookSecret: '',
    testMode: true,
    currency: 'USD',
    companyName: '',
    supportEmail: '',
    returnUrl: '',
    cancelUrl: ''
  });

  const paymentStats = [
    {
      title: getTranslation(currentLanguage, 'totalRevenue') || 'Total Revenue',
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
    // Validate required fields
    if (!stripeSettings.publicKey || !stripeSettings.secretKey) {
      toast({
        title: "Error",
        description: "Please fill in the required Stripe keys.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would save to a secure backend
    console.log('Saving Stripe settings...', stripeSettings);
    toast({
      title: "Settings Saved",
      description: "Stripe configuration has been saved successfully.",
    });
  };

  const handleInputChange = (field: keyof typeof stripeSettings, value: string | boolean) => {
    setStripeSettings(prev => ({ ...prev, [field]: value }));
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
                {getTranslation(currentLanguage, 'paymentManagement')}
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

          {/* Stripe Configuration */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-blue-600" />
                {getTranslation(currentLanguage, 'stripeConfiguration')}
              </CardTitle>
              <CardDescription>
                Configure your Stripe payment integration settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="keys" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="keys">API Keys</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="keys" className="space-y-4">
                  <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
                    <Shield className="h-4 w-4" />
                    <AlertDescription className="text-amber-800 dark:text-amber-200">
                      {stripeSettings.testMode ? 'Test Mode Enabled' : 'Live Mode Active'}
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="publicKey">Publishable Key *</Label>
                      <Input
                        id="publicKey"
                        value={stripeSettings.publicKey}
                        onChange={(e) => handleInputChange('publicKey', e.target.value)}
                        placeholder="pk_test_..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="secretKey">Secret Key *</Label>
                      <div className="relative">
                        <Input
                          id="secretKey"
                          type={showApiKey ? 'text' : 'password'}
                          value={stripeSettings.secretKey}
                          onChange={(e) => handleInputChange('secretKey', e.target.value)}
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
                  </div>
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={stripeSettings.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        placeholder="Your Company Name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail">Support Email</Label>
                      <Input
                        id="supportEmail"
                        type="email"
                        value={stripeSettings.supportEmail}
                        onChange={(e) => handleInputChange('supportEmail', e.target.value)}
                        placeholder="support@yourcompany.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="returnUrl">Success Return URL</Label>
                      <Input
                        id="returnUrl"
                        value={stripeSettings.returnUrl}
                        onChange={(e) => handleInputChange('returnUrl', e.target.value)}
                        placeholder="https://yoursite.com/success"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cancelUrl">Cancel Return URL</Label>
                      <Input
                        id="cancelUrl"
                        value={stripeSettings.cancelUrl}
                        onChange={(e) => handleInputChange('cancelUrl', e.target.value)}
                        placeholder="https://yoursite.com/cancel"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="testMode"
                      checked={stripeSettings.testMode}
                      onCheckedChange={(checked) => handleInputChange('testMode', checked)}
                    />
                    <Label htmlFor="testMode">Test Mode</Label>
                  </div>
                </TabsContent>
                
                <TabsContent value="webhooks" className="space-y-4">
                  <div>
                    <Label htmlFor="webhookSecret">Webhook Endpoint Secret</Label>
                    <div className="relative">
                      <Input
                        id="webhookSecret"
                        type={showWebhookSecret ? 'text' : 'password'}
                        value={stripeSettings.webhookSecret}
                        onChange={(e) => handleInputChange('webhookSecret', e.target.value)}
                        placeholder="whsec_..."
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2"
                        onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                      >
                        {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      Configure this in your Stripe Dashboard under Webhooks
                    </p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Button onClick={handleSaveSettings} className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {getTranslation(currentLanguage, 'save')} Configuration
                </Button>
              </div>
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
    </DashboardLayout>
  );
};

export default AdminPayments;
