/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  CmsConfig,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import { CheckoutServiceDetailsEventModule } from './events/checkout-service-details-event.module';
import {
  defaultCheckoutServiceDetailsRoutingConfig,
  defaultServiceDetailsCheckoutConfig,
} from './config';
import { S4_SERVICE_FEATURE } from './feature-name';
import { NgModule } from '@angular/core';
import { CheckoutConfig } from '@spartacus/checkout/base/root';

export const S4_SERVICE_CMS_COMPONENTS: string[] = ['CheckoutServiceDetails'];

export function defaultS4ServiceComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [S4_SERVICE_FEATURE]: {
        cmsComponents: S4_SERVICE_CMS_COMPONENTS,
      },
    },
  };
  return config;
}

@NgModule({
  imports: [CheckoutServiceDetailsEventModule],
  providers: [
    //check why we cannot use the below?
    //provideDefaultConfig(defaultServiceDetailsCheckoutConfig),
    { provide: CheckoutConfig, useValue: defaultServiceDetailsCheckoutConfig },
    provideDefaultConfig(defaultCheckoutServiceDetailsRoutingConfig),
    provideDefaultConfigFactory(defaultS4ServiceComponentsConfig),
  ],
})
export class S4ServiceRootModule {}
