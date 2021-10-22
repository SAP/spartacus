import { Injectable, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  AuthGuard,
  CmsConfig,
  OrderEntry,
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  CmsPageGuard,
  ORDER_ENTRIES_CONTEXT,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { map, tap } from 'rxjs/operators';
import { defaultOrderRoutingConfig } from './config/default-order-routing-config';
import { OrderFacade } from './facade';
import { ORDER_CORE_FEATURE, ORDER_FEATURE } from './feature-name';

// TODO: Inline this factory when we start releasing Ivy compiled libraries
export function defaultOrderComponentsConfig(): CmsConfig {
  const config: CmsConfig = {
    featureModules: {
      [ORDER_FEATURE]: {
        cmsComponents: [
          'CancelOrderComponent',
          'CancelOrderConfirmationComponent',
          'ReturnOrderComponent',
          'ReturnOrderConfirmationComponent',
          'AccountOrderDetailsActionsComponent',
          'AccountOrderDetailsItemsComponent',
          'AccountOrderDetailsTotalsComponent',
          'AccountOrderDetailsShippingComponent',
          'AccountOrderHistoryComponent',
          'ReplenishmentDetailItemsComponent',
          'ReplenishmentDetailTotalsComponent',
          'ReplenishmentDetailShippingComponent',
          'ReplenishmentDetailActionsComponent',
          'ReplenishmentDetailOrderHistoryComponent',
          'AccountReplenishmentHistoryComponent',
          'ReturnRequestOverviewComponent',
          'ReturnRequestItemsComponent',
          'ReturnRequestTotalsComponent',
          'OrderReturnRequestListComponent',
        ],
      },
      // by default core is bundled together with components
      [ORDER_CORE_FEATURE]: ORDER_FEATURE,
    },
  };
  return config;
}

@Injectable({ providedIn: 'root' })
export class OrderDetailsImportExportContext {
  constructor(protected orderDetailsService: OrderFacade) {}
  getEntries() {
    return this.orderDetailsService.getOrderDetails().pipe(
      map((order) => order.entries as OrderEntry[]),
      tap(console.error) // SPIKE TODO REMOVE
    );
  }
}

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { pageLabel: 'order', cxRoute: 'orderGuest' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: {
          cxRoute: 'orderDetails',
          cxContext: {
            [ORDER_ENTRIES_CONTEXT]: OrderDetailsImportExportContext,
          },
        },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderCancel' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderCancelConfirmation' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderReturn' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orderReturnConfirmation' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'orders' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'replenishmentDetails' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'replenishmentOrders' },
      },
      {
        // @ts-ignore
        path: null,
        canActivate: [AuthGuard, CmsPageGuard],
        component: PageLayoutComponent,
        data: { cxRoute: 'returnRequestDetails' },
      },
    ]),
  ],
  providers: [
    provideDefaultConfigFactory(defaultOrderComponentsConfig),
    provideDefaultConfig(defaultOrderRoutingConfig),
  ],
})
export class OrderRootModule {}
