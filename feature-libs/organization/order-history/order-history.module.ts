import { NgModule } from '@angular/core';
import { OrderComponentsModule } from './components/order-approval-components.module';
import { OrderHistoryCoreModule } from './core/order-approval-core.module';
import { OrderHistoryOccModule } from './occ/order-approval-occ.module';

@NgModule({
  imports: [
    OrderHistoryCoreModule.forRoot(),
    OrderHistoryOccModule,
    OrderComponentsModule,
  ],
})
export class OrderHistoryModule {}
