import { NgModule } from '@angular/core';
import { AddedToCartToastComponentsModule } from './components';
import { AddedToCartToastRootModule } from './root/added-to-cart-toast-root.module';

@NgModule({
  imports: [AddedToCartToastRootModule, AddedToCartToastComponentsModule],
})
export class AddedToCartToastModule {}
