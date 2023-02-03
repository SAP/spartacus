import { NgModule } from '@angular/core';
import { CdpComponent } from './cdp.component';
import { MyAccountComponent } from './my-account/my-account/my-account.component';



@NgModule({
  declarations: [
    CdpComponent,
    MyAccountComponent
  ],
  imports: [
  ],
  exports: [
    CdpComponent
  ]
})
export class CdpModule { }
