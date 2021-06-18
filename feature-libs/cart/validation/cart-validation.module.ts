import { NgModule } from '@angular/core';
import { CartValidationComponentsModule } from '@spartacus/cart/validation/components';
import { CartValidationCoreModule } from '@spartacus/cart/validation/core';
import { CartValidationOccModule } from '@spartacus/cart/validation/occ';

@NgModule({
  imports: [
    CartValidationCoreModule,
    CartValidationOccModule,
    CartValidationComponentsModule,
  ],
})
export class CartValidationModule {}
