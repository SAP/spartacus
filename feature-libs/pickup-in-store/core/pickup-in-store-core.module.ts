import { NgModule } from '@angular/core';
import { StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';
import { PreferredStoreService } from './services/index';
import { StockStoreModule } from './store';

@NgModule({
  imports: [StockStoreModule],
  providers: [StockConnector, PreferredStoreService, ...facadeProviders],
})
export class PickupInStoreCoreModule {}
