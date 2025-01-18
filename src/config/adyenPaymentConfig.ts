import {
  Card,
  GooglePay,
  PayPal,
  CoreConfiguration,
  DropinConfiguration,
} from '@adyen/adyen-web';

interface AdyenPaymentConfig {
  id: string;
  sessionData: string;
  value: number;
  currency: string;
}

const globalConfiguration = ({
  id,
  sessionData,
  value,
  currency,
  setCompleted,
}: AdyenPaymentConfig & {
  setCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}): CoreConfiguration => {
  return {
    session: {
      id: id,
      sessionData: sessionData,
    },
    environment: 'test',
    amount: {
      value: value,
      currency: currency,
    },
    locale: 'en-US',
    countryCode: 'SA',
    clientKey: import.meta.env.VITE_CLIENT_KEY,
    onPaymentCompleted: (result) => {
      if (result.resultCode === 'Authorised') {
        setCompleted(true);
      }
    },
    onPaymentFailed: (result, component) => {
      console.error('Payment Failed', result, component);
    },
    onError: (error) => {
      console.error('Error occurred:', error);
    },
  };
};

// Drop-in Configuration
const dropinConfiguration: DropinConfiguration = {
  paymentMethodComponents: [Card, PayPal, GooglePay],
  instantPaymentTypes: ['applepay', 'googlepay'],
  onReady: () => {
    console.log('Drop-in is ready');
  },
  onSelect: (component) => {
    console.log('Payment method selected:', component);
  },
};

export { globalConfiguration, dropinConfiguration };
