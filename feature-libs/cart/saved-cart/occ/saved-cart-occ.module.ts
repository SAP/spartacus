import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { SavedCartAdapter } from '../core/connectors/saved-cart.adapter';
import { OccSavedCartAdapter } from './adapters/occ-saved-cart.adapter';
import { defaultOccSavedCartConfig } from './config/default-occ-saved-cart-config';

@NgModule({
  imports: [CommonModule],
  providers: [
    provideDefaultConfig(defaultOccSavedCartConfig),
    {
      provide: SavedCartAdapter,
      useClass: OccSavedCartAdapter,
    },
  ],
})
export class SavedCartOccModule {}
