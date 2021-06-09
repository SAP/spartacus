import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CmsConfig,
  DeferLoadingStrategy,
  FeaturesConfigModule,
  I18nModule,
  provideConfig,
  provideDefaultConfig,
} from '@spartacus/core';
import { KeyboardFocusModule } from '../../layout/a11y/keyboard-focus/index';
import { AnonymousConsentManagementBannerComponent } from './banner/anonymous-consent-management-banner.component';
import { defaultAnonymousConsentLayoutConfig } from './default-anonymous-consent-layout.config';
import { AnonymousConsentOpenDialogComponent } from './open-dialog/anonymous-consent-open-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FeaturesConfigModule,
    KeyboardFocusModule,
  ],
  providers: [
    provideConfig(defaultAnonymousConsentLayoutConfig),
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
})
export class AnonymousConsentManagementBannerModule {}
