import { Injectable } from '@angular/core';
import { Address, facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutDeliveryFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getDeliveryAddress',
        'createAndSetAddress',
        'setDeliveryAddress',
        'clearCheckoutDeliveryAddress',
        'clearCheckoutDeliveryDetails',
      ],
      async: true,
    }),
})
export abstract class CheckoutDeliveryFacade {
  /**
   * Get delivery address
   */
  abstract getDeliveryAddress(): Observable<QueryState<Address | undefined>>;

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  abstract createAndSetAddress(address: Address): Observable<unknown>;

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  abstract setDeliveryAddress(address: Address): Observable<unknown>;

  /**
   * Clear address already setup in last checkout process
   */
  abstract clearCheckoutDeliveryAddress(): Observable<unknown>;

  /**
   * Clear address and delivery mode already setup in last checkout process
   */
  abstract clearCheckoutDeliveryDetails(): void;
}
