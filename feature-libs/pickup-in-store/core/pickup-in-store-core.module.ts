import { NgModule } from '@angular/core';
import { StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';
import { StockStoreModule } from './store';

@NgModule({
  imports: [StockStoreModule],
  providers: [StockConnector, ...facadeProviders],
})
export class PickupInStoreCoreModule {}
