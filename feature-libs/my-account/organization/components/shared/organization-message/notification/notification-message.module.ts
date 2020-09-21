import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { IconModule, KeyboardFocusModule } from '@spartacus/storefront';
import { NotificationMessageComponent } from './notification-message.component';

@NgModule({
  imports: [CommonModule, I18nModule, IconModule, KeyboardFocusModule],
  declarations: [NotificationMessageComponent],
})
export class NotificationMessageModule {}
