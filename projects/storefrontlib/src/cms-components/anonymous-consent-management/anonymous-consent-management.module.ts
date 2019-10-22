import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  ConfigModule,
  FeaturesConfigModule,
  I18nModule,
} from '@spartacus/core';
import { AnonymousConsentManagementBannerComponent } from './banner/anonymous-consent-management-banner.component';
import { AnonymousConsentFooterLinkComponent } from './footer-link/anonymous-consent-footer-link-component';

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
        AnonymousConsentFooterLinkComponent: {
          component: AnonymousConsentFooterLinkComponent,
        },
      },
    }),
  ],
  declarations: [
    AnonymousConsentManagementBannerComponent,
    AnonymousConsentFooterLinkComponent,
  ],
  exports: [
    AnonymousConsentManagementBannerComponent,
    AnonymousConsentFooterLinkComponent,
  ],
  entryComponents: [
    AnonymousConsentManagementBannerComponent,
    AnonymousConsentFooterLinkComponent,
  ],
})
export class AnonymousConsentManagementBannerModule {}
