
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CreditCard, Lock, Shield } from 'lucide-react';

interface StripePaymentProps {
  amount: number;
  description: string;
  onSuccess?: (paymentId: string) => void;
  onError?: (error: string) => void;
}

const StripePayment: React.FC<StripePaymentProps> = ({
  amount,
  description,
  onSuccess,
  onError
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    holderName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validatePayment = () => {
    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      return 'Please enter a valid card number';
    }
    if (!paymentData.expiryDate || paymentData.expiryDate.length < 5) {
      return 'Please enter a valid expiry date';
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      return 'Please enter a valid CVV';
    }
    if (!paymentData.holderName.trim()) {
      return 'Please enter the cardholder name';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validatePayment();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would integrate with Stripe's API here
      const mockPaymentId = 'pi_' + Math.random().toString(36).substr(2, 9);
      
      console.log('Payment processed:', {
        paymentId: mockPaymentId,
        amount: amount,
        description: description,
        // Note: Never log actual payment details in production
      });
      
      onSuccess?.(mockPaymentId);
    } catch (err) {
      const errorMessage = 'Payment processing failed. Please try again.';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
            <CreditCard className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <CardTitle>Secure Payment</CardTitle>
        <CardDescription>
          {description} - ${(amount / 100).toFixed(2)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="holderName">Cardholder Name</Label>
            <Input
              id="holderName"
              placeholder="John Doe"
              value={paymentData.holderName}
              onChange={(e) => handleInputChange('holderName', e.target.value)}
              disabled={loading}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Card Number</Label>
            <Input
              id="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              disabled={loading}
              maxLength={19}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                disabled={loading}
                maxLength={5}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                disabled={loading}
                maxLength={4}
                type="password"
              />
            </div>
          </div>

          {error && (
            <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-center text-sm text-slate-600 dark:text-slate-400 mb-4">
            <Lock className="h-4 w-4 mr-2" />
            <span>Secured by SSL encryption</span>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Pay ${(amount / 100).toFixed(2)}
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StripePayment;
