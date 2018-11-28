import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '../../../cms/cms.module';
import { CheckoutModule } from '../../../checkout/checkout.module';
import { MultiStepCheckoutPageLayoutComponent } from './multi-step-checkout-page-layout.component';
import { MultiStepCheckoutModule } from '../../../checkout/components/multi-step-checkout/multi-step-checkout.module';

@NgModule({
  imports: [CommonModule, CmsModule, CheckoutModule, MultiStepCheckoutModule],
  declarations: [MultiStepCheckoutPageLayoutComponent],
  exports: [MultiStepCheckoutPageLayoutComponent]
})
export class MultiStepCheckoutPageLayoutModule {}
