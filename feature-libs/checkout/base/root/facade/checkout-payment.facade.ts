import { Injectable } from '@angular/core';
import {
  CardType,
  facadeFactory,
  PaymentDetails,
  QueryState,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutPaymentFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getCardTypes',
        'getPaymentDetails',
        'createPaymentDetails',
        'setPaymentDetails',
      ],
      async: true,
    }),
})
export abstract class CheckoutPaymentFacade {
  /**
   * Get card types
   */
  abstract getCardTypes(): Observable<CardType[]>;

  /**
   * Get payment details
   */
  abstract getPaymentDetails(): Observable<
    QueryState<PaymentDetails | undefined>
  >;

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
