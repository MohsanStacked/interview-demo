import { useEffect, useState, useRef } from 'react';
import { AdyenCheckout, Dropin } from '@adyen/adyen-web'; // Importing from the package
import '@adyen/adyen-web/styles/adyen.css'; // Import Adyen styles
import { useCart } from '../context/CartContext';
import {
  globalConfiguration,
  dropinConfiguration,
} from '../config/adyenPaymentConfig';

import SuccessPage from './SuccessPage';
interface AdyenPaymentConfig {
  id: string;
  sessionData: string;
  value: number;
  currency: string;
}

const CheckoutPage = () => {
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const { cart } = useCart();
  const dropinContainerRef = useRef<HTMLDivElement>(null);
  const currency_ = 'EUR';
  const [isLoading, setIsLoading] = useState(true);
  const [checkoutConfig, setCheckoutConfig] =
    useState<AdyenPaymentConfig | null>(null);

  // First useEffect to fetch the configuration
  useEffect(() => {
    let isSubscribed = true;

    const totalPrice = cart.reduce((total, product) => {
      const price = Number(product.price) * product.quantity;
      if (isNaN(price)) {
        console.warn(`Invalid price for product: ${product.price}`);
        return total;
      }
      return total + price;
    }, 0);

    const fetchCheckoutConfig = async () => {
      try {
        const checkoutResponse = await fetch(
          'http://localhost:3001/api/adyen-checkout/initiatePayment',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: JSON.stringify({
              value: totalPrice,
              currency: currency_,
            }),
          }
        );

        if (!isSubscribed) return;

        const responseData: AdyenPaymentConfig = await checkoutResponse.json();
        setCheckoutConfig(responseData);
      } catch (error) {
        if (isSubscribed) {
          console.error('Failed to fetch checkout configuration', error);
        }
      }
    };

    fetchCheckoutConfig();

    return () => {
      isSubscribed = false;
    };
  }, [cart]);

  // Second useEffect to init Adyen checkout once we have both the config
  useEffect(() => {
    let isSubscribed = true;

    const initializeDropin = async () => {
      if (!checkoutConfig || !dropinContainerRef.current) {
        return;
      }

      try {
        setIsLoading(true);
        const { id, sessionData, value, currency } = checkoutConfig;
        const configParams = {
          id,
          sessionData,
          value,
          currency,
          setCompleted: setPaymentCompleted,
        };

        const checkoutInstance = await AdyenCheckout(
          globalConfiguration(configParams)
        );

        if (dropinContainerRef.current && isSubscribed) {
          const dropin = new Dropin(checkoutInstance, dropinConfiguration);
          dropin.mount(dropinContainerRef.current);
        }
      } catch (error) {
        if (isSubscribed) {
          console.error('Failed to initialize AdyenCheckout', error);
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    initializeDropin();

    return () => {
      isSubscribed = false;
    };
  }, [checkoutConfig]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-8">
      {paymentCompleted && !isLoading ? (
        <SuccessPage />
      ) : (
        <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Checkout
          </h1>
          <div className="mb-4">
            <h2 className="text-xl font-medium text-gray-700">Order Summary</h2>
            <div className="space-y-4 mt-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2 mb-2"
                >
                  <span className="text-lg text-gray-800">
                    {item.title} x {item.quantity}
                  </span>
                  <span className="text-lg text-gray-600">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-700">Total:</h2>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xl font-semibold text-gray-800">
                Total Price
              </span>
              <span className="text-xl font-semibold text-gray-800">
                $
                {cart
                  .reduce(
                    (total, product) =>
                      total + Number(product.price) * product.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>

          {/* Drop-in container */}
          <div className="mb-6" ref={dropinContainerRef}></div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
