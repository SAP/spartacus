import { Injectable } from '@angular/core';
import {
  CardType,
  facadeFactory,
  PaymentDetails,
  QueryState,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

export function checkoutPaymentFacadeFactory() {
  return facadeFactory({
    facade: CheckoutPaymentFacade,
    feature: CHECKOUT_CORE_FEATURE,
    methods: [
      'getCardTypes',
      'getPaymentDetails',
      'getSetPaymentDetailsResultProcess',
      'resetSetPaymentDetailsProcess',
      'createPaymentDetails',
      'setPaymentDetails',
    ],
    async: true,
  });
}

@Injectable({
  providedIn: 'root',
  useFactory: checkoutPaymentFacadeFactory,
})
export abstract class CheckoutPaymentFacade {
  /**
   * Get card types
   */
  abstract getCardTypes(): Observable<CardType[]>;

  /**
   * Get payment details
   */
  abstract getPaymentDetails(): Observable<PaymentDetails | undefined>;

  /**
   * Get status about set Payment Details process
   */
  abstract getSetPaymentDetailsResultProcess(): Observable<
    QueryState<PaymentDetails>
  >;

  /**
   * Clear info about process of setting Payment Details
   */
  abstract resetSetPaymentDetailsProcess(): void;

  /**
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  abstract createPaymentDetails(
    paymentDetails: PaymentDetails
  ): Observable<unknown>;

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  abstract setPaymentDetails(
    paymentDetails: PaymentDetails
  ): Observable<unknown>;
}
