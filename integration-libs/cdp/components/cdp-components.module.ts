import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountModule } from './cdp-my-account';
import { OrderModule } from './cdp-order/cdp-order.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CdpMyAccountModule,
    OrderModule
  ]
})
export class CdpComponentsModule { }
