import { NgModule } from '@angular/core';
import { QuickOrderComponentsModule } from '@spartacus/cart/quick-order/components';
import { QuickOrderCoreModule } from '@spartacus/cart/quick-order/core';

@NgModule({
  imports: [QuickOrderCoreModule, QuickOrderComponentsModule],
})
export class QuickOrderModule {}
