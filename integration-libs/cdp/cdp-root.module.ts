import { NgModule } from '@angular/core';
import { CdpComponentsModule } from './root/components/cdp-components.module';
import { CdpLoginModule } from './user-account/cdp-login';



@NgModule({
  declarations: [
  ],
  imports: [
    CdpLoginModule,
    CdpComponentsModule
  ],
  exports: [
  ]
})
export class CdpRootModule { }
