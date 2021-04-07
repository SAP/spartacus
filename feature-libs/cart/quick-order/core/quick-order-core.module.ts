import { ModuleWithProviders, NgModule } from '@angular/core';
import { QuickOrderConnector } from './connectors/quick-order.connector';
import { QuickOrderEventsModule } from './events/quick-order-events.module';
import { QuickOrderStoreModule } from './store/quick-order-store.module';

@NgModule({
  imports: [QuickOrderStoreModule, QuickOrderEventsModule],
})
export class QuickOrderCoreModule {
  static forRoot(): ModuleWithProviders<QuickOrderCoreModule> {
    return {
      ngModule: QuickOrderCoreModule,
      providers: [QuickOrderConnector],
    };
  }
}
