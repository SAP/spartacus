import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CustomerAdapter } from '../../../asm/connectors/customer.adapter';
import { OccCustomerAdapter } from './occ-customer.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CustomerAdapter,
      useClass: OccCustomerAdapter,
    },
  ],
})
export class AsmOccModule {}
