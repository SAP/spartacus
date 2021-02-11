import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CostCenterOccModule, provideDefaultConfig } from '@spartacus/core';
import { defaultOccSavedCartConfig } from './config/default-occ-saved-cart-config';

@NgModule({
  imports: [CommonModule, CostCenterOccModule],
  providers: [provideDefaultConfig(defaultOccSavedCartConfig)],
})
export class SavedCartOccModule {}
