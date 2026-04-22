/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { NgModule } from '@angular/core';
import { provideDefaultConfigFactory } from '../config';
import { defaultFederatedLoginConfigFactory } from './config/default-federated-login-config';

export const federatedLoginProviders = [
  provideDefaultConfigFactory(defaultFederatedLoginConfigFactory),
];

@NgModule({
  providers: [...federatedLoginProviders],
})
export class FederatedLoginModule {}
