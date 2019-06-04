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
import { StorefrontComponent } from '@spartacus/storefront';
import { B2cStorefrontModule } from 'projects/storefrontlib/src/config/b2c-storefront.module';
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
        parameters: {
          BASE_SITE: {
            values: [
              'electronics-spa',
              'electronics',
              'apparel-de',
              'apparel-uk',
            ],
            defaultValue: 'electronics-spa',
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

    ...devImports,
  ],
  bootstrap: [StorefrontComponent],
})
export class AppModule {}
