import { Injectable } from '@angular/core';
import { facadeFactory, PaymentType, QueryState } from '@spartacus/core';
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
        'getSelectedPaymentTypeState',
        'isAccountPayment',
        'getPurchaseOrderNumberState',
      ],
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
  abstract getSelectedPaymentTypeState(): Observable<
    QueryState<PaymentType | undefined>
  >;
  /**
   * Get whether the selected payment type is "ACCOUNT" payment
   */
  abstract isAccountPayment(): Observable<boolean>;

  /**
   * Get purchase order number
   */
  abstract getPurchaseOrderNumberState(): Observable<
    QueryState<string | undefined>
  >;
}
