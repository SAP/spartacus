import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitLevelOrderDetailShippingComponent } from './unit-level-order-detail-shipping/unit-level-order-detail-shipping.component';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { UnitLevelOrdersViewerGuard } from '../../core/guards';
import {
  OrderDetailsModule,
  OrderOverviewModule,
} from '@spartacus/order/components';
import { UnitLevelOrderDetailItemsWrapperComponent } from './unit-level-order-detail-items-wrapper/unit-level-order-detail-items-wrapper.component';

@NgModule({
  declarations: [
    UnitLevelOrderDetailShippingComponent,
    UnitLevelOrderDetailItemsWrapperComponent,
  ],
  imports: [CommonModule, OrderOverviewModule, OrderDetailsModule],
  exports: [
    UnitLevelOrderDetailShippingComponent,
    UnitLevelOrderDetailItemsWrapperComponent,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UnitLevelOrderDetailsShippingComponent: {
          component: UnitLevelOrderDetailShippingComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
        UnitLevelOrderDetailsItemsComponent: {
          component: UnitLevelOrderDetailItemsWrapperComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
      },
    }),
  ],
})
export class UnitLevelOrderDetailModule {}
