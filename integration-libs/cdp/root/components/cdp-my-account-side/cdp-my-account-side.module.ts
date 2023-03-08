import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ListNavigationModule, PageSlotModule } from '@spartacus/storefront';
import {  CmsConfig, ConfigModule, FeaturesConfigModule, I18nModule,  UrlModule } from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CdpMyAccountSideComponent } from './cdp-my-account-side.component';




@NgModule({
    declarations: [
        CdpMyAccountSideComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        ListNavigationModule,
        UrlModule,
        I18nModule,
        PageSlotModule,
        FeaturesConfigModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
              CdpMyAccountSideComponent: { component: CdpMyAccountSideComponent },
            },
            // layoutSlots: {
            //   CdpMyAccountPageTemplate: {
            //     slots: ['BodyContent', 'SideContent'],
            //   },
            // },
          }),
    ],
    // providers: [
    //   {
    //     provide: AuthService,
    //     useExisting: AuthService,
    //   },
    // ],
    exports: [CdpMyAccountSideComponent]
})
export class CdpMyAccountSideModule { }
