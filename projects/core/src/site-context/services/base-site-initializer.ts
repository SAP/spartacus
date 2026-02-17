/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { BaseSiteService } from '../facade/base-site.service';
import { BASE_SITE_CONTEXT_ID } from '../providers/context-ids';
import { SiteContextRoutesHandler } from './site-context-routes-handler';

@Injectable({ providedIn: 'root' })
export class BaseSiteInitializer {
  siteContextRoutesHandler = inject(SiteContextRoutesHandler);

  constructor(
    protected baseSiteService: BaseSiteService,
    protected configInit: ConfigInitializerService
  ) {}

  /**
   * Initializes the value of the base site
   *
   * @returns Promise that resolves when initialization is done.
   */
  initialize(): Promise<unknown> {
    return firstValueFrom(
      this.configInit.getStable('context').pipe(
        switchMap(() => this.siteContextRoutesHandler.initOnce()),
        switchMap(() => this.setFallbackValue())
      )
    );
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value taken from config, unless the active base site has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active base site value based on the default value from the config,
   * unless the active base site has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    const contextParam = getContextParameterDefault(
      config,
      BASE_SITE_CONTEXT_ID
    );
    if (!this.baseSiteService.isInitialized() && contextParam) {
      this.baseSiteService.setActive(contextParam);
    }
  }

}
