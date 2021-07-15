import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  DeferLoadingStrategy,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { KeyboardFocusModule } from '@spartacus/storefront';
import { AnonymousConsentManagementBannerComponent } from './anonymous-consent-management-banner.component';

@NgModule({
  imports: [CommonModule, I18nModule, KeyboardFocusModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AnonymousConsentManagementBannerComponent: {
          component: AnonymousConsentManagementBannerComponent,
          deferLoading: DeferLoadingStrategy.INSTANT,
        },
      },
    }),
  ],
  declarations: [AnonymousConsentManagementBannerComponent],
  exports: [AnonymousConsentManagementBannerComponent],
})
export class AnonymousConsentManagementBannerModule {}
