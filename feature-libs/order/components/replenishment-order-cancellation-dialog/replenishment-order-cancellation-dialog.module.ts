/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeaturesConfigModule, I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    IconModule,
    KeyboardFocusModule,
    FeaturesConfigModule,
  ],
  declarations: [ReplenishmentOrderCancellationDialogComponent],
  exports: [ReplenishmentOrderCancellationDialogComponent],
})
export class ReplenishmentOrderCancellationDialogModule {}
