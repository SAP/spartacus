import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { OrderPageMetaResolver } from './order-page-meta.resolver';

@NgModule({
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: OrderPageMetaResolver,
      multi: true,
    },
  ],
})
export class OrderPageMetaModule {}
