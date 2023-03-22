import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ListNavigationModule, PageSlotModule } from '@spartacus/storefront';
import {  CmsConfig, ConfigModule, FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import { CdpMyAccountSideNavigationComponent } from './cdp-my-account-side-navigation.component';
import { IconModule } from "../../../../../projects/storefrontlib/cms-components/misc/icon/icon.module";




@NgModule({
    declarations: [
        CdpMyAccountSideNavigationComponent
    ],
    // providers: [
    //   {
    //     provide: AuthService,
    //     useExisting: AuthService,
    //   },
    // ],
    exports: [CdpMyAccountSideNavigationComponent],
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
                CdpMyAccountSideComponent: { component: CdpMyAccountSideNavigationComponent },
            },
            layoutSlots: {
              CdpMyAccountPageTemplate: {
                slots: ['ProductLeftRefinements', 'ProductListSlot'],
              },
            },
        }),
        IconModule
    ]
})
export class CdpMyAccountSideNavigationModule { }
