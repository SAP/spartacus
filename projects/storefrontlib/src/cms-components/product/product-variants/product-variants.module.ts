import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { ProductVariantsComponent } from './product-variants.component';
import { RouterModule } from '@angular/router';
import { VariantStyleSelectorModule } from './variant-style-selector/variant-style-selector.module';
import { VariantSizeSelectorModule } from './variant-size-selector/variant-size-selector.module';
import { VariantColorSelectorModule } from './variant-color-selector/variant-color-selector.module';
import { VariantStyleIconsModule } from './variant-style-icons/variant-style-icons.module';
import { ProductVariantGuard } from './guards/product-variant.guard';
import { VariantStyleIconsComponent } from './variant-style-icons/variant-style-icons.component';
import { VariantGenericSelectorModule } from './variant-generic-selector/variant-generic-selector.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    VariantStyleSelectorModule,
    VariantSizeSelectorModule,
    VariantColorSelectorModule,
    VariantStyleIconsModule,
    VariantGenericSelectorModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ProductVariantSelectorComponent: {
          component: ProductVariantsComponent,
          guards: [ProductVariantGuard],
        },
      },
    }),
  ],
  declarations: [ProductVariantsComponent],
  entryComponents: [ProductVariantsComponent],
  exports: [VariantStyleIconsComponent],
})
export class ProductVariantsModule {}
