
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ServiceCard from '@/components/ServiceCard';
import { Server, Shield, Globe, Zap, ArrowLeft } from 'lucide-react';

const PurchaseService = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const navigate = useNavigate();

  const services = [
    {
      id: 'hosting',
      icon: <Globe className="h-8 w-8" />,
      title: 'Website Hosting',
      description: 'Professional web hosting with 99.9% uptime guarantee',
      plans: [
        { id: 'basic', name: 'Basic', price: '$4.99/mo', features: ['10GB Storage', '100GB Bandwidth', '1 Domain', 'SSL Certificate'] },
        { id: 'pro', name: 'Pro', price: '$9.99/mo', features: ['50GB Storage', '500GB Bandwidth', '5 Domains', 'SSL Certificate', 'Daily Backups'], popular: true },
        { id: 'enterprise', name: 'Enterprise', price: '$19.99/mo', features: ['200GB Storage', 'Unlimited Bandwidth', 'Unlimited Domains', 'SSL Certificate', 'Daily Backups', '24/7 Support'] }
      ]
    },
    {
      id: 'vps',
      icon: <Server className="h-8 w-8" />,
      title: 'VPS Servers',
      description: 'Virtual Private Servers with full root access',
      plans: [
        { id: 'vps-basic', name: 'VPS Basic', price: '$29.99/mo', features: ['2 CPU Cores', '4GB RAM', '50GB SSD', '2TB Bandwidth'] },
        { id: 'vps-pro', name: 'VPS Pro', price: '$59.99/mo', features: ['4 CPU Cores', '8GB RAM', '100GB SSD', '4TB Bandwidth', 'Free Backups'], popular: true },
        { id: 'vps-enterprise', name: 'VPS Enterprise', price: '$119.99/mo', features: ['8 CPU Cores', '16GB RAM', '200GB SSD', '8TB Bandwidth', 'Free Backups', 'Priority Support'] }
      ]
    },
    {
      id: 'dedicated',
      icon: <Zap className="h-8 w-8" />,
      title: 'Dedicated Servers',
      description: 'High-performance dedicated servers for enterprise needs',
      plans: [
        { id: 'dedicated-basic', name: 'Dedicated Basic', price: '$199.99/mo', features: ['Intel Xeon E3', '16GB RAM', '1TB SSD', 'Unlimited Bandwidth'] },
        { id: 'dedicated-pro', name: 'Dedicated Pro', price: '$399.99/mo', features: ['Intel Xeon E5', '32GB RAM', '2TB SSD', 'Unlimited Bandwidth', 'RAID 1'], popular: true }
      ]
    },
    {
      id: 'security',
      icon: <Shield className="h-8 w-8" />,
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions for your business',
      plans: [
        { id: 'security-basic', name: 'Security Basic', price: '$19.99/mo', features: ['Malware Scanning', 'SSL Monitoring', 'Basic Firewall'] },
        { id: 'security-advanced', name: 'Security Advanced', price: '$49.99/mo', features: ['Advanced Malware Protection', 'DDoS Protection', 'Security Monitoring', 'Incident Response'], popular: true }
      ]
    }
  ];

  const currentService = services.find(s => s.id === selectedService);
  const currentPlan = currentService?.plans.find(p => p.id === selectedPlan);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    setSelectedPlan(null);
  };

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { service: currentService, plan: currentPlan } });
  };

  if (!selectedService) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Choose Your Service</h1>
            <p className="text-slate-600">Select the service that best fits your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                icon={service.icon}
                title={service.title}
                description={service.description}
                features={[]}
                onClick={() => handleServiceSelect(service.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => setSelectedService(null)} className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Button>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{currentService?.title}</h1>
            <p className="text-slate-600">{currentService?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentService?.plans.map((plan) => (
              <ServiceCard
                key={plan.id}
                icon={currentService.icon}
                title={plan.name}
                description=""
                features={plan.features}
                price={plan.price}
                popular={plan.popular}
                onClick={() => handlePlanSelect(plan.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => setSelectedPlan(null)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Plans
          </Button>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Order Summary</h1>
          <p className="text-slate-600">Review your selection before proceeding</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Selected Service</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">{currentService?.title} - {currentPlan?.name}</h3>
                <ul className="text-sm text-slate-600 mt-2">
                  {currentPlan?.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{currentPlan?.price}</div>
                {currentPlan?.popular && (
                  <Badge className="bg-cyan-100 text-cyan-800 mt-1">Most Popular</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => setSelectedPlan(null)} className="flex-1">
            Back to Plans
          </Button>
          <Button 
            onClick={handleProceedToPayment}
            className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseService;
