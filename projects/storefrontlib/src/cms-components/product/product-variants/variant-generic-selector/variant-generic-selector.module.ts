import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UrlModule, I18nModule } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { MediaModule } from 'projects/storefrontlib/src/shared';
import { VariantGenericSelectorComponent } from './variant-generic-selector.component';

@NgModule({
  imports: [CommonModule, RouterModule, UrlModule, I18nModule, MediaModule],
  declarations: [VariantGenericSelectorComponent],
  entryComponents: [VariantGenericSelectorComponent],
  exports: [VariantGenericSelectorComponent],
})
export class VariantGenericSelectorModule {}
