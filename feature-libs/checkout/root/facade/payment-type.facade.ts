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
        'loadPaymentTypes',
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
   * Load the supported payment types
   */
  abstract loadPaymentTypes(): void;

  /**
   * Set payment type to cart
   * @param typeCode
   * @param poNumber : purchase order number
   */
  abstract setPaymentType(typeCode: string, poNumber?: string): void;

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
