/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  CmsConfig,
  provideConfigValidator,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultOpfCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOpfCheckoutRoutingConfig } from './config/default-opf-checkout-routing-config';
import { defaultOpfConfig } from './config/default-opf-config';
import { opfConfigValidator } from './config/opf-config-validator';
import { OPF_CHECKOUT_FEATURE } from './feature-name';

export function defaultOpfCheckoutComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [OPF_CHECKOUT_FEATURE]: {
        cmsComponents: ['OpfCheckoutPaymentAndReview'],
      },
    },
  };
  return config;
}

@NgModule({
  providers: [
    provideDefaultConfig(defaultOpfConfig),
    provideDefaultConfig(defaultOpfCheckoutRoutingConfig),
    provideDefaultConfig(defaultOpfCheckoutConfig),
    provideConfigValidator(opfConfigValidator),
    provideDefaultConfigFactory(defaultOpfCheckoutComponentsConfig),
  ],
})
export class OpfCheckoutRootModule {}
