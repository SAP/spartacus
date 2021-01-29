import { NgModule } from '@angular/core';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { VariantColorSelectorModule } from './variant-color-selector/variant-color-selector.module';
import { VariantSizeSelectorModule } from './variant-size-selector/variant-size-selector.module';
import { VariantStyleIconsModule } from './variant-style-icons/variant-style-icons.module';
import { VariantStyleSelectorModule } from './variant-style-selector/variant-style-selector.module';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsGuard } from '@spartacus/product/variants/core';
import { ProductVariantsComponent } from './product-variants/product-variants.component';

@NgModule({
  imports: [
    ProductVariantsModule,
    VariantColorSelectorModule,
    VariantSizeSelectorModule,
    VariantStyleIconsModule,
    VariantStyleSelectorModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantsComponent,
          guards: [ProductVariantsGuard],
        },
      },
    }),
  ],
})
export class VariantsComponentsModule {}
