import { NgModule } from '@angular/core';
import { SavedCartConnector } from './connectors/saved-cart.connector';
import { SavedCartEventsModule } from './events/saved-cart-events.module';
import { SavedCartStoreModule } from './store/saved-cart-store.module';
import { facadeProviders } from './facade/facade-providers';

@NgModule({
  imports: [SavedCartStoreModule, SavedCartEventsModule],
  providers: [SavedCartConnector, ...facadeProviders],
})
export class SavedCartCoreModule {}
