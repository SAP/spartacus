import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule, I18nModule } from '@spartacus/core';
import { ProductVariantColorSelectorComponent } from './product-variant-color-selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [ProductVariantColorSelectorComponent],
  exports: [ProductVariantColorSelectorComponent],
})
export class ProductVariantColorSelectorModule {}
