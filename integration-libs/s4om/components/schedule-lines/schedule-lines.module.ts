import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartOutlets } from '@spartacus/cart/base/root';
import { I18nModule, UrlModule } from '@spartacus/core';
import {
  IconModule,
  OutletPosition,
  provideOutlet,
} from '@spartacus/storefront';
import { ScheduleLinesComponent } from './schedule-lines.component';

@NgModule({
  imports: [CommonModule, UrlModule, I18nModule, IconModule],

  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_DETAILS,
      position: OutletPosition.AFTER,
      component: ScheduleLinesComponent,
    }),
  ],

  declarations: [ScheduleLinesComponent],
  exports: [ScheduleLinesComponent],
})
export class ScheduleLinesModule {}
