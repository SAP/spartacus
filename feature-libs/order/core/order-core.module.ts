import { NgModule } from '@angular/core';
import { OrderHistoryConnector } from './connectors/order-history.connector';
import { ReplenishmentOrderHistoryConnector } from './connectors/replenishment-order-history.connector';
import { ScheduledReplenishmentOrderConnector } from './connectors/scheduled-replenishment-order.connector';
import { UnnamedConnector } from './connectors/unnamed.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';

@NgModule({
  imports: [OrderStoreModule],
  providers: [
    ...facadeProviders,
    OrderHistoryConnector,
    ReplenishmentOrderHistoryConnector,
    UnnamedConnector,
    ScheduledReplenishmentOrderConnector,
  ],
})
export class OrderCoreModule {}
