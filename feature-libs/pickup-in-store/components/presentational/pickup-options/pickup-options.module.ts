/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from '@spartacus/core';
import { PickupOptionsComponent } from './pickup-options.component';

@NgModule({
  imports: [CommonModule, I18nModule, ReactiveFormsModule],
  declarations: [PickupOptionsComponent],
  exports: [PickupOptionsComponent],
})
export class PickupOptionsModule {}
