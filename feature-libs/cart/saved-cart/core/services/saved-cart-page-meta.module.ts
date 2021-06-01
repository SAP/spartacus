import { NgModule } from '@angular/core';
import { PageMetaResolver } from '@spartacus/core';
import { SavedCartPageMetaResolver } from './saved-cart-page-meta.resolver';

@NgModule({
  providers: [
    {
      provide: PageMetaResolver,
      useExisting: SavedCartPageMetaResolver,
      multi: true,
    },
  ],
})
export class SavedCartPageMetaModule {}
