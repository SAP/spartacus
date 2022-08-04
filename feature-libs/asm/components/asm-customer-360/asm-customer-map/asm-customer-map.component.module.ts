import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsmCustomerMapComponent } from './asm-customer-map.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AsmCustomerMapComponent],
  exports: [AsmCustomerMapComponent],
})
export class AsmCustomerMapComponentModule {}
