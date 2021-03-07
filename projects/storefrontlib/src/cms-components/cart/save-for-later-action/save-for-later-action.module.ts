import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  I18nModule,
} from '@spartacus/core';
import { OutletPosition } from '../../../cms-structure/outlet/outlet.model';
import { provideOutlet } from '../../../cms-structure/outlet/outlet.providers';
import { CartOutlets } from '../cart-outlets.model';
import { CartSharedModule } from '../cart-shared/cart-shared.module';
import { SaveForLaterActionComponent } from './save-for-later-action.component';

@NgModule({
  imports: [CommonModule, I18nModule, CartSharedModule],
  providers: [
    provideOutlet({
      id: CartOutlets.ITEM_ACTIONS,
      position: OutletPosition.BEFORE,
      component: SaveForLaterActionComponent,
    }),
  ],
  declarations: [SaveForLaterActionComponent],
  exports: [SaveForLaterActionComponent],
  entryComponents: [SaveForLaterActionComponent],
})
export class SaveForLaterActionModule {}
