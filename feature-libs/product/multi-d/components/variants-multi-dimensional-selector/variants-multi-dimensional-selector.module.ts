import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule, I18nModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { MediaModule } from '@spartacus/storefront';
import { VariantsMultiDimensionalSelectorComponent } from './variants-multi-dimensional-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, MediaModule],
  declarations: [VariantsMultiDimensionalSelectorComponent],
  entryComponents: [VariantsMultiDimensionalSelectorComponent],
  exports: [VariantsMultiDimensionalSelectorComponent],
})
export class VariantsMultiDimensionalSelectorModule {}
