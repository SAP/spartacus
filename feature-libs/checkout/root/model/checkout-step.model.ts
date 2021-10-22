export enum CheckoutStepType {
  SHIPPING_ADDRESS = 'shippingAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  // TODO: augment
  PAYMENT_TYPE = 'paymentType',
}

export const checkoutShippingSteps: CheckoutStepType[] = [
  CheckoutStepType.SHIPPING_ADDRESS,
  CheckoutStepType.DELIVERY_MODE,
];

export const checkoutPaymentSteps: CheckoutStepType[] = [
  CheckoutStepType.PAYMENT_DETAILS,
  // TODO: augment?
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
