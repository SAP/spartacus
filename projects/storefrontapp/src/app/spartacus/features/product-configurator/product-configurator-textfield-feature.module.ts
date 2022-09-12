/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@commerce-storefront-toolset/core';
import { configuratorTranslations } from '@commerce-storefront-toolset/product-configurator/common/assets';
import {} from '@commerce-storefront-toolset/product-configurator/rulebased/root';
import {
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  TextfieldConfiguratorRootModule,
} from '@commerce-storefront-toolset/product-configurator/textfield/root';

@NgModule({
  imports: [TextfieldConfiguratorRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE]: {
          module: () =>
            import('@commerce-storefront-toolset/product-configurator/textfield').then(
              (m) => m.TextfieldConfiguratorModule
            ),
        },
      },
    }),
    provideConfig({
      i18n: {
        resources: configuratorTranslations,
      },
    }),
  ],
})
export class ProductConfiguratorTextfieldFeatureModule {}
