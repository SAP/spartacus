import { CheckoutEvent } from '@spartacus/checkout/root';

export class CostCenterSetEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'CostCenterSetEvent';

  /**
   * Cost center code
   */
  code: string;
}

export class PaymentTypeSetEvent extends CheckoutEvent {
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
