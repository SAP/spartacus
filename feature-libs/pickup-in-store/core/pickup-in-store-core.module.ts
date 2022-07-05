import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultPickupInStoreConfig } from './config/index';
import { StockConnector } from './connectors/index';
import { facadeProviders } from './facade/index';
import { PreferredStoreService } from './services/index';
import { PickupInStoreStoreModule } from './store/index';

@NgModule({
  imports: [PickupInStoreStoreModule],
  providers: [
    provideDefaultConfig(defaultPickupInStoreConfig),
    StockConnector,
    PreferredStoreService,
    ...facadeProviders,
  ],
})
export class PickupInStoreCoreModule {}
