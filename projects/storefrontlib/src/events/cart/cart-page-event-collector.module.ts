import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_BUILDER } from '@spartacus/core';
import { CartPageEventCollector } from './cart-page-event.collector';

@NgModule({})
export class CartPageEventCollectorModule {
  static forRoot(): ModuleWithProviders<CartPageEventCollectorModule> {
    return {
      ngModule: CartPageEventCollectorModule,
      providers: [
        {
          provide: EVENT_BUILDER,
          useExisting: CartPageEventCollector,
          multi: true,
        },
      ],
    };
  }
}
