import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsModule } from '../../../cms/cms.module';
import { CheckoutModule } from '../../../checkout/checkout.module';
import { MultiStepCheckoutPageLayoutComponent } from './multi-step-checkout-page-layout.component';

@NgModule({
  imports: [CommonModule, CmsModule, CheckoutModule],
  declarations: [MultiStepCheckoutPageLayoutComponent],
  exports: [MultiStepCheckoutPageLayoutComponent]
})
export class MultiStepCheckoutPageLayoutModule {}
