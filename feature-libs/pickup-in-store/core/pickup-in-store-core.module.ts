import { NgModule } from '@angular/core';
import { StockConnector } from './connectors';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  providers: [StockConnector, ...facadeProviders],
})
export class PickupInStoreCoreModule {}
