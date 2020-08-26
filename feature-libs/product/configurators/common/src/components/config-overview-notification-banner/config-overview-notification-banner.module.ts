import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
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
    ConfigModule.withConfig(<CmsConfig>{
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
