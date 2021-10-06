import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification.component';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StockNotificationComponent, StockNotificationDialogComponent],
  imports: [CommonModule, RouterModule, I18nModule, SpinnerModule, UrlModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        StockNotificationComponent: {
          component: StockNotificationComponent,
        },
      },
    }),
  ],
  exports: [StockNotificationComponent, StockNotificationDialogComponent],
})
export class StockNotificationModule {}
