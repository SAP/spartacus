import { NgModule } from '@angular/core';
import { StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';

@NgModule({
  providers: [StockConnector, ...facadeProviders],
})
export class PickupInStoreCoreModule {}
