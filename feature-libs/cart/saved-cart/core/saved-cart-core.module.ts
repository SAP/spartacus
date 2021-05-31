import { NgModule } from '@angular/core';
import { facadeProviders } from './facade/facade-providers';
import { SavedCartConnector } from './connectors/saved-cart.connector';
import { SavedCartEventsModule } from './events/saved-cart-events.module';
import { SavedCartPageMetaModule } from './services/saved-cart-page-meta.module';
import { SavedCartStoreModule } from './store/saved-cart-store.module';

@NgModule({
  imports: [
    SavedCartPageMetaModule,
    SavedCartStoreModule,
    SavedCartEventsModule,
  ],
  providers: [SavedCartConnector, ...facadeProviders],
})
export class SavedCartCoreModule {}
