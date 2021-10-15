import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CartNotEmptyGuard,
  CheckoutAuthGuard,
} from '@spartacus/checkout/components';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CostCenterComponent } from './cost-center.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutCostCenterComponent: {
          component: CostCenterComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard],
        },
      },
    }),
  ],
  declarations: [CostCenterComponent],
})
export class CostCenterModule {}
