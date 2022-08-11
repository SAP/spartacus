import { NgModule } from '@angular/core';
import { CheckoutComponentsModule } from '@spartacus/checkout/base/components';
import { CheckoutCoreModule } from '@spartacus/checkout/base/core';
import { CheckoutOccModule } from '@spartacus/checkout/base/occ';

@NgModule({
  imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule],
})
export class CheckoutModule {}
