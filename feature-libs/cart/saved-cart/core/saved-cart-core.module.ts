import { ModuleWithProviders, NgModule } from '@angular/core';
import { SavedCartConnector } from './connectors/saved-cart.connector';
import { SavedCartEventsModule } from './events/saved-cart-events.module';
import { SavedCartStoreModule } from './store/saved-cart-store.module';

@NgModule({
  imports: [SavedCartStoreModule, SavedCartEventsModule],
})
export class SavedCartCoreModule {
  static forRoot(): ModuleWithProviders<SavedCartCoreModule> {
    return {
      ngModule: SavedCartCoreModule,
      providers: [SavedCartConnector],
    };
  }
}
