/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  orderTranslationChunksConfig,
  orderTranslations,
} from '@spartacus/order/assets';
import { OrderRootModule, ORDER_FEATURE } from '@spartacus/order/root';
import { CdpComponentsModule } from 'integration-libs/cdp/root/components/cdp-components.module';
import { OrderModule } from 'integration-libs/cdp/root/components/cdp-order';
import { environment } from 'projects/storefrontapp/src/environments/environment';

const extensions: Type<any>[] = [];

if (environment.cdp) {
  extensions.push(CdpComponentsModule);
}

@NgModule({
  imports: [OrderRootModule, OrderModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_FEATURE]: {
          module: () => import('@spartacus/order').then((m) => m.OrderModule),
        },
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: orderTranslations,
        chunks: orderTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
})
export class OrderFeatureModule {}
