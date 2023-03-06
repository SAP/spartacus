import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountModule } from './cdp-my-account';
import { CdpPageTitleComponent } from './cdp-page-title/cdp-page-title.component';
import { CdpMyAccountSideComponent } from './cdp-my-account-side/cdp-my-account-side.component';



@NgModule({
  declarations: [
    CdpPageTitleComponent,
    CdpMyAccountSideComponent
  ],
  imports: [
    CommonModule,
    CdpMyAccountModule
  ]
})
export class CdpComponentsModule { }
