/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { ReplenishmentOrderCancellationDialogComponent } from './replenishment-order-cancellation-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [ReplenishmentOrderCancellationDialogComponent],
  exports: [ReplenishmentOrderCancellationDialogComponent],
})
export class ReplenishmentOrderCancellationDialogModule {}
