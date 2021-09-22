import { NgModule } from '@angular/core';
import { CheckoutComponentsModule } from '@spartacus/checkout/components';
import { CheckoutCoreModule } from '@spartacus/checkout/core';
import { CheckoutOccModule } from '@spartacus/checkout/occ';
import { provideDefaultConfig } from '@spartacus/core';
import { COMMANDS_AND_QUERIES_BASED_CHECKOUT } from '@spartacus/checkout/root';

@NgModule({
  imports: [CheckoutComponentsModule, CheckoutCoreModule, CheckoutOccModule],
  providers: [
    provideDefaultConfig({
      features: {
        [COMMANDS_AND_QUERIES_BASED_CHECKOUT]: true,
      },
    }),
  ],
})
export class CheckoutModule {}
