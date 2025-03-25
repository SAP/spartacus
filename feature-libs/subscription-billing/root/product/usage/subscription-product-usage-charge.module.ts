import { NgModule } from '@angular/core';
import { SubscriptionProductUsageChargeComponent } from './subscription-product-usage-charge.component';
import { I18nModule } from '@spartacus/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [SubscriptionProductUsageChargeComponent],
  exports: [SubscriptionProductUsageChargeComponent],
  imports: [CommonModule, I18nModule],
})
export class SubscriptionProductUsageChargeModule {}
