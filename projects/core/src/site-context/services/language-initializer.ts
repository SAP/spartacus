/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { FederatedLoginService } from '../../federated-login/services';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { LanguageStatePersistenceService } from './language-state-persistence.service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';

@Injectable({ providedIn: 'root' })
export class LanguageInitializer {
  siteContextRoutesHandler = inject(SiteContextRoutesHandler);
  federatedLoginService = inject(FederatedLoginService);

  constructor(
    protected languageService: LanguageService,
    protected languageStatePersistenceService: LanguageStatePersistenceService,
    protected configInit: ConfigInitializerService
  ) {}

  /**
   * Initializes the value of the active language.
   *
   * @returns Promise that resolves when initialization is done.
   */
  initialize(): Promise<unknown> {
    return firstValueFrom(
      this.configInit.getStable('context').pipe(
        switchMap(() => this.setFromFederatedLoginContext()),
        switchMap(() => this.siteContextRoutesHandler.initOnce()),
        switchMap(() => this.languageStatePersistenceService.initSync()),
        switchMap(() => this.setFallbackValue())
      )
    );
  }

  /**
   * On subscription to the returned observable:
   *
   * Sets the default value taken from config, unless the active language has been already initialized.
   */
  protected setFallbackValue(): Observable<unknown> {
    return this.configInit
      .getStable('context')
      .pipe(
        tap((config: SiteContextConfig) => this.setDefaultFromConfig(config))
      );
  }

  /**
   * Sets the active language value based on the default value from the config,
   * unless the active language has been already initialized.
   */
  protected setDefaultFromConfig(config: SiteContextConfig): void {
    const contextParam = getContextParameterDefault(
      config,
      LANGUAGE_CONTEXT_ID
    );
    if (!this.languageService.isInitialized() && contextParam) {
      this.languageService.setActive(contextParam);
    }
  }

  protected setFromFederatedLoginContext(): Observable<unknown> {
    const lang = this.federatedLoginService.language;
    if (this.federatedLoginService.enabled && lang) {
      console.log('setting language', lang, this.languageService.isInitialized);
      return of(this.languageService.setActive(lang));
    }
    return of(undefined);
  }
}
