/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CdcAdministrationModule } from '@spartacus/cdc/organization/administration';
import { AdministrationModule } from '@spartacus/organization';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdc) {
  extensions.push(CdcAdministrationModule);
}
@NgModule({
  imports: [AdministrationModule, ...extensions],
})
export class AdministrationWrapperModule {}
