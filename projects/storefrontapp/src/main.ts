/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { StorefrontComponent } from '../../storefrontlib/layout/main/storefront.component';
import { TestOutletModule } from './test-outlets/test-outlet.module';
import { SpartacusModule } from './app/spartacus/spartacus.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { USE_LEGACY_MEDIA_COMPONENT, AppRoutingModule } from '@spartacus/storefront';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import { StoreFinderConfig } from '@spartacus/storefinder/core';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { provideConfig, OccConfig, RoutingConfig, I18nConfig, TestConfigModule } from '@spartacus/core';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

const devImports = [];



if (environment.production) {
  enableProdMode();
}

function bootstrap() {
  bootstrapApplication(StorefrontComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, StoreModule.forRoot({}), EffectsModule.forRoot([]), SpartacusModule, TestOutletModule, // custom usages of cxOutletRef only for e2e testing
        TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.
        ...devImports),
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
        provideConfig({ features: { level: '*' } }),
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
    ]
})
    /* eslint-disable-next-line no-console
    --
    It's just an example application file. This message is not crucial
    to be logged using any special logger. Moreover, we don't have
    any special logger available in this context. */
    .catch((err) => console.error(err));
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}
