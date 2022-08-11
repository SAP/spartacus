import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule, I18nModule } from '@spartacus/core';
import { ProductVariantStyleSelectorComponent } from './product-variant-style-selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [ProductVariantStyleSelectorComponent],
  exports: [ProductVariantStyleSelectorComponent],
})
export class ProductVariantStyleSelectorModule {}
