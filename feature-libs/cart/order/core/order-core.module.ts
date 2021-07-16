import { NgModule } from '@angular/core';
import { OrderConnector } from './connectors/order.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';

@NgModule({
  imports: [OrderStoreModule],
  providers: [OrderConnector, ...facadeProviders],
})
export class OrderCoreModule {}
