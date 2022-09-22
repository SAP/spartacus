import { NgModule } from '@angular/core';
import { CartItemContextDirective } from './cart-item-context.directive';

@NgModule({
  declarations: [CartItemContextDirective],
  exports: [CartItemContextDirective],
})
export class CartItemContextDirectiveModule {}
