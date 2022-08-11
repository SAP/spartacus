import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { ConfiguratorOverviewNotificationBannerComponent } from './configurator-overview-notification-banner.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, IconModule, RouterModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ConfiguratorOverviewBanner: {
          component: ConfiguratorOverviewNotificationBannerComponent,
        },
      },
    }),
  ],
  declarations: [ConfiguratorOverviewNotificationBannerComponent],
  exports: [ConfiguratorOverviewNotificationBannerComponent],
})
export class ConfiguratorOverviewNotificationBannerModule {}
