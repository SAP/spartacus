import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultCheckoutConfig } from '@spartacus/storefront';

@NgModule({
  imports: [],
  providers: [provideDefaultConfig(defaultCheckoutConfig)],
})
export class CheckoutRootModule {}
