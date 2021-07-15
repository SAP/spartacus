import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartQuickFormModule } from './cart-quick-form/cart-quick-form.module';
import { QuickOrderListModule } from './quick-order/quick-order-list.module';

@NgModule({
  imports: [RouterModule, QuickOrderListModule, CartQuickFormModule],
})
export class QuickOrderComponentsModule {}
