/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UnitFormModule } from '../../../form/unit-form.module';
import { UnitChildCreateComponent } from './unit-child-create.component';

@NgModule({
  imports: [CommonModule, UnitFormModule],
  declarations: [UnitChildCreateComponent],
})
export class UnitChildCreateModule {}
