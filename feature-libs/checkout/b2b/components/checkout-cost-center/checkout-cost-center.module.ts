import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartValidationGuard } from '@spartacus/cart/main/components';
import { CartNotEmptyGuard } from '@spartacus/checkout/base/components';
import { CheckoutAuthGuard } from '@spartacus/checkout/base/root';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { CheckoutCostCenterComponent } from './checkout-cost-center.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CheckoutCostCenterComponent: {
          component: CheckoutCostCenterComponent,
          guards: [CheckoutAuthGuard, CartNotEmptyGuard, CartValidationGuard],
        },
      },
    }),
  ],
  declarations: [CheckoutCostCenterComponent],
})
export class CheckoutCostCenterModule {}
