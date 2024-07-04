import { NgModule } from '@angular/core';
import { CardModule, OutletPosition, provideOutlet } from '@spartacus/storefront';
import { ServiceDetailsCardComponent } from './service-details-card.component';
import { CommonModule } from '@angular/common';
import { I18nModule } from '@spartacus/core';
import { CartOutlets } from '@spartacus/cart/base/root';

@NgModule({
  imports: [CardModule, CommonModule, I18nModule],
  exports: [ServiceDetailsCardComponent],
  declarations: [ServiceDetailsCardComponent],
  providers: [
    provideOutlet({
      id: CartOutlets.SERVICE_DETAILS,
      position: OutletPosition.REPLACE,
      component: ServiceDetailsCardComponent,
    }),
  ],
})
export class ServiceDetailsCardModule {}
