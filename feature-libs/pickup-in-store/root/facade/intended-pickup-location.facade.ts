/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { facadeFactory } from '@spartacus/core';
import { Observable } from 'rxjs';
import { PICKUP_IN_STORE_CORE_FEATURE } from '../feature-name';
import {
  AugmentedPointOfService,
  PickupOption,
} from '../model/pickup-option.model';

/**
 * Store the Point of Service a user wants to collect a product from before it is added to the cart.
 */
@Injectable({
  providedIn: 'root',
  useFactory: () =>
    facadeFactory({
      facade: IntendedPickupLocationFacade,
      feature: PICKUP_IN_STORE_CORE_FEATURE,
      methods: [
        'getIntendedLocation',
        'setIntendedLocation',
        'removeIntendedLocation',
        'getPickupOption',
        'setPickupOption',
      ],
      async: true,
    }),
})
export abstract class IntendedPickupLocationFacade {
  /**
   * Get the Point of Service a user wants to collect a product from before it is added to the cart.
   * @param productCode The product code of the product the user wants to collect.
   */
  abstract getIntendedLocation(
    productCode: string
  ): Observable<AugmentedPointOfService | undefined>;

  /**
   * Set the Point of Service a user wants to collect a product from before it is added to the cart.
   * @param productCode The product code of the product the user wants to collect.
   * @param location The Point of Service the user wants to collect the product from.
   */
  abstract setIntendedLocation(
    productCode: string,
    location: AugmentedPointOfService
  ): void;

  /**
   * Remove the Point of Service a user wanted to collect a product from before it was to be added to the cart.
   * @param productCode The product code of the product the user wants to collect.
   */
  abstract removeIntendedLocation(productCode: string): void;

  /**
   * Get the Pickup Option ('pickup' or 'delivery') a user wants
   * @param productCode The product code of the product the user wants to collect.
   */
  abstract getPickupOption(productCode: string): Observable<PickupOption>;

  /**
   * Set the Pickup Option ('pickup' or 'delivery') a user wants
   * @param productCode The product code of the product the user wants to set the pickup location for.
   */
  abstract setPickupOption(
    productCode: string,
    pickupOption: PickupOption
  ): void;
}
