import { NgModule } from '@angular/core';
import { QuickOrderComponentsModule } from './components/quick-order-components.module';
import { QuickOrderCoreModule } from './core/quick-order-core.module';
import { QuickOrderOccModule } from './occ/quick-order-occ.module';
// import { QuickOrderComponentsModule } from '@spartacus/cart/quick-order/components';
// import { QuickOrderCoreModule } from '@spartacus/cart/quick-order/core';
// import { QuickOrderOccModule } from '@spartacus/cart/quick-order/occ';

@NgModule({
  imports: [
    QuickOrderCoreModule.forRoot(),
    QuickOrderOccModule,
    QuickOrderComponentsModule,
  ],
})
export class QuickOrderModule {}
