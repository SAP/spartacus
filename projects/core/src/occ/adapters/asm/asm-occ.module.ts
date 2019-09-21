import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CustomerAdapter } from '../../../asm/connectors/customer.adapter';
import { ConfigModule } from '../../../config/config.module';
import { defaultOccAsmConfig } from './default-occ-asm-config';
import { OccCustomerAdapter } from './occ-customer.adapter';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ConfigModule.withConfig(defaultOccAsmConfig),
  ],
  providers: [
    {
      provide: CustomerAdapter,
      useClass: OccCustomerAdapter,
    },
  ],
})
export class AsmOccModule {}
