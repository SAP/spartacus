/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { OutletPosition, provideOutlet } from '@spartacus/storefront';
import { DeliveryModeDatePickerComponent } from './components/delivery-mode-date-picker/delivery-mode-date-picker.component';
import { OrderOverviewDeliveryDateComponent } from './components/order-overview-delivery-date/order-overview-delivery-date.component';
import {
  REQUESTED_DELIVERY_DATE_CORE_FEATURE,
  REQUESTED_DELIVERY_DATE_FEATURE,
} from './feature-name';

export function defaultRequestedDeliveryDateComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [REQUESTED_DELIVERY_DATE_FEATURE]: {
        cmsComponents: [
          'DeliveryModeDatePickerComponent',
          'OrderOverviewDeliveryDateComponent',
        ],
      },
      // by default core is bundled together with components
      [REQUESTED_DELIVERY_DATE_CORE_FEATURE]: REQUESTED_DELIVERY_DATE_FEATURE,
    },
  };

  return config;
}

@NgModule({
  providers: [
    provideOutlet({
      id: CartOutlets.DELIVERY_MODE,
      position: OutletPosition.AFTER,
      component: DeliveryModeDatePickerComponent,
    }),
    provideOutlet({
      id: CartOutlets.ORDER_OVERVIEW,
      position: OutletPosition.AFTER,
      component: OrderOverviewDeliveryDateComponent,
    }),
    provideDefaultConfigFactory(defaultRequestedDeliveryDateComponentsConfig),
  ],
})
export class RequestedDeliveryDateRootModule {}
