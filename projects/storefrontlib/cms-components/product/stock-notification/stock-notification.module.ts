/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification.component';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { KeyboardFocusModule } from '../../../layout/a11y/keyboard-focus/keyboard-focus.module';
import { RouterModule } from '@angular/router';
import { defaultStockNotificationLayoutConfig } from './stock-notification-dialog/default-stock-notification-layout.config';

@NgModule({
  declarations: [StockNotificationComponent, StockNotificationDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    I18nModule,
    SpinnerModule,
    UrlModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideDefaultConfig(defaultStockNotificationLayoutConfig),
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        StockNotificationComponent: {
          component: StockNotificationComponent,
        },
      },
    }),
  ],
  exports: [StockNotificationComponent, StockNotificationDialogComponent],
})
export class StockNotificationModule {}
