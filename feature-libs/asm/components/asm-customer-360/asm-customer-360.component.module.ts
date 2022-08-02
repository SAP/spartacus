import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AsmCustomer360Component } from './asm-customer-360.component';
import { AsmCustomerMapComponentModule } from './asm-customer-map/asm-customer-map.component.module';

@NgModule({
    imports: [
        CommonModule,
        AsmCustomerMapComponentModule,
    ],
    declarations: [
        AsmCustomer360Component,
    ],
    exports: [
        AsmCustomer360Component,
    ],
})
export class AsmCustomer360ComponentModule {
}
