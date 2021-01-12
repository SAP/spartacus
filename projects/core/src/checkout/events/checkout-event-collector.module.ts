import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_BUILDER } from '../../event/event.token';
import { CheckoutEventCollector } from './checkout-event.collector';

@NgModule({})
export class CheckoutEventCollectorModule {
  static forRoot(): ModuleWithProviders<CheckoutEventCollectorModule> {
    return {
      ngModule: CheckoutEventCollectorModule,
      providers: [
        {
          provide: EVENT_BUILDER,
          useExisting: CheckoutEventCollector,
          multi: true,
        },
      ],
    };
  }
}
