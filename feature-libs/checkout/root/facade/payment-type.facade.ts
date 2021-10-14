import { Injectable } from '@angular/core';
import { facadeFactory, PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: PaymentTypeFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getPaymentTypes',
        'setPaymentType',
        'getSelectedPaymentType',
        'isAccountPayment',
        'getPoNumber',
      ],
      async: true,
    }),
})
export abstract class PaymentTypeFacade {
  /**
   * Get payment types
   */
  abstract getPaymentTypes(): Observable<PaymentType[]>;

  /**
   * Set payment type to cart
   * @param paymentTypeCode
   * @param purchaseOrderNumber
   */
  abstract setPaymentType(
    paymentTypeCode: string,
    purchaseOrderNumber?: string
  ): Observable<unknown>;

  /**
   * Get the selected payment type
   */
  abstract getSelectedPaymentType(): Observable<string | undefined>;

  /**
   * Get whether the selected payment type is "ACCOUNT" payment
   */
  abstract isAccountPayment(): Observable<boolean>;

  /**
   * Get PO Number
   */
  abstract getPoNumber(): Observable<string | undefined>;
}
