
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LanguageSelector from '@/components/LanguageSelector';
import ServiceCard from '@/components/ServiceCard';
import { Globe, Server, Shield, Database } from 'lucide-react';

const Landing = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const navigate = useNavigate();

  const translations = {
    en: {
      title: 'Sell Your Digital Services',
      subtitle: 'Select your preferred language (English, Portuguese or Spanish) from this page.',
      getStarted: 'Get Started',
      login: 'Login',
      hosting: 'Hosting',
      hostingDesc: 'Reliable website hosting solutions',
      vps: 'VPS',
      vpsDesc: 'Scalable virtual private servers',
      dedicated: 'Dedicated Server',
      dedicatedDesc: 'Powerful dedicated server hosting',
      cybersecurity: 'Cybersecurity Plan',
      cybersecurityDesc: 'Comprehensive cybersecurity plan',
      choosePlan: 'Choose the plan that fits your needs',
      viewPlans: 'View Plans',
      features: {
        hosting: ['99.9% Uptime', '24/7 Support', 'Free SSL Certificate', 'Daily Backups'],
        vps: ['Full Root Access', 'SSD Storage', 'Scalable Resources', 'Multiple OS Options'],
        dedicated: ['Dedicated Resources', 'High Performance', 'Custom Configuration', 'Priority Support'],
        cybersecurity: ['Real-time Monitoring', 'Threat Detection', 'Security Reports', 'Emergency Response']
      }
    },
    pt: {
      title: 'Venda Seus Serviços Digitais',
      subtitle: 'Selecione seu idioma preferido (Inglês, Português ou Espanhol) nesta página.',
      getStarted: 'Começar',
      login: 'Entrar',
      hosting: 'Hospedagem',
      hostingDesc: 'Soluções confiáveis de hospedagem de sites',
      vps: 'VPS',
      vpsDesc: 'Servidores virtuais privados escaláveis',
      dedicated: 'Servidor Dedicado',
      dedicatedDesc: 'Hospedagem poderosa em servidor dedicado',
      cybersecurity: 'Plano de Cibersegurança',
      cybersecurityDesc: 'Plano abrangente de cibersegurança',
      choosePlan: 'Escolha o plano que atende suas necessidades',
      viewPlans: 'Ver Planos',
      features: {
        hosting: ['99.9% Uptime', 'Suporte 24/7', 'Certificado SSL Gratuito', 'Backups Diários'],
        vps: ['Acesso Root Completo', 'Armazenamento SSD', 'Recursos Escaláveis', 'Múltiplas Opções de SO'],
        dedicated: ['Recursos Dedicados', 'Alta Performance', 'Configuração Personalizada', 'Suporte Prioritário'],
        cybersecurity: ['Monitoramento em Tempo Real', 'Detecção de Ameaças', 'Relatórios de Segurança', 'Resposta de Emergência']
      }
    },
    es: {
      title: 'Vende Tus Servicios Digitales',
      subtitle: 'Selecciona tu idioma preferido (Inglés, Portugués o Español) desde esta página.',
      getStarted: 'Comenzar',
      login: 'Iniciar Sesión',
      hosting: 'Hosting',
      hostingDesc: 'Soluciones confiables de hosting web',
      vps: 'VPS',
      vpsDesc: 'Servidores virtuales privados escalables',
      dedicated: 'Servidor Dedicado',
      dedicatedDesc: 'Hosting potente en servidor dedicado',
      cybersecurity: 'Plan de Ciberseguridad',
      cybersecurityDesc: 'Plan integral de ciberseguridad',
      choosePlan: 'Elige el plan que se adapte a tus necesidades',
      viewPlans: 'Ver Planes',
      features: {
        hosting: ['99.9% Uptime', 'Soporte 24/7', 'Certificado SSL Gratuito', 'Respaldos Diarios'],
        vps: ['Acceso Root Completo', 'Almacenamiento SSD', 'Recursos Escalables', 'Múltiples Opciones de SO'],
        dedicated: ['Recursos Dedicados', 'Alto Rendimiento', 'Configuración Personalizada', 'Soporte Prioritario'],
        cybersecurity: ['Monitoreo en Tiempo Real', 'Detección de Amenazas', 'Reportes de Seguridad', 'Respuesta de Emergencia']
      }
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  const services = [
    {
      icon: <Globe className="h-8 w-8" />,
      title: t.hosting,
      description: t.hostingDesc,
      features: t.features.hosting,
      price: '$9.99/mo'
    },
    {
      icon: <Server className="h-8 w-8" />,
      title: t.vps,
      description: t.vpsDesc,
      features: t.features.vps,
      price: '$29.99/mo',
      popular: true
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: t.dedicated,
      description: t.dedicatedDesc,
      features: t.features.dedicated,
      price: '$199.99/mo'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t.cybersecurity,
      description: t.cybersecurityDesc,
      features: t.features.cybersecurity,
      price: '$49.99/mo'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg mr-3"></div>
            <span className="text-xl font-bold text-slate-800">DigitalServices</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector 
              currentLanguage={currentLanguage}
              onLanguageChange={setCurrentLanguage}
              variant="landing"
            />
            <Button 
              variant="ghost" 
              onClick={() => navigate('/login')}
              className="text-slate-600 hover:text-slate-800"
            >
              {t.login}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
            {t.title}
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <Button 
            onClick={() => navigate('/signup')}
            size="lg"
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {t.getStarted}
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                {...service}
                onClick={() => navigate('/signup')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                {t.choosePlan}
              </h2>
              <Button 
                onClick={() => navigate('/signup')}
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-4 text-lg rounded-full"
              >
                {t.viewPlans}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Landing;
