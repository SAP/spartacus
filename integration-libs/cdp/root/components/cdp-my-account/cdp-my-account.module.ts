import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdpMyAccountComponent } from './cdp-my-account.component';
import { LayoutConfig, ListNavigationModule, PageSlotModule } from '@spartacus/storefront';
import { CmsConfig,  ConfigModule,  FeaturesConfigModule, I18nModule, UrlModule } from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
// import { OrderHistoryComponent } from '@spartacus/order/components';




@NgModule({
    declarations: [
        CdpMyAccountComponent
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
        ConfigModule.withConfig(<CmsConfig | LayoutConfig>{
            cmsComponents: {
              CdpMyAccountComponent: { component: CdpMyAccountComponent },
            },
          }),
    ],
    // providers: [
    //   provideDefaultConfig({ cmsComponents: {
    //     CdpMyAccountComponent: { component: CdpMyAccountComponent ,
    //   }
    //  } } as CmsConfig),
    // ],
    exports: [CdpMyAccountComponent],
})
export class CdpMyAccountModule { }
