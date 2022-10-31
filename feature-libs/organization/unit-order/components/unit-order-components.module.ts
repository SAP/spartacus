/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnitLevelOrderHistoryModule } from './unit-level-order-history';

@NgModule({
  imports: [RouterModule, UnitLevelOrderHistoryModule],
})
export class UnitOrderComponentsModule {}
