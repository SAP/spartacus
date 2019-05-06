import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConfigModule } from '@spartacus/core';
import {
  defaultCmsContentConfig,
  StorefrontComponent,
  StorefrontModule,
  translations,
} from '@spartacus/storefront';
import { environment } from '../environments/environment';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];

if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    StorefrontModule.withConfig({
      production: environment.production,
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
        },
      },
      pwa: {
        enabled: true,
        addToHomeScreen: true,
      },
      siteContext: {
        urlEncodingParameters: ['BASE_SITE', 'LANGUAGE', 'CURRENCY'],
        parameters: {
          BASE_SITE: {
            values: [
              'electronics-spa',
              'electronics',
              'apparel-de',
              'apparel-uk',
            ],
            defaultValue: 'electronics-spa',
            persistence: 'route',
          },
        },
      },
      routing: {
        routes: {
          product: {
            paths: ['product/:name/:productCode', 'product/:productCode'],
          },
        },
      },
      i18n: {
        resources: translations,
      },
    }),

    ConfigModule.withConfigFactory(defaultCmsContentConfig),

    ...devImports,
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {}
