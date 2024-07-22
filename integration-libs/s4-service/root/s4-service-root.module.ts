/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CHECKOUT_B2B_CMS_COMPONENTS } from '@spartacus/checkout/b2b/root';
import {
  CmsConfig,
  CxDatePipe,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CHECKOUT_FEATURE,
  CheckoutConfig,
} from '@spartacus/checkout/base/root';
import {
  defaultServiceDetailsCheckoutConfig,
  defaultCheckoutServiceDetailsRoutingConfig,
} from './config/index';
import { CheckoutServiceDetailsEventModule } from './events/index';
import { CheckoutServiceSchedulePickerService } from './facade/index';

export const S4_SERVICE_CMS_COMPONENTS: string[] = [
  ...CHECKOUT_B2B_CMS_COMPONENTS,
  'CheckoutServiceDetails',
];

export function defaultS4ServiceComponentsConfig() {
  const config: CmsConfig = {
    featureModules: {
      [CHECKOUT_FEATURE]: {
        cmsComponents: S4_SERVICE_CMS_COMPONENTS,
      },
    },
  };
  return config;
}
@NgModule({
  imports: [CheckoutServiceDetailsEventModule],
  providers: [
    { provide: CheckoutConfig, useValue: defaultServiceDetailsCheckoutConfig },
    provideDefaultConfig(defaultCheckoutServiceDetailsRoutingConfig),
    provideDefaultConfigFactory(defaultS4ServiceComponentsConfig),
    CxDatePipe,
    CheckoutServiceSchedulePickerService,
  ],
})
export class S4ServiceRootModule {}
