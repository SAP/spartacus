/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CpqQuoteService {
  private isFlagSubject = new BehaviorSubject<boolean>(true); // Default value is true
  isFlag$ = this.isFlagSubject.asObservable();

  setFlag(value: boolean) {
    this.isFlagSubject.next(value);
  }
  getFlag$() {
    return this.isFlagSubject.getValue();
  }
}
