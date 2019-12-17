import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockNotificationComponent } from './stock-notification.component';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { StockNotificationDialogComponent } from './stock-notification-dialog/stock-notification-dialog.component';
import { SpinnerModule } from '../../../shared/components/spinner/spinner.module';
import { RouterModule } from '@angular/router';
import { PAGE_SLOT_HANDLER } from 'projects/storefrontlib/src/cms-structure';
import { ProductPageSlotHandler } from './product-page-slot-handler';

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
  providers: [
    {
      provide: PAGE_SLOT_HANDLER,
      useExisting: ProductPageSlotHandler,
      multi: true,
    },
  ],
})
export class StockNotificationModule {}
