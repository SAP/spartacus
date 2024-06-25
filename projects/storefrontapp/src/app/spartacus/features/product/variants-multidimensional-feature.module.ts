/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import {
  variantsMultidimensionalTranslationChunksConfig,
  variantsMultidimensionalTranslations,
} from '@spartacus/product/multi-dimensional/assets';
import { VariantsMultiDimensionalRootModule } from '@spartacus/product/multi-dimensional/root';

@NgModule({
  imports: [VariantsMultiDimensionalRootModule],
  providers: [
    provideConfig({
      featureModules: {
        variantsMultidimensional: {
          module: () =>
            import('@spartacus/product/multi-dimensional').then(
              (m) => m.VariantsMultiDimensionalModule
            ),
        },
      },
      i18n: {
        resources: variantsMultidimensionalTranslations,
        chunks: variantsMultidimensionalTranslationChunksConfig,
      },
    }),
  ],
})
export class VariantsMultidimensionalFeatureModule {}
