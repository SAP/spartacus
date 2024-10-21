/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
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
  ],
})
export class OpfQuickBuyRootModule {}
