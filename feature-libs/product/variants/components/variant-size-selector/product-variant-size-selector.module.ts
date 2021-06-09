import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule, I18nModule } from '@spartacus/core';
import { ProductVariantSizeSelectorComponent } from './product-variant-size-selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [ProductVariantSizeSelectorComponent],
  exports: [ProductVariantSizeSelectorComponent],
})
export class ProductVariantSizeSelectorModule {}
