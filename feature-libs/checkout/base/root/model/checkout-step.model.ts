export const enum CheckoutStepType {
  SHIPPING_ADDRESS = 'shippingAddress',
  DELIVERY_MODE = 'deliveryMode',
  PAYMENT_DETAILS = 'paymentDetails',
  REVIEW_ORDER = 'reviewOrder',
}

/**
 * TODO:#checkout - either:
 * 1. pursue Marcin's idea of removing it altogether, if possible
 * 2. augment it in the schedule repl
 */
export enum ORDER_TYPE {
  PLACE_ORDER = 'PLACE_ORDER',
  SCHEDULE_REPLENISHMENT_ORDER = 'SCHEDULE_REPLENISHMENT_ORDER',
}

export interface CheckoutStep {
  id: string;
  name: string;
  routeName: string;
  type: Array<CheckoutStepType>;
  disabled?: boolean;
}
