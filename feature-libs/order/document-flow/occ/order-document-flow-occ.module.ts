/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrderDocumentFlowAdapter } from '@spartacus/order/document-flow/core';
import { OccOrderDocumentFlowAdapter } from './adapters';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccDocumentFlowConfigFactory } from './config/default-occ-document-flow-config-factory';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccDocumentFlowConfigFactory),
    {
      provide: OrderDocumentFlowAdapter,
      useClass: OccOrderDocumentFlowAdapter,
    },
  ],
})
export class OrderDocumentFlowOccModule {}
