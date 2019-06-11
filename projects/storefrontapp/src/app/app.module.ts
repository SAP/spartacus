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
import { translations } from '@spartacus/assets';
import { CdsConfig, CdsModule } from '@spartacus/cds';
import { ConfigModule } from '@spartacus/core';
import {
  B2cStorefrontModule,
  StorefrontComponent,
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

    B2cStorefrontModule.withConfig({
      production: environment.production,
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          legacy: false,
        },
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

      // special routing confiuration for e2e testing
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
          },
        },
      },

      // we  bring in static translations to be up and running soon right away
      // but adding
      i18n: {
        resources: translations,
      },
    }),

    CdsModule,
    ConfigModule.withConfig(<CdsConfig>{
      cds: {
        baseUrl: 'https://htv730345050.api.us.context.cloud.sap',
        tenantId: 'htv730345050',
        allowInsecureCookies: true,
        clientId: 'htv730345050.spartacusseb',
        profileTagTrackUrl:
          'https://tag.static.us.context.cloud.sap/config/6665e5b0-810e-11e9-93f1-1dd46bc3fec0',
      },
    }),

    ...devImports,
  ],
  bootstrap: [StorefrontComponent],
})
export class AppModule {}
