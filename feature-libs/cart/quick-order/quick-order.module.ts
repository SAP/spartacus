import { NgModule } from '@angular/core';
import { QuickOrderComponentsModule } from '@spartacus/cart/quick-order/components';
import { QuickOrderCoreModule } from '@spartacus/cart/quick-order/core';
import { QuickOrderOccModule } from '@spartacus/cart/quick-order/occ';

@NgModule({
  imports: [
    QuickOrderCoreModule,
    QuickOrderOccModule,
    QuickOrderComponentsModule,
  ],
})
export class QuickOrderModule {}
