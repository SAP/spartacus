/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserAccountComponentsModule } from '@spartacus/user/account/components';
import { UserAccountCoreModule } from '@spartacus/user/account/core';
import { UserAccountOccModule } from '@spartacus/user/account/occ';

@NgModule({
  imports: [
    UserAccountCoreModule,
    UserAccountOccModule,
    UserAccountComponentsModule,
  ],
})
export class UserAccountModule {}
