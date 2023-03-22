import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountModule } from './cdp-my-account';
import { CdpMyAccountSideNavigationModule } from './cdp-my-account-side-navigation/cdp-my-account-side-navigation.module';
import { OrderModule } from '@spartacus/order';



@NgModule({
  imports: [
    CommonModule,
    CdpMyAccountModule,
    CdpMyAccountSideNavigationModule,
    OrderModule
  ]
})
export class CdpComponentsModule { }
