/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { UnitUserListModule } from './list/unit-user-list.module';
import { UnitUserRolesModule } from './roles/unit-user-roles.module';

@NgModule({
  imports: [UnitUserListModule, UnitUserRolesModule],
})
export class UnitUsersModule {}
