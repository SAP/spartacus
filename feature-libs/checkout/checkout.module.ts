import { NgModule } from '@angular/core';
import { CheckoutComponentsModule } from '@spartacus/checkout/components';
import { CheckoutCoreModule } from '@spartacus/checkout/core';
import { CheckoutOccModule } from '@spartacus/checkout/occ';

@NgModule({
  imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule],
})
export class CheckoutModule {}
