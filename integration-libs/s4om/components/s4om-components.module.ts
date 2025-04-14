/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { S4omOrderAttachmentsModule } from './order-detail-attachments/s4om-order-attachments.module';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultS4omCmsConfig } from './default-s4om-cms.config';
import { defaultS4omLayoutConfig } from './default-s4om-layout.config';

@NgModule({
  imports: [
    S4omOrderAttachmentsModule,
  ],
  providers: [
    provideDefaultConfig(defaultS4omCmsConfig),
    provideDefaultConfig(defaultS4omLayoutConfig),
  ],
})
export class S4omComponentsModule {
}
