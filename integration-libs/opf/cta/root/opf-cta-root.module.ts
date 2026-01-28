/*
 * SPDX-FileCopyrightText: 2026 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { OPF_CTA_FEATURE } from './feature-name';

export function defaultOpfCtaCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_CTA_FEATURE]: {
        cmsComponents: ['OpfCtaScriptsComponent', 'OpfCtaQuickBuyButtons'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [provideDefaultConfigFactory(defaultOpfCtaCmsComponentsConfig)],
})
export class OpfCtaRootModule {}
