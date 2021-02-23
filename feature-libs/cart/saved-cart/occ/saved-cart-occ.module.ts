import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { SAVED_CARTS_NORMALIZER } from '../core/connectors/converters';
import { SavedCartAdapter } from '../core/connectors/saved-cart.adapter';
import { OccSavedCartAdapter } from './adapters/occ-saved-cart.adapter';
import { defaultOccSavedCartConfig } from './config/default-occ-saved-cart-config';
import { OccSavedCartListNormalizer } from './converters/occ-saved-cart-list-normalizer';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccSavedCartConfig),
    {
      provide: SavedCartAdapter,
      useClass: OccSavedCartAdapter,
    },
    {
      provide: SAVED_CARTS_NORMALIZER,
      useExisting: OccSavedCartListNormalizer,
      multi: true,
    },
  ],
})
export class SavedCartOccModule {}
