import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationMessageModule } from './notification/notification.module';
import { OrganizationMessageComponent } from './organization-message.component';

@NgModule({
  imports: [CommonModule, NotificationMessageModule],
  declarations: [OrganizationMessageComponent],
  exports: [OrganizationMessageComponent],
})
export class OrganizationMessageModule {}
