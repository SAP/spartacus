/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RescheduleServiceOrderComponent } from './reschedule-service-order.component';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  SpinnerModule,
  DatePickerModule,
  OutletModule,
  CardModule,
} from '@spartacus/storefront';
import { ServiceOrderGuard } from '../guards';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [RescheduleServiceOrderComponent],
  imports: [
    CommonModule,
    CardModule,
    I18nModule,
    OutletModule,
    UrlModule,
    RouterModule,
    SpinnerModule,
    DatePickerModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        RescheduleServiceOrder: {
          component: RescheduleServiceOrderComponent,
          guards: [AuthGuard, ServiceOrderGuard],
        },
      },
    }),
  ],
  exports: [RescheduleServiceOrderComponent],
})
export class RescheduleServiceOrderModule {}
