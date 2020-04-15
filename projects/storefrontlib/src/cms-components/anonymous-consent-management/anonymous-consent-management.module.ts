import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  DeferLoadingStrategy,
  FeaturesConfigModule,
  I18nModule,
  provideDefaultConfig,
} from '@spartacus/core';
import { AnonymousConsentManagementBannerComponent } from './banner/anonymous-consent-management-banner.component';
import { AnonymousConsentOpenDialogComponent } from './open-dialog/anonymous-consent-open-dialog.component';

@NgModule({
  imports: [CommonModule, I18nModule, FeaturesConfigModule],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AnonymousConsentManagementBannerComponent: {
          component: AnonymousConsentManagementBannerComponent,
          deferLoading: DeferLoadingStrategy.INSTANT,
        },
        AnonymousConsentOpenDialogComponent: {
          component: AnonymousConsentOpenDialogComponent,
        },
      },
    }),
  ],
  declarations: [
    AnonymousConsentManagementBannerComponent,
    AnonymousConsentOpenDialogComponent,
  ],
  exports: [
    AnonymousConsentManagementBannerComponent,
    AnonymousConsentOpenDialogComponent,
  ],
  entryComponents: [
    AnonymousConsentManagementBannerComponent,
    AnonymousConsentOpenDialogComponent,
  ],
})
export class AnonymousConsentManagementBannerModule {}
