/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CDCUserProfileModule } from '@spartacus/cdc/user-profile';
import { UserProfileModule } from '@spartacus/user/profile';
import { CDPUpdateProfileModule } from 'integration-libs/cdp/src/lib/update-profile/public_api';


import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdp) {
  extensions.push(CDPUpdateProfileModule);
}

if (environment.cdc) {
  extensions.push(CDCUserProfileModule);
}

@NgModule({
  imports: [UserProfileModule, ...extensions],
})
export class UserProfileWrapperModule {}
