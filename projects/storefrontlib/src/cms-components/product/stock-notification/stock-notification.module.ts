import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';

import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { StockNotificationComponent } from './stock-notification.component';

@NgModule({
  declarations: [StockNotificationComponent, StockNotificationDialogComponent],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        StockNotificationComponent: {
          component: StockNotificationComponent,
        },
      },
    }),
    RouterModule,
    I18nModule,
    SpinnerModule,
    UrlModule,
  ],
  entryComponents: [
    StockNotificationComponent,
    StockNotificationDialogComponent,
  ],
  exports: [StockNotificationComponent, StockNotificationDialogComponent],
})
export class StockNotificationModule {}
