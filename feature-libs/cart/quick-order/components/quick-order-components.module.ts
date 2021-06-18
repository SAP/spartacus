import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartQuickFormModule } from './cart-quick-form/cart-quick-form.module';
import { QuickOrderContainerModule } from './container/quick-order-container.module';

@NgModule({
  imports: [RouterModule, QuickOrderContainerModule, CartQuickFormModule],
})
export class QuickOrderComponentsModule {}
