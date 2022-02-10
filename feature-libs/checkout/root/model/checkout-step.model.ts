export enum CheckoutStepType {
  SHIPPING_ADDRESS = 'shippingAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  PAYMENT_TYPE = 'paymentType',
}

export const checkoutShippingSteps = [
  CheckoutStepType.SHIPPING_ADDRESS,
  CheckoutStepType.DELIVERY_MODE,
];

export const checkoutPaymentSteps = [
  CheckoutStepType.PAYMENT_DETAILS,
  CheckoutStepType.PAYMENT_TYPE,
  CheckoutStepType.SHIPPING_ADDRESS,
];

export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
}
