import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccCartValidationConfig } from './adapters/config';
import { CartValidationAdapter } from '@spartacus/cart/validation/core';
import { OccCartValidationAdapter } from './adapters/occ-cart-validation.adapter';

@NgModule({
  providers: [
    provideDefaultConfig(defaultOccCartValidationConfig),
    {
      provide: CartValidationAdapter,
      useClass: OccCartValidationAdapter,
    },
  ],
})
export class CartValidationOccModule {}
