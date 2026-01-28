/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  documentFlowTranslationsEn,
  orderDocumentFlowTranslationChunksConfig,
} from '@spartacus/order/document-flow/assets';
import {
  ORDER_DOCUMENT_FLOW_FEATURE,
  OrderDocumentFlowRootModule,
} from '@spartacus/order/document-flow/root';

@NgModule({
  imports: [OrderDocumentFlowRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_DOCUMENT_FLOW_FEATURE]: {
          module: () =>
            import('@spartacus/order/document-flow').then(
              (m) => m.OrderDocumentFlowModule
            ),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: {
          en: documentFlowTranslationsEn,
        },
        chunks: orderDocumentFlowTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class OrderDocumentFlowFeatureModule {}
