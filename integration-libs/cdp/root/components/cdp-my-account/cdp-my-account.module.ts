import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
// import { CdpMyAccountComponent } from '@spartacus/cdp/root';
import { SpinnerModule } from '@spartacus/storefront';
import { CdpMyAccountComponent } from './cdp-my-account.component';

@NgModule({
  declarations: [CdpMyAccountComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    UrlModule,
    I18nModule,
    FeaturesConfigModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CdpMyAccountComponent: { component: CdpMyAccountComponent },
      },
    }),
  ],
  exports: [CdpMyAccountComponent],
})
export class CdpMyAccountModule {}
