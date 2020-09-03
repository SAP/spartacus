import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { GenericConfiguratorModule, IconModule } from '@spartacus/storefront';
import { ConfigOverviewNotificationBannerComponent } from './config-overview-notification-banner.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    IconModule,
    RouterModule,
    GenericConfiguratorModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        VariantConfigurationOverviewBanner: {
          component: ConfigOverviewNotificationBannerComponent,
        },
      },
    }),
  ],
  declarations: [ConfigOverviewNotificationBannerComponent],
  exports: [ConfigOverviewNotificationBannerComponent],
  entryComponents: [ConfigOverviewNotificationBannerComponent],
})
export class ConfigOverviewNotificationBannerModule {}
