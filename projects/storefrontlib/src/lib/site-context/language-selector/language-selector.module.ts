import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectorComponent } from './language-selector.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LanguageSelectorComponent],
  exports: [LanguageSelectorComponent]
})
export class LanguageSelectorModule {}
