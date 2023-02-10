import { NgModule } from '@angular/core';
import { CdpMyAccountComponent } from './components/cdp-my-account/cdp-my-account.component';
import { CdpLoginModule } from './user-account/cdp-login';



@NgModule({
  declarations: [
    CdpMyAccountComponent
  ],
  imports: [
    CdpLoginModule
  ],
  exports: [
    CdpMyAccountComponent
  ]
})
export class CdpRootModule { }
