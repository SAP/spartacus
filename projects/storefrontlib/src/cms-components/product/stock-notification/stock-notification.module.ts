import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification.component';
import { ConfigModule, CmsConfig, I18nModule, UrlModule } from '@spartacus/core';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { SpinnerModule } from 'projects/storefrontlib/src/shared';
import { RouterModule } from '@angular/router';

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
    UrlModule,
    SpinnerModule,
  ],
  entryComponents: [
    StockNotificationComponent,
    StockNotificationDialogComponent,
  ],
  exports: [StockNotificationComponent, StockNotificationDialogComponent],
})
export class StockNotificationModule {}
