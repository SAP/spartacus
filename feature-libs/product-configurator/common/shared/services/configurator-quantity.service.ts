/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Holds the quantity used when adding a product-bound configuration to the cart.
 *
 * Import this service from `@spartacus/product-configurator/common`. The rulebased
 * entry point re-export is deprecated since 221121.21 and planned for removal.
 *
 * To implement a custom solution, provide your own implementation and customize
 * services that use {@link ConfiguratorQuantityService}.
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorQuantityService {
  private readonly quantitySubject = new BehaviorSubject<number>(1);

  /**
   * Sets the configuration quantity.
   *
   * @param quantity - Quantity for add-to-cart from the configuration page
   */
  public setQuantity(quantity: number): void {
    this.quantitySubject.next(quantity);
  }

  /**
   * Retrieves the configuration quantity.
   *
   * @returns Configuration quantity
   */
  public getQuantity(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
}
