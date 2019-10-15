import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
} from '@spartacus/core';
import { AnonymousConsentManagementBannerComponent } from './anonymous-consent-management-banner.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AnonymousConsentManagementBannerComponent: {
          component: AnonymousConsentManagementBannerComponent,
        },
      },
    }),
  ],
  declarations: [AnonymousConsentManagementBannerComponent],
  exports: [AnonymousConsentManagementBannerComponent],
  entryComponents: [AnonymousConsentManagementBannerComponent],
})
export class AnonymousConsentManagementBannerModule {}
