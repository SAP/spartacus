/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UserProfileComponentsModule } from '@commerce-storefront-toolset/user/profile/components';
import { UserProfileCoreModule } from '@commerce-storefront-toolset/user/profile/core';
import { UserProfileOccModule } from '@commerce-storefront-toolset/user/profile/occ';

@NgModule({
  imports: [
    UserProfileCoreModule,
    UserProfileOccModule,
    UserProfileComponentsModule,
  ],
})
export class UserProfileModule {}
