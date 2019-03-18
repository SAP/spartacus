import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  StorefrontComponent,
  StorefrontModule,
  defaultCmsContentConfig
} from '@spartacus/storefront';

import { environment } from '../environments/environment';
import { ConfigModule } from '@spartacus/core';

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
      }
    }),

    ConfigModule.withConfigFactory(defaultCmsContentConfig),
    ...devImports
  ],

  bootstrap: [StorefrontComponent]
})
export class AppModule {}
