import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { CdpNavigationComponent } from './cdp-navigation.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CdpNavigationComponent: { component: CdpNavigationComponent },
      },
    }),
  ]
})
export class CdpNavigationModule { }
