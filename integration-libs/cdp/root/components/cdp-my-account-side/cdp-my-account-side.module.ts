import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ListNavigationModule, PageSlotModule } from '@spartacus/storefront';
import {  CmsConfig, ConfigModule, FeaturesConfigModule, I18nModule,  UrlModule } from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CdpMyAccountSideComponent } from './cdp-my-account-side.component';
import { IconModule } from "../../../../../projects/storefrontlib/cms-components/misc/icon/icon.module";




@NgModule({
    declarations: [
        CdpMyAccountSideComponent
    ],
    // providers: [
    //   {
    //     provide: AuthService,
    //     useExisting: AuthService,
    //   },
    // ],
    exports: [CdpMyAccountSideComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        NgSelectModule,
        IconModule,
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
        IconModule
    ]
})
export class CdpMyAccountSideModule { }
