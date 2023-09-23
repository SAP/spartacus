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
import { OrderDetailsModule } from '@spartacus/order/components';
import { OrderOutlets } from '@spartacus/order/root';
import { provideOutlet, OutletPosition } from '@spartacus/storefront';
import { ConsignmentTrackingLinkComponent } from './consignment-tracking/consignment-tracking-link.component';
import { DownloadOrderInvoicesDialogModule } from './download-invoices/download-order-invoices-dialog.module';
import { OrderDetailsEnhancedUIActionsComponent } from './order-details-enhanced-ui-actions.component';

const moduleComponents = [
  OrderDetailsEnhancedUIActionsComponent,
  ConsignmentTrackingLinkComponent,
];

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    RouterModule,
    OrderDetailsModule,
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
  providers: [
    provideOutlet({
      id: OrderOutlets.ORDER_CONSIGNMENT,
      position: OutletPosition.REPLACE,
      component: ConsignmentTrackingLinkComponent,
    }),
  ],
  exports: [...moduleComponents],
  declarations: [...moduleComponents],
})
export class OrderDetailsEnhancedUIModule {}
