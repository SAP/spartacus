import { ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_BUILDER } from '@spartacus/core';
import { ProductPageEventCollector } from './product-page-event.collector';

@NgModule({})
export class ProductPageEventCollectorModule {
  static forRoot(): ModuleWithProviders<ProductPageEventCollectorModule> {
    return {
      ngModule: ProductPageEventCollectorModule,
      providers: [
        {
          provide: EVENT_BUILDER,
          useExisting: ProductPageEventCollector,
          multi: true,
        },
      ],
    };
  }
}
