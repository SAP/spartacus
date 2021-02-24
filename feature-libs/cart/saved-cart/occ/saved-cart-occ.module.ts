import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { defaultOccSavedCartConfig } from './config/default-occ-saved-cart-config';

@NgModule({
  imports: [CommonModule],
  providers: [provideDefaultConfig(defaultOccSavedCartConfig)],
})
export class SavedCartOccModule {}
