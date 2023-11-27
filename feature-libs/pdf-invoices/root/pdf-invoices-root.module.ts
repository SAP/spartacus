/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import {
  PDF_INVOICES_CORE_FEATURE,
  PDF_INVOICES_FEATURE,
} from './feature-name';

export function defaultRequestedDeliveryDateComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PDF_INVOICES_FEATURE]: {
        cmsComponents: ['AccountOrderDetailsPDFInvoicesComponent'],
      },
      // by default core is bundled together with components
      [PDF_INVOICES_CORE_FEATURE]: PDF_INVOICES_FEATURE,
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
  ],
})
export class PDFInvoicesRootModule {}
