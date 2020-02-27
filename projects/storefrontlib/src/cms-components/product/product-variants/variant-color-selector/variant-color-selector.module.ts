import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule, UrlModule } from '@spartacus/core';
import { VariantColorSelectorComponent } from './variant-color-selector.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule],
  declarations: [VariantColorSelectorComponent],
  entryComponents: [VariantColorSelectorComponent],
  exports: [VariantColorSelectorComponent],
})
export class VariantColorSelectorModule {}
