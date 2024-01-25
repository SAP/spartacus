/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserAccountAdapter } from '@spartacus/user/account/core';
import { defaultOccUserAccountConfig } from './adapters/config/default-occ-user-account-endpoint.config';
import { OccUserAccountAdapter } from './adapters/occ-user-account.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccUserAccountConfig),
    { provide: UserAccountAdapter, useClass: OccUserAccountAdapter },
  ],
})
export class UserAccountOccModule {}
