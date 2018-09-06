import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from './currency-selector.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [CurrencySelectorComponent],
  exports: [CurrencySelectorComponent]
})
export class CurrencySelectorModule {}
