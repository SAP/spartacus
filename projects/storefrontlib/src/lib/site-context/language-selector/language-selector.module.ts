import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';

import { SiteContextModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, SiteContextModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule {}
