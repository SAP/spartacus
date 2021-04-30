export enum CheckoutStepType {
  SHIPPING_ADDRESS = 'shippingAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  PAYMENT_TYPE = 'paymentType',
}

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const checkoutShippingSteps = [
  CheckoutStepType.SHIPPING_ADDRESS,
  CheckoutStepType.DELIVERY_MODE,
];

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export const checkoutPaymentSteps = [
  CheckoutStepType.PAYMENT_DETAILS,
  CheckoutStepType.PAYMENT_TYPE,
  CheckoutStepType.SHIPPING_ADDRESS,
];

/**
 * @deprecated since 4.0, use checkout feature lib instead.
 */
export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
}
