import { ModuleWithProviders, NgModule } from '@angular/core';
import { QuickOrderConnector } from './connectors/quick-order.connector';
import { QuickOrderEventsModule } from './events/quick-order-events.module';
import { QuickOrderStatePersistenceService } from './services/quick-order-state-persistance.service';
import { QuickOrderService } from './services/quick-order.service';

@NgModule({
  imports: [QuickOrderEventsModule],
  providers: [QuickOrderStatePersistenceService, QuickOrderService],
})
export class QuickOrderCoreModule {
  static forRoot(): ModuleWithProviders<QuickOrderCoreModule> {
    return {
      ngModule: QuickOrderCoreModule,
      providers: [QuickOrderConnector],
    };
  }
}
