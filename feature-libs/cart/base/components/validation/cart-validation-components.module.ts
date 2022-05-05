import { NgModule } from '@angular/core';
import { CartValidationWarningsModule } from './cart-warnings/cart-validation-warnings.module';
import { CartItemValidationWarningModule } from './cart-item-warning/cart-item-validation-warning.module';

@NgModule({
  imports: [CartValidationWarningsModule, CartItemValidationWarningModule],
  providers: [],
})
export class CartValidationComponentsModule {}
