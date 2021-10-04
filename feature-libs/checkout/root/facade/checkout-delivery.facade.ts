import { Injectable } from '@angular/core';
import {
  Address,
  DeliveryMode,
  facadeFactory,
  QueryState,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { CHECKOUT_CORE_FEATURE } from '../feature-name';

@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: CheckoutDeliveryFacade,
      feature: CHECKOUT_CORE_FEATURE,
      methods: [
        'getSupportedDeliveryModes',
        'getSupportedDeliveryModesState',
        'getSelectedDeliveryMode',
        'getSelectedDeliveryModeCode',
        'getDeliveryAddress',
        'createAndSetAddress',
        'setDeliveryMode',
        'setDeliveryAddress',
        'clearCheckoutDeliveryAddress',
        'clearCheckoutDeliveryMode',
        'clearCheckoutDeliveryDetails',
      ],
      async: true,
    }),
})
export abstract class CheckoutDeliveryFacade {
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
    DeliveryMode | undefined | null
  >;

  /**
   * Get selected delivery mode code
   */
  abstract getSelectedDeliveryModeCode(): Observable<string>;

  /**
   * Get delivery address
   */
  abstract getDeliveryAddress(): Observable<Address>;

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  abstract createAndSetAddress(address: Address): Observable<unknown>;

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  abstract setDeliveryMode(mode: string): Observable<unknown>;

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  abstract setDeliveryAddress(address: Address): Observable<unknown>;

  /**
   * Clear address already setup in last checkout process
   */
  abstract clearCheckoutDeliveryAddress(): void;

  /**
   * Clear selected delivery mode setup in last checkout process
   */
  abstract clearCheckoutDeliveryMode(): void;

  /**
   * Clear address and delivery mode already setup in last checkout process
   */
  abstract clearCheckoutDeliveryDetails(): void;
}
