/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '../config';
import { LanguageInitializer } from '../site-context/services/language-initializer';
import { defaultFederatedLoginConfigFactory } from './config/default-federated-login-config';
import { FederatedLoginLanguageInitializer } from './federated-login-language-initializer';
// import { LocationStrategy } from '@angular/common';
// import { FederatedLoginPathLocationStrategy } from './federated-login-location.strategy';

export const federatedLoginProviders = [
  provideDefaultConfigFactory(defaultFederatedLoginConfigFactory),
  { provide: LanguageInitializer, useClass: FederatedLoginLanguageInitializer },
  // { provide: LocationStrategy, useClass: FederatedLoginPathLocationStrategy },
];

@NgModule({
  providers: [...federatedLoginProviders],
})
export class FederatedLoginModule {}
