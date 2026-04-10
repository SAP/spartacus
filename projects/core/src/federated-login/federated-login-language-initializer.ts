/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { LanguageInitializer } from '../site-context/services/language-initializer';
import { FederatedLoginService } from './services';

// TODO: We can maintain this as an override or integrate the changes into the original
@Injectable()
export class FederatedLoginLanguageInitializer extends LanguageInitializer {
  federatedLoginService = inject(FederatedLoginService);

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

  protected setFromFederatedLoginContext(): Observable<unknown> {
    const lang = this.federatedLoginService.language;
    if (lang) {
      console.log('setting language', lang, this.languageService.isInitialized);
      return of(this.languageService.setActive(lang));
    }
    return of(undefined);
  }
}
