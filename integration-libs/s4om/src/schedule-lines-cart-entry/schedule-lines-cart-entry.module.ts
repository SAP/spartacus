import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletPosition,
  provideOutlet
} from '@spartacus/storefront';
import { ScheduleLinesCartEntryComponent } from './schedule-lines-cart-entry.component';

@NgModule({
  imports: [
    CommonModule,
    UrlModule,
    I18nModule,
    IconModule,
  ],
  declarations: [ScheduleLinesCartEntryComponent],

  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ScheduleLinesCartEntryComponent,
    }),
  ],
})
export class ScheduleLinesCartEntryModule {}
