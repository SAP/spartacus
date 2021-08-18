import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartQuickOrderFormModule } from './cart-quick-form/cart-quick-form.module';
import { QuickOrderListModule } from './quick-order/quick-order-list.module';

@NgModule({
  imports: [RouterModule, QuickOrderListModule, CartQuickOrderFormModule],
})
export class QuickOrderComponentsModule {}
