import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitLevelOrderDetailShippingComponent } from './unit-level-order-detail-shipping/unit-level-order-detail-shipping.component';
import { AuthGuard, CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { UnitLevelOrdersViewerGuard } from '../../core/guards';
import {
  OrderDetailsModule,
  OrderOverviewModule,
} from '@spartacus/order/components';

@NgModule({
  declarations: [UnitLevelOrderDetailShippingComponent],
  imports: [CommonModule, OrderOverviewModule, OrderDetailsModule],
  exports: [UnitLevelOrderDetailShippingComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        UnitLevelOrderDetailsShippingComponent: {
          component: UnitLevelOrderDetailShippingComponent,
          guards: [AuthGuard, UnitLevelOrdersViewerGuard],
        },
      },
    }),
  ],
})
export class UnitLevelOrderDetailModule {}
