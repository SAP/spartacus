import { NgModule } from '@angular/core';
import { SavedCartComponentsModule } from '@spartacus/cart/saved-cart/components';
import { SavedCartCoreModule } from '@spartacus/cart/saved-cart/core';
import { SavedCartOccModule } from '@spartacus/cart/saved-cart/occ';
import { AuthGuard } from '@spartacus/core';
import { LastAuthGuard } from './last-auth.guard';

@NgModule({
  imports: [SavedCartCoreModule, SavedCartOccModule, SavedCartComponentsModule],
  providers: [
    {
      provide: AuthGuard,
      useExisting: LastAuthGuard,
    },
  ],
})
export class SavedCartModule {}
