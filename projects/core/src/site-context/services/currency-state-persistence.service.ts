/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable, inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { StatePersistenceService } from '../../state/services/state-persistence.service';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade/currency.service';
import { CURRENCY_CONTEXT_ID } from '../providers/context-ids';

@Injectable({ providedIn: 'root' })
export class CurrencyStatePersistenceService {
  protected statePersistenceService = inject(StatePersistenceService);
  protected currencyService = inject(CurrencyService);
  protected config = inject(SiteContextConfig);


  protected initialized$ = new ReplaySubject<unknown>(1);

  public initSync(): Observable<unknown> {
    this.statePersistenceService.syncWithStorage({
      key: CURRENCY_CONTEXT_ID,
      state$: this.currencyService.getActive(),
      onRead: (state) => this.onRead(state),
    });
    return this.initialized$;
  }

  protected onRead(valueFromStorage: string | undefined): void {
    if (!this.currencyService.isInitialized() && valueFromStorage) {
      this.currencyService.setActive(valueFromStorage);
    }

    if (!this.initialized$.closed) {
      this.initialized$.next(undefined);
      this.initialized$.complete();
    }
  }
}
