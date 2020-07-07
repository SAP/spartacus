import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { FormNotificationComponent } from './form-notification.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [FormNotificationComponent],
  exports: [FormNotificationComponent],
})
export class FormNotificationModule {}
