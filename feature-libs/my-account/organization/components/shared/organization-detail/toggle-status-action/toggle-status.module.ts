import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { ConfirmationMessageModule } from '../../organization-message/confirmation/confirmation-message.module';
import { MessageModule } from '../../organization-message/message.module';
import { ToggleStatusComponent } from './toggle-status.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    MessageModule,
    ConfirmationMessageModule,
  ],
  declarations: [ToggleStatusComponent],
  exports: [ToggleStatusComponent],
})
export class ToggleStatusModule {}
