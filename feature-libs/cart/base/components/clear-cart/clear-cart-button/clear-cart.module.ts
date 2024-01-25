/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, I18nModule, provideDefaultConfig } from '@spartacus/core';
import { ClearCartComponent } from './clear-cart.component';
import { ClearCartDialogModule } from '../clear-cart-dialog/clear-cart-dialog.module';
import { defaultClearCartLayoutConfig } from '../clear-cart-dialog/default-clear-cart-layout.config';

@NgModule({
  declarations: [ClearCartComponent],
  exports: [ClearCartComponent],
  imports: [CommonModule, I18nModule, ClearCartDialogModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ClearCartComponent: {
          component: ClearCartComponent,
        },
      },
    }),
    provideDefaultConfig(defaultClearCartLayoutConfig),
  ],
})
export class ClearCartModule {}
