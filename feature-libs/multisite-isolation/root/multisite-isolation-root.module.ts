/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AuthService, provideDefaultConfig } from '@spartacus/core';
import { MultisiteIsolationAuthService } from './services';
import { defaultMultisiteIsolationConfig } from './config/default-multisite-isolation-config';

@NgModule({
  providers: [
    provideDefaultConfig(defaultMultisiteIsolationConfig),
    {
      provide: AuthService,
      useExisting: MultisiteIsolationAuthService,
    },
  ],
})
export class MultisiteIsolationRootModule {}
