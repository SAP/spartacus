import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from './currency-selector.component';

import { SiteContextModule } from '@spartacus/core';

@NgModule({
  imports: [CommonModule, SiteContextModule],
  declarations: [CurrencySelectorComponent],
  exports: [CurrencySelectorComponent]
})
export class CurrencySelectorModule {}
