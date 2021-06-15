import { NgModule } from '@angular/core';
import { ProductVariantsContainerModule } from './product-variants-container/product-variants-container.module';
import { ProductVariantColorSelectorModule } from './variant-color-selector/product-variant-color-selector.module';
import { ProductVariantSizeSelectorModule } from './variant-size-selector/product-variant-size-selector.module';
import { ProductVariantStyleSelectorModule } from './variant-style-selector/product-variant-style-selector.module';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { ProductVariantsContainerComponent } from './product-variants-container/product-variants-container.component';
import { ProductVariantsGuard } from './guards/product-variants.guard';

@NgModule({
  imports: [
    ProductVariantsContainerModule,
    ProductVariantColorSelectorModule,
    ProductVariantSizeSelectorModule,
    ProductVariantStyleSelectorModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantsContainerComponent,
          guards: [ProductVariantsGuard],
        },
      },
    }),
  ],
})
export class ProductVariantsComponentsModule {}
