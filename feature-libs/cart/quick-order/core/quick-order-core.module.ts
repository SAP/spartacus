import { ModuleWithProviders, NgModule } from '@angular/core';
import { QuickOrderConnector } from './connectors/quick-order.connector';
import { QuickOrderEventsModule } from './events/quick-order-events.module';

@NgModule({
  imports: [QuickOrderEventsModule],
})
export class QuickOrderCoreModule {
  static forRoot(): ModuleWithProviders<QuickOrderCoreModule> {
    return {
      ngModule: QuickOrderCoreModule,
      providers: [QuickOrderConnector],
    };
  }
}
