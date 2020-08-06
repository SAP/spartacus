import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfigConflictSuggestionComponent } from './config-conflict-suggestion.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfigConflictSuggestionComponent],
  exports: [ConfigConflictSuggestionComponent],
  entryComponents: [ConfigConflictSuggestionComponent],
})
export class ConfigConflictSuggestionModule {}
