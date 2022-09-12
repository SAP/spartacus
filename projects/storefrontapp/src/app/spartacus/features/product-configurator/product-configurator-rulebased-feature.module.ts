/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule, Type } from '@angular/core';
import { provideConfig } from '@commerce-storefront-toolset/core';
import { configuratorTranslations } from '@commerce-storefront-toolset/product-configurator/common/assets';
import {
  CpqConfiguratorRootModule,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE,
  RulebasedConfiguratorRootModule,
} from '@commerce-storefront-toolset/product-configurator/rulebased/root';
import { environment } from '../../../../environments/environment';

const extensions: Type<any>[] = [];

if (environment.cpq) {
  extensions.push(CpqConfiguratorRootModule);
}

@NgModule({
  imports: [RulebasedConfiguratorRootModule, ...extensions],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
          module: () =>
            import('./rulebased-configurator-wrapper.module').then(
              (m) => m.RulebasedConfiguratorWrapperModule
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
export class ProductConfiguratorRulebasedFeatureModule {}
