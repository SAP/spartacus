import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { AnonymousConsentManagementBannerComponent } from './anonymous-consent-management-banner.component';

@NgModule({
  imports: [
    CommonModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        AnonymousConsentManagementBannerComponent: {
          component: AnonymousConsentManagementBannerComponent,
        },
      },
    }),
    I18nModule,
  ],
  declarations: [AnonymousConsentManagementBannerComponent],
  exports: [AnonymousConsentManagementBannerComponent],
  entryComponents: [AnonymousConsentManagementBannerComponent],
})
export class AnonymousConsentManagementBannerModule {}
