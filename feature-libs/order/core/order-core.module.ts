import { NgModule } from '@angular/core';
import { OrderConnector } from './connectors/order.connector';
import { ReplenishmentOrderConnector } from './connectors/replenishment-order.connector';
import { UnnamedReplenishmentOrderConnector } from './connectors/unnamed-replenishment-order.connector';
import { UnnamedConnector } from './connectors/unnamed.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';

@NgModule({
  imports: [OrderStoreModule],
  providers: [
    ...facadeProviders,
    OrderConnector,
    ReplenishmentOrderConnector,
    UnnamedConnector,
    UnnamedReplenishmentOrderConnector,
  ],
})
export class OrderCoreModule {}
