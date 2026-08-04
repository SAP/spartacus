/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { WindowRef } from '@spartacus/core';
import { PRE_LOGIN_CURRENCY_STORAGE_KEY } from './user-login-currency.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoginCurrencyPersistenceService {
  protected winRef = inject(WindowRef);

  savePreLoginCurrency(isocode: string): void {
    this.winRef.localStorage?.setItem(
      PRE_LOGIN_CURRENCY_STORAGE_KEY,
      JSON.stringify(isocode)
    );
  }

  getPreLoginCurrency(): string | null {
    const raw = this.winRef.localStorage?.getItem(
      PRE_LOGIN_CURRENCY_STORAGE_KEY
    );
    if (!raw) {
      return null;
    }
    try {
      return JSON.parse(raw) as string;
    } catch {
      return null;
    }
  }

  clearPreLoginCurrency(): void {
    this.winRef.localStorage?.removeItem(PRE_LOGIN_CURRENCY_STORAGE_KEY);
  }
}
