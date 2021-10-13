import { Injectable } from '@angular/core';
import {
  Address,
  CostCenter,
  DeliveryMode,
  facadeFactory,
  PaymentDetails,
  QueryState,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

export interface CheckoutState {
  deliveryAddress?: Address;
  deliveryMode?: DeliveryMode;
  paymentInfo?: PaymentDetails;
  costCenter?: CostCenter; // TODO move to checkout b2b entry point and use augmentation
}

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutQueryFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: ['getCheckoutDetails', 'getCheckoutDetailsState'],
    }),
})
export abstract class CheckoutQueryFacade {
  abstract getCheckoutDetails(): Observable<CheckoutState | undefined>;

  abstract getCheckoutDetailsState(): Observable<QueryState<CheckoutState>>;
}
