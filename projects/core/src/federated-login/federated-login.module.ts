/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FederatedLoginPathLocationStrategy } from '@spartacus/core';
import { provideDefaultConfigFactory } from '../config';
import { defaultFederatedLoginConfigFactory } from './config/default-federated-login-config';

export const federatedLoginProviders = [
  { provide: LocationStrategy, useClass: FederatedLoginPathLocationStrategy },
  provideDefaultConfigFactory(defaultFederatedLoginConfigFactory),
];

@NgModule({
  providers: [...federatedLoginProviders],
})
export class FederatedLoginModule {}
