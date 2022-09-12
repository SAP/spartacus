/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserAccountComponentsModule } from '@commerce-storefront-toolset/user/account/components';
import { UserAccountCoreModule } from '@commerce-storefront-toolset/user/account/core';
import { UserAccountOccModule } from '@commerce-storefront-toolset/user/account/occ';

@NgModule({
  imports: [
    UserAccountCoreModule,
    UserAccountOccModule,
    UserAccountComponentsModule,
  ],
})
export class UserAccountModule {}
