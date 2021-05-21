import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductVariantsContainerComponent } from './product-variants-container.component';
import { RouterModule } from '@angular/router';
import { ProductVariantStyleSelectorModule } from '../variant-style-selector/product-variant-style-selector.module';
import { ProductVariantSizeSelectorModule } from '../variant-size-selector/product-variant-size-selector.module';
import { ProductVariantColorSelectorModule } from '../variant-color-selector/product-variant-color-selector.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    ProductVariantStyleSelectorModule,
    ProductVariantSizeSelectorModule,
    ProductVariantColorSelectorModule,
  ],
  declarations: [ProductVariantsContainerComponent],
  entryComponents: [ProductVariantsContainerComponent],
})
export class ProductVariantsContainerModule {}
