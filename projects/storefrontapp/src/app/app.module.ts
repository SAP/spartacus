import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  StorefrontComponent,
  StorefrontModule,
  translations
} from '@spartacus/storefront';

import { environment } from '../environments/environment';

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
      server: {
        baseUrl: environment.occBaseUrl
      },
      site: {
        baseSite: 'electronics-spa'
      },
      pwa: {
        enabled: true,
        addToHomeScreen: true
      },
      siteContext: {
        urlEncodingParameters: ['LANGUAGE', 'CURRENCY']
      },
      routesConfig: {
        translations: {
          default: {
            product: {
              paths: ['product/:productCode', 'product/:name/:productCode']
            }
          }
        }
      },
      i18n: {
        resources: translations
      }
    }),
    ...devImports
  ],

  bootstrap: [StorefrontComponent]
})
export class AppModule {}
