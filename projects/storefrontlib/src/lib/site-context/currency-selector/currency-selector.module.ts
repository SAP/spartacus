import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencySelectorComponent } from './currency-selector.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CurrencySelectorComponent],
  exports: [CurrencySelectorComponent]
})
export class CurrencySelectorModule {}
