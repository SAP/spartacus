import { NgModule } from '@angular/core';
import { CheckoutB2BModule } from '@spartacus/checkout/b2b';
import { CheckoutB2BExtensionsModule } from '@spartacus/checkout/b2b/extensions';
import { CheckoutModule } from '@spartacus/checkout/base';

@NgModule({
  imports: [CheckoutModule, CheckoutB2BModule, CheckoutB2BExtensionsModule],
})
export class CheckoutB2BFeatureCustomModule {}
