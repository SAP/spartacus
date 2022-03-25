import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfigFactory } from '@spartacus/core';
import { PRODUCT_VARIANTS_FEATURE } from './feature-name';
import {
  ProductListOutlets,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { ProductVariantStyleIconsComponent } from './components/variant-style-icons/product-variant-style-icons.component';
import { ProductVariantStyleIconsModule } from './components/variant-style-icons/product-variant-style-icons.module';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultProductVariantsComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [PRODUCT_VARIANTS_FEATURE]: {
        cmsComponents: ['ProductVariantSelectorComponent'],
      },
    },
  };

  return config;
}

@NgModule({
  imports: [ProductVariantStyleIconsModule],
  providers: [
    provideDefaultConfigFactory(defaultProductVariantsComponentsConfig),
    provideOutlet({
      id: ProductListOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ProductVariantStyleIconsComponent,
    }),
  ],
})
export class ProductVariantsRootModule {}
