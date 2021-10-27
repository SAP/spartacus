import { CheckoutStepType } from '@spartacus/checkout/root';

declare module '@spartacus/checkout/root' {
  enum CheckoutStepType {
    PAYMENT_TYPE = 'paymentType',
  }
}

(CheckoutStepType as any)['PAYMENT_TYPE'] = 'paymentType';
