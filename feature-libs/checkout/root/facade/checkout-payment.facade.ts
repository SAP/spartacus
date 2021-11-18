import { Injectable } from '@angular/core';
import {
  CardType,
  facadeFactory,
  PaymentDetails,
  StateUtils,
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
        'getSetPaymentDetailsResultProcess',
        'resetSetPaymentDetailsProcess',
        'loadSupportedCardTypes',
        'createPaymentDetails',
        'setPaymentDetails',
        'paymentProcessSuccess',
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
  abstract getPaymentDetails(): Observable<PaymentDetails>;

  /**
   * Get status about set Payment Details process
   */
  abstract getSetPaymentDetailsResultProcess(): Observable<
    StateUtils.LoaderState<void>
  >;

  /**
   * Clear info about process of setting Payment Details
   */
  abstract resetSetPaymentDetailsProcess(): void;

  /**
   * Load the supported card types
   */
  abstract loadSupportedCardTypes(): void;

  /**
   * Create payment details using the given paymentDetails param
   * @param paymentDetails: the PaymentDetails to be created
   */
  abstract createPaymentDetails(paymentDetails: PaymentDetails): void;

  /**
   * Set payment details
   * @param paymentDetails : the PaymentDetails to be set
   */
  abstract setPaymentDetails(paymentDetails: PaymentDetails): void;

  /**
   * Sets payment loading to true without having the flicker issue (GH-3102)
   */
  abstract paymentProcessSuccess(): void;
}
