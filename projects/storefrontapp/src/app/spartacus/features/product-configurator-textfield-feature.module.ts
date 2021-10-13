import { NgModule } from '@angular/core';
import { CART_FEATURE } from '@spartacus/cart/main/root';
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
          dependencies: [CART_FEATURE],
        },
      },
      i18n: {
        resources: configuratorTranslations,
      },
    }),
  ],
})
export class ProductConfiguratorTextfieldFeatureModule {}
