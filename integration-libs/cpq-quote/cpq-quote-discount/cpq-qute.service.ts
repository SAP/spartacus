/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// cpq-quote-status.service.ts
import { Injectable } from '@angular/core';
import { CartItemListComponentService } from '@spartacus/cart/base/components';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CpqQuoteService extends CartItemListComponentService{
  private isFlagSubject = new BehaviorSubject<boolean>(true); // Default value is true
  isFlag$ = this.isFlagSubject.asObservable();

  setIsFlag(value: boolean) {
    this.isFlagSubject.next(value);
  }
  showBasePriceWithDiscount(): boolean {
    return false;
  }
}
