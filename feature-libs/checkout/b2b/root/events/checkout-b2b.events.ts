import { CheckoutEvent } from '@spartacus/checkout/base/root';

/**
 * An abstract event for all the cost center related events.
 */
export abstract class CheckoutCostCenterEvent extends CheckoutEvent {}

/**
 * Fired when the cost center has been set.
 */
export class CostCenterSetEvent extends CheckoutCostCenterEvent {
  /**
   * Event's type
   */
  static readonly type = 'CostCenterSetEvent';

  /**
   * Cost center code
   */
  code: string;
}

/**
 * An abstract event for all the payment type related events.
 */
export abstract class CheckoutPaymentTypeEvent extends CheckoutEvent {}

/**
 * Fired when the payment type has been set
 */
export class PaymentTypeSetEvent extends CheckoutPaymentTypeEvent {
  /**
   * Event's type
   */
  static readonly type = 'PaymentTypeSetEvent';

  /**
   * Payment type code
   */
  paymentTypeCode: string;

  /**
   * Purchase order number
   */
  purchaseOrderNumber?: string;
}
