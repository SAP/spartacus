import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule } from '@spartacus/core';
import { GenericConfiguratorModule } from '@spartacus/storefront';
import { ConfigOverviewNotificationBannerComponent } from './config-overview-notification-banner.component';

@NgModule({
  imports: [
    CommonModule,
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
