import { PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class CheckoutPaymentTypeAdapter {
  /**
   * Abstract method used to get available payment types
   */
  abstract getPaymentTypes(): Observable<PaymentType[]>;

  /**
   * Abstract method used to set payment type to cart
   */
  abstract setPaymentType(
    userId: string,
    cartId: string,
    typeCode: string,
    purchaseOrderNumber?: string
  ): Observable<unknown>;
}
