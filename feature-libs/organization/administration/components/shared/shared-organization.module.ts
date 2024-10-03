/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { FormModule } from './form/form.module';
import { ListModule } from './list/list.module';
import { SubListModule } from './sub-list/sub-list.module';

@NgModule({
  imports: [ListModule, SubListModule, FormModule],
})
export class SharedOrganizationModule {}
