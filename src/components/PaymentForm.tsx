import React, { useState } from 'react';
import { CreditCard, AlertCircle } from 'lucide-react';
import { PaymentMethod } from '../types';

interface PaymentFormProps {
  amount: number;
  onPaymentComplete: (method: PaymentMethod) => void;
  isDarkMode: boolean;
}

const UPI_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;

export function PaymentForm({ amount, onPaymentComplete, isDarkMode }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  const validateUpiId = (id: string) => {
    if (!id) return 'UPI ID is required';
    if (!UPI_REGEX.test(id)) return 'Invalid UPI ID format (e.g., username@upi)';
    return '';
  };

  const handleUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUpiId(value);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (paymentMethod === 'upi') {
      const upiError = validateUpiId(upiId);
      if (upiError) {
        setError(upiError);
        return;
      }
    }

    setProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    onPaymentComplete(paymentMethod);
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-6 rounded-lg shadow-lg`}>
      <div className="flex items-center space-x-2 mb-6">
        <CreditCard className="h-6 w-6 text-indigo-600" />
        <h2 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : ''}`}>Payment Details</h2>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-baseline">
          <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Total Amount:</span>
          <span className="text-2xl font-bold text-indigo-600">${amount}</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-4">
          {['credit_card', 'debit_card', 'upi'].map((method) => (
            <button
              key={method}
              onClick={() => {
                setPaymentMethod(method as PaymentMethod);
                setError('');
              }}
              className={`flex-1 py-2 px-4 rounded-lg border ${
                paymentMethod === method
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                  : isDarkMode
                  ? 'border-gray-600 text-gray-300'
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              {method.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
          <>
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Card Number
              </label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                className={`w-full px-3 py-2 rounded-md ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'border-gray-300'
                } focus:ring-indigo-500 focus:border-indigo-500`}
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  Expiry Date
                </label>
                <input
                  type="text"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  } focus:ring-indigo-500 focus:border-indigo-500`}
                  required
                />
              </div>
              <div className="flex-1">
                <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                  CVV
                </label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  className={`w-full px-3 py-2 rounded-md ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'border-gray-300'
                  } focus:ring-indigo-500 focus:border-indigo-500`}
                  required
                />
              </div>
            </div>
          </>
        )}

        {paymentMethod === 'upi' && (
          <div>
            <label className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
              UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={handleUpiChange}
              placeholder="username@upi"
              className={`w-full px-3 py-2 rounded-md ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'border-gray-300'
              } focus:ring-indigo-500 focus:border-indigo-500 ${error ? 'border-red-500' : ''}`}
              required
            />
            {error && (
              <div className="mt-2 flex items-center space-x-1 text-red-500">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            <p className={`mt-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Enter your UPI ID in the format: username@upi
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={processing || (paymentMethod === 'upi' && !!error)}
          className={`w-full ${
            isDarkMode
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-indigo-600 hover:bg-indigo-700'
          } text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200`}
        >
          {processing ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>
    </div>
  );
}