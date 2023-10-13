/*
 * SPDX-FileCopyrightText: 2023 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { CmsConfig, I18nConfig, provideConfig } from '@spartacus/core';
import {
  orderTranslationChunksConfig,
  orderTranslations,
} from '@spartacus/order/assets';
import {
  MYACCOUNT_ENHANCED_UI_ORDER,
  OrderRootModule,
  ORDER_FEATURE,
} from '@spartacus/order/root';
import { environment } from '../../../../environments/environment';
function setEnhancedMyAccountToken(): boolean {
  if (environment.enhancedMyAccount) {
    return true;
  } else {
    return false;
  }
}
@NgModule({
  imports: [OrderRootModule],
  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [ORDER_FEATURE]: {
          module: () => import('@spartacus/order').then((m) => m.OrderModule),
        },
      },
    }),
    {
      provide: MYACCOUNT_ENHANCED_UI_ORDER,
      useFactory: setEnhancedMyAccountToken,
    },
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
