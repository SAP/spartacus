/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
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
import {
  CardModule,
  DatePickerModule,
  FormRequiredAsterisksComponent,
  FormRequiredLegendComponent,
  OutletModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { ServiceOrderGuard } from '../guards';
import { RescheduleServiceOrderComponent } from './reschedule-service-order.component';

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
    FormRequiredAsterisksComponent,
    FormRequiredLegendComponent,
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
