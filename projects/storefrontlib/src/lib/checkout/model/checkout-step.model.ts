export enum CheckoutStepType {
  shippingAddress = 'shippingAddress',
  deliveryMode = 'deliveryMode',
  paymentDetails = 'paymentDetails',
  reviewOrder = 'reviewOrder',
}

export interface CheckoutStep {
  id: string;
  name: string;
  url: string;
  type: Array<CheckoutStepType>;
}
