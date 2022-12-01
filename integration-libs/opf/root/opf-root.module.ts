/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { defaultOPFCheckoutConfig } from './config/default-opf-checkout-config';
import { defaultOPFRoutingConfig } from './config/default-opf-routing-config';
import { OPF_CORE_FEATURE, OPF_FEATURE } from './feature-name';

export function defaultOPFComponentsConfig() {
  const config = {
    featureModules: {
      [OPF_FEATURE]: {
        cmsComponents: ['OPFCheckoutPaymentReview'],
      },

      // By default core is bundled together with components.
      [OPF_CORE_FEATURE]: OPF_FEATURE,
    },
  };
  return config;
}
@NgModule({
  imports: [],
  providers: [
    provideDefaultConfigFactory(defaultOPFComponentsConfig),
    provideDefaultConfig(defaultOPFCheckoutConfig),
    provideDefaultConfig(defaultOPFRoutingConfig),
  ],
})
export class OPFRootModule {}
