import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { AsmCustomerProfileComponent } from './asm-customer-profile.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [AsmCustomerProfileComponent],
  exports: [AsmCustomerProfileComponent],
})
export class AsmCustomerProfileModule {}
