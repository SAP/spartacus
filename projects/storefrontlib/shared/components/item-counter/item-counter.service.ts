/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemCounterService {
  protected counter = 1;

  protected isInitialProductCounter(
    input?: ElementRef<HTMLInputElement>
  ): boolean {
    const wrapperClass = 'cx-counter-stock';
    return Boolean(
      input?.nativeElement.offsetParent?.className === wrapperClass
    );
  }

  setCounter(value: number, input?: ElementRef<HTMLInputElement>): void {
    if (value > 0 && this.isInitialProductCounter(input)) {
      this.counter = value;
    }
  }

  getCounter(): number {
    return this.counter;
  }
}
