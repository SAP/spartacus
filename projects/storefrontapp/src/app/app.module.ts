import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { StorefrontComponent, StorefrontModule } from '@spartacus/storefront';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
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
      pwa: {
        enabled: true,
        addToHomeScreen: true
      },
      routes: {
        config: {
          translations: {
            default: {
              product: {
                paths: ['product/:productCode', 'product/:name/:productCode']
              }
            }
          }
        }
      }
    }),
    ...devImports
  ],

  bootstrap: [StorefrontComponent]
})
export class AppModule {}
