
import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Edit, Trash2, Settings } from 'lucide-react';
import ServiceModal from '@/components/modals/ServiceModal';
import ConfirmModal from '@/components/modals/ConfirmModal';
import { getTranslation } from '@/utils/translations';
import { useToast } from '@/hooks/use-toast';

interface Service {
  id: number;
  name: string;
  category: string;
  price: string;
  status: string;
  customers: number;
  features: string[];
}

const AdminServices = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();
  const [serviceToDelete, setServiceToDelete] = useState<Service | undefined>();
  const { toast } = useToast();

  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      name: 'Web Hosting Pro',
      category: 'Hosting',
      price: '$9.99/mo',
      status: 'Active',
      customers: 156,
      features: ['10GB Storage', '100GB Bandwidth', 'SSL Certificate']
    },
    {
      id: 2,
      name: 'VPS Standard',
      category: 'VPS',
      price: '$29.99/mo',
      status: 'Active',
      customers: 89,
      features: ['2 CPU Cores', '4GB RAM', '50GB SSD']
    },
    {
      id: 3,
      name: 'Dedicated Server Pro',
      category: 'Dedicated',
      price: '$199.99/mo',
      status: 'Active',
      customers: 23,
      features: ['8 CPU Cores', '32GB RAM', '1TB SSD']
    },
    {
      id: 4,
      name: 'Cybersecurity Basic',
      category: 'Security',
      price: '$19.99/mo',
      status: 'Draft',
      customers: 0,
      features: ['Malware Protection', '24/7 Monitoring', 'Firewall']
    }
  ]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddService = () => {
    setSelectedService(undefined);
    setServiceModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setSelectedService(service);
    setServiceModalOpen(true);
  };

  const handleSaveService = (serviceData: Omit<Service, 'id' | 'customers'>) => {
    if (selectedService) {
      // Edit existing service
      setServices(services.map(service => 
        service.id === selectedService.id 
          ? { ...service, ...serviceData }
          : service
      ));
      toast({
        title: "Service Updated",
        description: "Service information has been updated successfully.",
      });
    } else {
      // Add new service
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...serviceData,
        customers: 0
      };
      setServices([...services, newService]);
      toast({
        title: "Service Added",
        description: "New service has been added successfully.",
      });
    }
  };

  const handleDeleteService = (service: Service) => {
    setServiceToDelete(service);
    setConfirmModalOpen(true);
  };

  const confirmDelete = () => {
    if (serviceToDelete) {
      setServices(services.filter(service => service.id !== serviceToDelete.id));
      toast({
        title: "Service Deleted",
        description: "Service has been deleted successfully.",
      });
      setServiceToDelete(undefined);
      setConfirmModalOpen(false);
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
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              {getTranslation(currentLanguage, 'serviceManagement')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              {getTranslation(currentLanguage, 'manageServicePlans')}
            </p>
          </div>
          <Button 
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
            onClick={handleAddService}
          >
            <Plus className="h-4 w-4 mr-2" />
            {getTranslation(currentLanguage, 'addService')}
          </Button>
        </div>

        {/* Search */}
        <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder={`${getTranslation(currentLanguage, 'search')} services by name or category...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600"
              />
            </div>
          </CardContent>
        </Card>

        {/* Service Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'totalServices')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">{services.length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'activeServices')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{services.filter(s => s.status === 'Active').length}</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'totalCustomers')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{services.reduce((sum, s) => sum + s.customers, 0)}</div>
            </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {getTranslation(currentLanguage, 'monthlyRevenue')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">$8,432</div>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-slate-800 dark:text-slate-200">{service.name}</CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400">{service.category}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(service.status)}>
                    {getTranslation(currentLanguage, service.status.toLowerCase())}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">{service.price}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">{service.customers} customers</span>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      {getTranslation(currentLanguage, 'features')}:
                    </h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4 mr-1" />
                      {getTranslation(currentLanguage, 'edit')}
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Settings className="h-4 w-4 mr-1" />
                      {getTranslation(currentLanguage, 'configure')}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDeleteService(service)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <ServiceModal
          isOpen={serviceModalOpen}
          onClose={() => setServiceModalOpen(false)}
          onSave={handleSaveService}
          service={selectedService}
          language={currentLanguage}
        />

        <ConfirmModal
          isOpen={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Service"
          message={`Are you sure you want to delete ${serviceToDelete?.name}? This action cannot be undone.`}
          language={currentLanguage}
        />
      </div>
    </DashboardLayout>
  );
};

export default AdminServices;
