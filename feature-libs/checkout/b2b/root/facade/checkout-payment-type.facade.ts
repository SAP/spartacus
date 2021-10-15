import { Injectable } from '@angular/core';
import { facadeFactory, PaymentType } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_B2B_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutPaymentTypeFacade,
      feature: CHECKOUT_B2B_CORE_FEATURE,
      methods: [
        'getPaymentTypes',
        'setPaymentType',
        'getSelectedPaymentType',
        'isAccountPayment',
        'getPurchaseOrderNumber',
      ],
      async: true,
    }),
})
export abstract class CheckoutPaymentTypeFacade {
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
  abstract getSelectedPaymentType(): Observable<PaymentType | undefined>;

  /**
   * Get whether the selected payment type is "ACCOUNT" payment
   */
  abstract isAccountPayment(): Observable<boolean>;

  /**
   * Get purchase order number
   */
  abstract getPurchaseOrderNumber(): Observable<string | undefined>;
}
