/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * To implement custom solution provide your own implementation and customize services that use ConfiguratorQuantityService
 */
@Injectable({
  providedIn: 'root',
})
export class ConfiguratorQuantityService {
  private quantitySubject = new BehaviorSubject<number>(1);

  /**
   * Sets the configuration quantity.
   *
   * @param quantity
   */
  public setQuantity(quantity: number): void {
    this.quantitySubject.next(quantity);
  }

  /**
   * Retrieves the configuration quantity.
   *
   * @returns {Observable<number>} - Configuration quantity.
   */
  public getQuantity(): Observable<number> {
    return this.quantitySubject.asObservable();
  }
}
