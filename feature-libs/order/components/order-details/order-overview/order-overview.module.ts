/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@commerce-storefront-toolset/core';
import { CardModule } from '@commerce-storefront-toolset/storefront';
import { OrderOverviewComponent } from './order-overview.component';

@NgModule({
  imports: [CommonModule, I18nModule, CardModule],
  declarations: [OrderOverviewComponent],
  exports: [OrderOverviewComponent],
})
export class OrderOverviewModule {}
