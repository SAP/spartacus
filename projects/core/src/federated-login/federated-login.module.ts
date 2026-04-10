/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { LocationStrategy } from '@angular/common';
import { inject, Injectable, NgModule } from '@angular/core';
import { firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { provideDefaultConfigFactory } from '../config';
import { LanguageInitializer } from '../site-context/services/language-initializer';
import { defaultFederatedLoginConfigFactory } from './config/default-federated-login-config';
import { FederatedLoginPathLocationStrategy } from './federated-login-location.strategy';
import { FederatedLoginService } from './federated-login.service';

@Injectable()
export class MyLanguageInitializer extends LanguageInitializer {
  x = console.log('using my initializer');
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

export const federatedLoginProviders = [
  { provide: LocationStrategy, useClass: FederatedLoginPathLocationStrategy },
  { provide: LanguageInitializer, useClass: MyLanguageInitializer },
  provideDefaultConfigFactory(defaultFederatedLoginConfigFactory),
];

@NgModule({
  providers: [...federatedLoginProviders],
})
export class FederatedLoginModule {}
