import { ModuleWithProviders, NgModule } from '@angular/core';
import { OrderApprovalStoreModule } from './store/order-approval-store.module';
import { OrderApprovalConnector } from './connectors/order-approval.connector';

@NgModule({
  imports: [OrderApprovalStoreModule],
})
export class OrderApprovalCoreModule {
  static forRoot(): ModuleWithProviders<OrderApprovalCoreModule> {
    return {
      ngModule: OrderApprovalCoreModule,
      providers: [OrderApprovalConnector],
    };
  }
}
