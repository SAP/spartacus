/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterFormModule } from '../../../../cost-center/form/cost-center-form.module';
import { UnitCostCenterCreateComponent } from './unit-cost-center-create.component';

@NgModule({
  imports: [CommonModule, CostCenterFormModule],
  declarations: [UnitCostCenterCreateComponent],
})
export class UnitCostCenterCreateModule {}
