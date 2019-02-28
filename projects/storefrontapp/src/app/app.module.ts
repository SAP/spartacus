import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StorefrontComponent, StorefrontModule } from '@spartacus/storefront';
import { LanguageService } from '@spartacus/core';

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
      site: {
        // baseSite: 'electronics-spa'
      },
      server: {
        baseUrl:
          'https://storefront.c39j2-walkersde1-d4-public.model-t.cc.commerce.ondemand.com'
        // 'https://dev-com-17.accdemo.b2c.ydev.hybris.com:9002'
        // 'https://dev-com-21.accdemo.b2c.ydev.hybris.com:9002'
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
    ...devImports
  ],

  bootstrap: [StorefrontComponent]
})
export class AppModule {
  constructor(_lang: LanguageService) {
    // _lang.setActive('en');
    // setTimeout(() => {
    //   _lang.setActive('de');
    // }, 3000);
  }
}
