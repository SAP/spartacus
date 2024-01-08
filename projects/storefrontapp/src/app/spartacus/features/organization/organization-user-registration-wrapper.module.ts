/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CDCB2BRegisterModule } from '@spartacus/cdc/organization/user-registration';
import { OrganizationUserRegistrationModule } from '@spartacus/organization/user-registration';

import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdc) {
  extensions.push(CDCB2BRegisterModule);
}

@NgModule({
  imports: [OrganizationUserRegistrationModule, ...extensions],
})
export class OrganizationUserRegistrationWrapperModule {}
