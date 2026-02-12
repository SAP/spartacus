/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { inject, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ConfigInitializerService } from '../../config/config-initializer/config-initializer.service';
import { getContextParameterDefault } from '../config/context-config-utils';
import { SiteContextConfig } from '../config/site-context-config';
import { LanguageService } from '../facade/language.service';
import { LANGUAGE_CONTEXT_ID } from '../providers/context-ids';
import { LanguageStatePersistenceService } from './language-state-persistence.service';
import { SiteContextRoutesHandler } from './site-context-routes-handler';

@Injectable({ providedIn: 'root' })
export class LanguageInitializer implements OnDestroy {
  siteContextRoutesHandler = inject(SiteContextRoutesHandler);
  constructor(
    protected languageService: LanguageService,
    protected languageStatePersistenceService: LanguageStatePersistenceService,
    protected configInit: ConfigInitializerService
  ) {}

  protected subscription: Subscription;

  /**
   * Initializes the value of the active language.
   *
   * @returns Observable that completes when initialization is done.
   */
  initialize(): Observable<unknown> {
    const init$ = this.configInit
      .getStable('context')
      .pipe(
        switchMap(() => this.siteContextRoutesHandler.initOnce()),
        switchMap(() => this.languageStatePersistenceService.initSync()),
        switchMap(() => this.setFallbackValue())
      );

    this.subscription = init$.subscribe();
    return init$;
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

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
