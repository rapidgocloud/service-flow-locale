
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  price?: string;
  popular?: boolean;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  features,
  price,
  popular = false,
  onClick
}) => {
  return (
    <Card className={`relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      popular ? 'border-cyan-500 shadow-cyan-100' : 'border-slate-200'
    }`}>
      {popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-cyan-50 to-blue-50 text-cyan-600">
            {icon}
          </div>
        </div>
        <CardTitle className="text-xl font-semibold text-slate-800">{title}</CardTitle>
        <CardDescription className="text-slate-600">{description}</CardDescription>
        {price && (
          <div className="text-2xl font-bold text-slate-800 mt-2">{price}</div>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-slate-600">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          onClick={onClick}
          className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
