/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class QuoteStorefrontUtilsService {
  protected windowRef = inject(WindowRef);

  /**
   * Retrieves HTML element based on querySelector when running in browser.
   *
   * @param querySelector - querySelector
   * @returns selected HTML element
   */
  getElement(querySelector: string): HTMLElement | undefined {
    if (this.windowRef.isBrowser()) {
      return this.windowRef.document.querySelector(
        querySelector
      ) as HTMLElement;
    }
  }
}
