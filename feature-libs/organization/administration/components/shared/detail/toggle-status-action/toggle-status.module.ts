import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { ConfirmationMessageModule } from '../../message/confirmation/confirmation-message.module';
import { MessageModule } from '../../message/message.module';
import { ToggleStatusComponent } from './toggle-status.component';

@NgModule({
  imports: [CommonModule, I18nModule, MessageModule, ConfirmationMessageModule],
  declarations: [ToggleStatusComponent],
  exports: [ToggleStatusComponent],
})
export class ToggleStatusModule {}
