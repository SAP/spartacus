/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { ORDER_DOCUMENT_FLOW_FEATURE } from './feature-name';

@NgModule({
  providers: [
    provideDefaultConfig({
      featureModules: {
        [ORDER_DOCUMENT_FLOW_FEATURE]: {
          cmsComponents: ['AccountOrderDocumentFlowComponent'],
        },
      },
    }),
  ],
})
export class OrderDocumentFlowRootModule {}
