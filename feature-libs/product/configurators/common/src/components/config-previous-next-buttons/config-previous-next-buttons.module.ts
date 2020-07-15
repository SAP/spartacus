import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfigPreviousNextButtonsComponent } from './config-previous-next-buttons.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [ConfigPreviousNextButtonsComponent],
  exports: [ConfigPreviousNextButtonsComponent],
  entryComponents: [ConfigPreviousNextButtonsComponent],
})
export class ConfigPreviousNextButtonsModule {}
