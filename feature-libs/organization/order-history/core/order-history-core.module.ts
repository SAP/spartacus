import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrderHistoryStoreModule } from './store/order-approval-store.module';
import { OrderHistoryConnector } from './connectors/order-approval.connector';

@NgModule({
  imports: [OrderHistoryStoreModule],
})
export class OrderHistoryCoreModule {
  static forRoot(): ModuleWithProviders<OrderHistoryCoreModule> {
    return {
      ngModule: OrderHistoryCoreModule,
      providers: [OrderHistoryConnector],
    };
  }
}
