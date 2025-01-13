import { useState, useEffect } from 'react';
import { CheckCircle, ShoppingBag, ArrowRight, Home } from 'lucide-react';

const SuccessPage = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50 flex items-center justify-center p-4">
      <div
        className={`max-w-2xl w-full transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        {/* Main Success Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex justify-center mb-6">
            <div className="animate-bounce">
              <CheckCircle className="w-20 h-20 text-green-500" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Payment Successful!
          </h1>

          <p className="text-lg text-gray-600 text-center mb-8">
            Thank you for your purchase. Your order has been processed
            successfully.
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <button className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              <ShoppingBag className="w-5 h-5 mr-2" />
              View Order
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>

            <button className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </button>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">Order Number</p>
                <p className="text-lg font-semibold text-gray-800">#12345</p>
              </div>
              <div className="p-4 border-x border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Date</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                <p className="text-lg font-semibold text-gray-800">$99.99</p>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Alert Component */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <div>
            <h3 className="text-green-800 font-medium text-sm">
              Order Confirmation Sent
            </h3>
            <p className="text-green-700 text-sm mt-1">
              We've sent a confirmation email with your order details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
