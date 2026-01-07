/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { OrderDocumentFlowComponentsModule } from '@spartacus/order/document-flow/components';
import { OrderDocumentFlowOccModule } from '@spartacus/order/document-flow/occ';
import { OrderDocumentFlowCoreModule } from '@spartacus/order/document-flow/core';

@NgModule({
  imports: [
    OrderDocumentFlowCoreModule,
    OrderDocumentFlowComponentsModule,
    OrderDocumentFlowOccModule,
  ],
})
export class OrderDocumentFlowModule {}
