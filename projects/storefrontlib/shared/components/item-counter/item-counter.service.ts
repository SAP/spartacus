/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemCounterService {
  protected counter = 1;

  setCounter(value: number): void {
    if (value > 0) {
      this.counter = value;
    }
  }

  getCounter(): number {
    return this.counter;
  }
}
