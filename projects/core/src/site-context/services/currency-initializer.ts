/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { CurrencyService } from '../facade';
import { CURRENCY_CONTEXT_ID } from '../providers';
import { CurrencyStatePersistenceService } from './currency-state-persistence.service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';

@Injectable({ providedIn: 'root' })
export class CurrencyInitializer {
  siteContextRoutesHandler = inject(SiteContextRoutesHandler);

  constructor(
    protected currencyService: CurrencyService,
    protected currencyStatePersistenceService: CurrencyStatePersistenceService,
    protected configInit: ConfigInitializerService
  ) {}

  /**
   * Initializes the value of the active currency.
   *
   * @returns Promise that resolves when initialization is done.
   */
  initialize(): Promise<unknown> {
    return firstValueFrom(
      this.configInit.getStable('context').pipe(
        switchMap(() => this.siteContextRoutesHandler.initOnce()),
        switchMap(() => this.currencyStatePersistenceService.initSync()),
        switchMap(() => this.setFallbackValue())
      )
    );
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value taken from config, unless the active currency has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active currency value based on the default value from the config,
   * unless the active currency has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    const contextParam = getContextParameterDefault(
      config,
      CURRENCY_CONTEXT_ID
    );
    if (!this.currencyService.isInitialized() && contextParam) {
      this.currencyService.setActive(contextParam);
    }
  }
}
