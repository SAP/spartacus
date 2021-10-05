import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import {
  CpqConfiguratorRootModule,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE,
  RulebasedConfiguratorRootModule,
} from '@spartacus/product-configurator/rulebased/root';
import { VariantConfiguratorInteractiveLayoutModule } from '@spartacus/product-configurator/rulebased/root';
import { VariantConfiguratorOverviewLayoutModule } from '@spartacus/product-configurator/rulebased/root';
import { CpqConfiguratorLayoutModule } from '@spartacus/product-configurator/rulebased/root';

@NgModule({
  imports: [
    RulebasedConfiguratorRootModule,
    VariantConfiguratorInteractiveLayoutModule,
    VariantConfiguratorOverviewLayoutModule,
    CpqConfiguratorRootModule,
    CpqConfiguratorLayoutModule,
  ],
  providers: [
    provideConfig({
      featureModules: {
        [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
          module: () =>
            import('@spartacus/product-configurator/rulebased/cpq').then(
              (m) => m.RulebasedCpqConfiguratorModule
            ),
        },
      },
      i18n: {
        resources: configuratorTranslations,
      },
    }),
  ],
})
export class ProductConfiguratorRulebasedCpqFeatureModule {}
