import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { MessageModule } from '../../organization-message/message.module';
import { PromptMessageModule } from './prompt/prompt.module';
import { ToggleStatusComponent } from './toggle-status.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UrlModule,
    I18nModule,
    MessageModule,
    PromptMessageModule,
  ],
  declarations: [ToggleStatusComponent],
  exports: [ToggleStatusComponent],
})
export class ToggleStatusModule {}
