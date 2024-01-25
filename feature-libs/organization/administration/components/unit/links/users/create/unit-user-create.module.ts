/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormModule } from '../../../../user/form/user-form.module';
import { UnitUserCreateComponent } from './unit-user-create.component';

@NgModule({
  imports: [CommonModule, UserFormModule],
  declarations: [UnitUserCreateComponent],
})
export class UnitUserCreateModule {}
