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
        'getSupportedDeliveryModes',
        'getSupportedDeliveryModesState',
        'setDeliveryMode',
        'getSelectedDeliveryMode',
        'clearCheckoutDeliveryMode',
      ],
      async: true,
    }),
})
export abstract class CheckoutDeliveryModesFacade {
  /**
   * Get supported delivery modes
   */
  abstract getSupportedDeliveryModes(): Observable<DeliveryMode[]>;

  abstract getSupportedDeliveryModesState(): Observable<
    QueryState<DeliveryMode[]>
  >;

  /**
   * Get selected delivery mode
   */
  abstract getSelectedDeliveryMode(): Observable<
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
