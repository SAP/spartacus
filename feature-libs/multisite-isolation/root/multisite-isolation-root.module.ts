/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { AuthService } from '@spartacus/core';
import { MultisiteIsolationAuthService } from './services';

@NgModule({
  providers: [
    {
      provide: AuthService,
      useExisting: MultisiteIsolationAuthService,
    },
  ],
})
export class MultisiteIsolationRootModule {}
