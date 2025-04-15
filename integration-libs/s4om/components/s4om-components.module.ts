/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4omOrderAttachmentsModule } from './order-attachments/s4om-order-attachments.module';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { defaultS4omLayoutConfig } from './default-s4om-layout.config';
import {
  S4omOrderAttachmentsComponent
} from './order-attachments/s4om-order-attachments.component';

@NgModule({
  imports: [S4omOrderAttachmentsModule],
  providers: [
    provideDefaultConfig(<CmsConfig> {
      cmsComponents: {
        S4omOrderAttachmentsComponent: {
          component: S4omOrderAttachmentsComponent,
          guards: [AuthGuard],
        },
      }
    }),
    provideDefaultConfig(defaultS4omLayoutConfig),
  ],
})
export class S4omComponentsModule {}
