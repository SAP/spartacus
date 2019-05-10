import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification/stock-notification.component';
import { SpinnerModule } from '../../../shared';
import { I18nModule, UrlModule } from '@spartacus/core';
import { NotificationDialogComponent } from './stock-notification/notification-dialog/notification-dialog.component';

@NgModule({
  imports: [CommonModule, SpinnerModule, I18nModule, UrlModule],
  exports: [StockNotificationComponent],
  declarations: [StockNotificationComponent, NotificationDialogComponent],
  entryComponents: [NotificationDialogComponent],
})
export class ProductInterestsModule {}
