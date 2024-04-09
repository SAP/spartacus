/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerLocaleData } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  RoutingConfig,
  TestConfigModule,
  provideConfig,
} from '@spartacus/core';
import { StoreFinderConfig } from '@spartacus/storefinder/core';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import {
  AppRoutingModule,
  StorefrontComponent,
  USE_LEGACY_MEDIA_COMPONENT,
} from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { SpartacusModule } from './spartacus/spartacus.module';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
        },
      },
    }),
    provideConfig(<RoutingConfig>{
      // custom routing configuration for e2e testing
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
            paramsMapping: { name: 'slug' },
          },
        },
      },
    }),
    provideConfig(<I18nConfig>{
      // we bring in static translations to be up and running soon right away
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<FeaturesConfig>{
      // For the development environment and CI, feature level is always the highest.
      features: {
        level: '*',
        a11yRequiredAsterisks: true,
        a11yQuantityOrderTabbing: true,
        a11yNavigationUiKeyboardControls: true,
        a11yOrderConfirmationHeadingOrder: true,
        a11yStarRating: true,
        a11yPopoverAriaLive: true,
        a11yPopoverFocus: true,
        a11yScheduleReplenishment: true,
        a11yScrollToTop: true,
        a11ySavedCartsZoom: true,
        a11ySortingOptionsTruncation: true,
        a11yExpandedFocusIndicator: true,
        a11yCheckoutDeliveryFocus: true,
        a11yOrganizationsBanner: true,
        a11yOrganizationListHeadingOrder: true,
        a11yReplenishmentOrderFieldset: true,
        a11yListOversizedFocus: true,
        a11yStoreFinderOverflow: true,
        a11yCartSummaryHeadingOrder: true,
      },
    }),
    provideConfig(<StoreFinderConfig>{
      // For security compliance, by default, google maps does not display.
      // Using special key value 'cx-development' allows google maps to display
      // without a key, for development or demo purposes.
      googleMaps: { apiKey: GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG },
    }),
    {
      provide: USE_LEGACY_MEDIA_COMPONENT,
      useValue: false,
    },
  ],
  bootstrap: [StorefrontComponent],
})
export class AppModule {}
