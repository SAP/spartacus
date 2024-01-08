/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PromotionsComponent } from './promotions.component';

@NgModule({
  imports: [CommonModule],
  declarations: [PromotionsComponent],
  exports: [PromotionsComponent],
})
export class PromotionsModule {}
