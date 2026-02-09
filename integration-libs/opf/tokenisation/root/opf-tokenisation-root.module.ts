/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { OPF_TOKENISATION_FEATURE } from './feature-name';
import { NgModule } from '@angular/core';

export function defaultOpfTokenisationCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_TOKENISATION_FEATURE]: {
        cmsComponents: ['OpfTokenisationPaymentMethodsComponent'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultOpfTokenisationCmsComponentsConfig),
  ],
})
export class OpfTokenisationRootModule {}
