import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ProductVariantsComponent } from './product-variants.component';
import { RouterModule } from '@angular/router';
import { VariantStyleSelectorModule } from '../variant-style-selector/variant-style-selector.module';
import { VariantSizeSelectorModule } from '../variant-size-selector/variant-size-selector.module';
import { VariantColorSelectorModule } from '../variant-color-selector/variant-color-selector.module';
import { VariantStyleIconsModule } from '../variant-style-icons/variant-style-icons.module';
import { VariantStyleIconsComponent } from '../variant-style-icons/variant-style-icons.component';

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
  ],
  declarations: [ProductVariantsComponent],
  entryComponents: [ProductVariantsComponent],
  exports: [VariantStyleIconsComponent],
})
export class ProductVariantsModule {}
