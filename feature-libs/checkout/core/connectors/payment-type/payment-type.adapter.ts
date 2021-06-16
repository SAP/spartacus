import { PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';

export abstract class PaymentTypeAdapter {
  /**
   * Abstract method used to get available payment types
   */
  abstract loadPaymentTypes(): Observable<PaymentType[]>;

  /**
   * Abstract method used to set payment type to cart
   *
   * @param userId
   * @param cartId
   * @param typeCode
   * @param poNumber: purchase order number
   */
  abstract setPaymentType(
    userId: string,
    cartId: string,
    typeCode: string,
    poNumber?: string
  ): Observable<any>;
}
