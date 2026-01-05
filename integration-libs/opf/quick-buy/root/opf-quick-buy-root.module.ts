/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultOpfQuickBuyConfig } from './config';
import { OPF_QUICK_BUY_FEATURE } from './feature-name';

export function defaultOpfQuickBuyCmsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_QUICK_BUY_FEATURE]: {
        cmsComponents: ['OpfQuickBuyButtonsComponent'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfigFactory(defaultOpfQuickBuyCmsComponentsConfig),
    provideDefaultConfig(defaultOpfQuickBuyConfig),
  ],
})
export class OpfQuickBuyRootModule {}
