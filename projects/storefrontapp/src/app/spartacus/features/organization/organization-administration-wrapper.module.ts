/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { environment } from 'projects/storefrontapp/src/environments/environment';
import { NgModule, Type } from '@angular/core';
import { AdministrationModule } from '@spartacus/organization';
import { CdcListModule, CdcUserDetailsModule } from '@spartacus/cdc/manage-users';

const extensions: Type<any>[] = [];
if (environment.cdc) {
  extensions.push(CdcUserDetailsModule);
  extensions.push(CdcListModule);
}
@NgModule({
  imports: [AdministrationModule, ...extensions],
})
export class AdministrationWrapperModule {}
