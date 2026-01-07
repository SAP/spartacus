/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { DatePickerModule, SpinnerModule } from '@spartacus/storefront';
import { CancelServiceOrderGuard } from '../guards';
import { CancelServiceOrderComponent } from './cancel-service-order.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    DatePickerModule,
    ReactiveFormsModule,
    UrlModule,
    RouterModule,
    CancelServiceOrderComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        CancelServiceOrder: {
          component: CancelServiceOrderComponent,
          guards: [AuthGuard, CancelServiceOrderGuard],
        },
      },
    }),
  ],
  exports: [CancelServiceOrderComponent],
})
export class CancelServiceOrderModule {}
