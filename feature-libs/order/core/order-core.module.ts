import { NgModule } from '@angular/core';
import { OrderHistoryConnector } from './connectors/order-history.connector';
import { ReplenishmentOrderConnector } from './connectors/replenishment-order.connector';
import { ScheduledReplenishmentOrderConnector } from './connectors/scheduled-replenishment-order.connector';
import { UnnamedConnector } from './connectors/unnamed.connector';
import { facadeProviders } from './facade/facade-providers';
import { OrderStoreModule } from './store/order-store.module';

@NgModule({
  imports: [OrderStoreModule],
  providers: [
    ...facadeProviders,
    OrderHistoryConnector,
    ReplenishmentOrderConnector,
    UnnamedConnector,
    ScheduledReplenishmentOrderConnector,
  ],
})
export class OrderCoreModule {}
