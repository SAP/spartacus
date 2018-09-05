import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule {}
