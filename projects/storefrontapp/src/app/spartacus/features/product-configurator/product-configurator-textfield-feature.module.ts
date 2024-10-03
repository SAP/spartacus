/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import {} from '@spartacus/product-configurator/rulebased/root';
import {
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  TextfieldConfiguratorRootModule,
} from '@spartacus/product-configurator/textfield/root';

@NgModule({
  imports: [TextfieldConfiguratorRootModule],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE]: {
          module: () =>
            import('@spartacus/product-configurator/textfield').then(
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
