import { ModuleWithProviders, NgModule } from '@angular/core';
import { SavedCartConnector } from './connectors/saved-cart.connector';
import { SavedCartStoreModule } from './store/saved-cart-store.module';

@NgModule({
  imports: [SavedCartStoreModule],
})
export class SavedCartCoreModule {
  static forRoot(): ModuleWithProviders<SavedCartCoreModule> {
    return {
      ngModule: SavedCartCoreModule,
      providers: [SavedCartConnector],
    };
  }
}
