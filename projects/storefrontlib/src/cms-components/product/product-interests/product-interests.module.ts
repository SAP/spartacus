import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification/stock-notification.component';

@NgModule({
  declarations: [StockNotificationComponent],
  imports: [CommonModule],
  exports: [StockNotificationComponent],
})
export class ProductInterestsModule {}
