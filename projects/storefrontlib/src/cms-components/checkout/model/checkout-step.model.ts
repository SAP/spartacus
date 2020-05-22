export enum CheckoutStepType {
  SHIPPING_ADDRESS = 'shippingAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
  PO_NUMBER = 'poNumber',
}

export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
}
