import { NgModule, Type } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import {
  CpqConfiguratorRootModule,
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE,
  RulebasedConfiguratorRootModule,
} from '@spartacus/product-configurator/rulebased/root';
import { environment } from '../../../environments/environment';

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
            import('./product-configurator-wrapper.module').then(
              (m) => m.ProductConfiguratorRulebasedWrapperModule
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
