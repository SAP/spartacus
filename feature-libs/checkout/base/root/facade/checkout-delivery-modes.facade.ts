import { Injectable } from '@angular/core';
import { DeliveryMode, facadeFactory, QueryState } from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutDeliveryModesFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getSupportedDeliveryModesState',
        'setDeliveryMode',
        'getSelectedDeliveryModeState',
        'clearCheckoutDeliveryMode',
      ],
      async: true,
    }),
})
export abstract class CheckoutDeliveryModesFacade {
  /**
   * Get the supported delivery modes state.
   */
  abstract getSupportedDeliveryModesState(): Observable<
    QueryState<DeliveryMode[]>
  >;

  /**
   * Get selected delivery mode
   */
  abstract getSelectedDeliveryModeState(): Observable<
    QueryState<DeliveryMode | undefined>
  >;

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  abstract setDeliveryMode(mode: string): Observable<unknown>;

  /**
   * Clear selected delivery mode setup in last checkout process
   */
  abstract clearCheckoutDeliveryMode(): Observable<unknown>;
}
