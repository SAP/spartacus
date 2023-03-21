import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountModule } from './cdp-my-account';
// import { CdpPageTitleComponent } from './cdp-page-title/cdp-page-title.component';
import { CdpMyAccountSideModule } from './cdp-my-account-side/cdp-my-account-side.module';
import { OrderModule } from '@spartacus/order';



@NgModule({
  declarations: [
    // CdpPageTitleComponent
  ],
  imports: [
    CommonModule,
    CdpMyAccountModule,
    CdpMyAccountSideModule,
    OrderModule
  ]
})
export class CdpComponentsModule { }
