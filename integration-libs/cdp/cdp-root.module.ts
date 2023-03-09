import { NgModule } from '@angular/core';
import { CmsConfig, provideDefaultConfig } from '@spartacus/core';
import { CdpComponentsModule } from './root/components/cdp-components.module';
import { CdpMyAccountComponent } from './root/components/cdp-my-account';
import { CdpLoginModule } from './user-account/cdp-login';



@NgModule({
  declarations: [
  ],
  imports: [
    CdpLoginModule,
    CdpComponentsModule
  ],
  providers: [
      provideDefaultConfig({ cmsComponents: {
        CdpMyAccountComponent: { component:   CdpMyAccountComponent} ,
      },
     }  as CmsConfig),
    ],
  exports: [
  ]
})
export class CdpRootModule { }
