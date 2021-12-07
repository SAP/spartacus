import { Injectable } from '@angular/core';
import {
  Address,
  DeliveryMode,
  facadeFactory,
  StateUtils,
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
        'getSelectedDeliveryMode',
        'getSelectedDeliveryModeCode',
        'getDeliveryAddress',
        'getSetDeliveryAddressProcess',
        'resetSetDeliveryAddressProcess',
        'getSetDeliveryModeProcess',
        'getSetDeliveryModeInProcess',
        'resetSetDeliveryModeProcess',
        'resetLoadSupportedDeliveryModesProcess',
        'getLoadSupportedDeliveryModeProcess',
        'clearCheckoutDeliveryModes',
        'createAndSetAddress',
        'loadSupportedDeliveryModes',
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
   * Get status about successfully set Delivery Address
   */
  abstract getSetDeliveryAddressProcess(): Observable<
    StateUtils.LoaderState<void>
  >;

  /**
   * Clear info about process of setting Delivery Address
   */
  abstract resetSetDeliveryAddressProcess(): void;

  /**
   * Get status about of set Delivery Mode process
   */
  abstract getSetDeliveryModeProcess(): Observable<
    StateUtils.LoaderState<void>
  >;

  /**
   * Get info about process of setting Delivery Mode, which is done by a HTTP PUT request followed by two HTTP GET request.
   * True means at least one quest is still in process, false means all three requests are done
   */
  abstract getSetDeliveryModeInProcess(): Observable<boolean>;
  /**
   * Clear info about process of setting Delivery Mode
   */
  abstract resetSetDeliveryModeProcess(): void;

  /**
   * Clear info about process of setting Supported Delivery Modes
   */
  abstract resetLoadSupportedDeliveryModesProcess(): void;

  /**
   * Get status about of set supported Delivery Modes process
   */
  abstract getLoadSupportedDeliveryModeProcess(): Observable<
    StateUtils.LoaderState<void>
  >;

  /**
   * Clear supported delivery modes loaded in last checkout process
   */
  abstract clearCheckoutDeliveryModes(): void;

  /**
   * Create and set a delivery address using the address param
   * @param address : the Address to be created and set
   */
  abstract createAndSetAddress(address: Address): void;

  /**
   * Load supported delivery modes
   */
  abstract loadSupportedDeliveryModes(): void;

  /**
   * Set delivery mode
   * @param mode : The delivery mode to be set
   */
  abstract setDeliveryMode(mode: string): void;

  /**
   * Set delivery address
   * @param address : The address to be set
   */
  abstract setDeliveryAddress(address: Address): void;

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
