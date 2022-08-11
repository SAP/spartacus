import { NgModule } from '@angular/core';
import { SavedCartComponentsModule } from '@spartacus/cart/saved-cart/components';
import { SavedCartCoreModule } from '@spartacus/cart/saved-cart/core';
import { SavedCartOccModule } from '@spartacus/cart/saved-cart/occ';

@NgModule({
  imports: [SavedCartCoreModule, SavedCartOccModule, SavedCartComponentsModule],
})
export class SavedCartModule {}
