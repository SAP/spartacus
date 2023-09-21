import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  AuthGuard,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { DownloadOrderInvoicesDialogModule } from './download-invoices/download-order-invoices-dialog.module';
import { OrderDetailsEnhancedUIActionsComponent } from './order-details-enhanced-ui-actions.component';
const moduleComponents = [OrderDetailsEnhancedUIActionsComponent];
@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    DownloadOrderInvoicesDialogModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AccountOrderDetailsActionsComponent: {
          component: OrderDetailsEnhancedUIActionsComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  exports: [...moduleComponents],
  declarations: [...moduleComponents],
})
export class OrderDetailsEnhancedUIModule {}
