/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';

import { Customer360MapComponent } from './customer-360-map.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [Customer360MapComponent],
  exports: [Customer360MapComponent],
})
export class Customer360MapComponentModule {}
