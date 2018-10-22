import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StorefrontComponent, StorefrontModule } from '@spartacus/storefront';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

const devImports = [];

if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule,
    StorefrontModule.withConfig({
      server: {
        baseUrl: environment.occBaseUrl
      },

      routePaths: {
        // any need for homepage?
        // homepage: '',

        cart: 'my-cart',
        search: 'my-search',
        login: 'my-login',
        register: 'my-register',
        resetNewPassword: 'my-reset-new-password',
        resetPassword: 'my-reset-password',
        checkout: 'my-checkout',
        orderConfirmation: 'my-order-confirmation',
        products: 'my-products',
        storeFinder: 'my-store-finder',

        // myAccount pages
        myAccount: {
          orders: 'my-orders',
          paymentMethods: 'my-payment-methods'
        },

        // content pages:
        contact: 'my-contact',
        help: 'my-help',
        sale: 'my-sale'

        // Rethink all those
        // PARAMTERIZABLE: [
        //   // different handlings of the same component:
        //   {
        //     path: 'category/:categoryCode'
        //     // canActivate: [CmsPageGuards],
        //     // component: CategoryPageComponent
        //   },
        //   {
        //     path: 'category/:categoryCode/:title'
        //     // canActivate: [CmsPageGuards],
        //     // component: CategoryPageComponent
        //   },
        //   {
        //     path: 'Brands/:brandName/c/:brandCode'
        //     // canActivate: [CmsPageGuards],
        //     // component: CategoryPageComponent
        //   }
        // ],

        // // should we support this?
        // OLD: [
        //   // product:
        //   {
        //     path:
        //       'Open-Catalogue/:category1/:category2/:category3/:category4/p/:productCode',
        //     redirectTo: 'product/:productCode'
        //   },

        //   // category:
        //   {
        //     path: 'Open-Catalogue/:categoryTitle/c/:categoryCode',
        //     redirectTo: '/category/:categoryCode/:categoryTitle'
        //   },
        //   {
        //     path: 'Open-Catalogue/:category1/:categoryTitle/c/:categoryCode',
        //     redirectTo: '/category/:categoryCode/:categoryTitle'
        //   },
        //   {
        //     path:
        //       'Open-Catalogue/:category1/:category2/:categoryTitle/c/:categoryCode',
        //     redirectTo: '/category/:categoryCode/:categoryTitle'
        //   },
        //   {
        //     path:
        //       'OpenCatalogue/:category1/:category2/:categoryTitle/c/:categoryCode',
        //     redirectTo: '/category/:categoryCode/:categoryTitle'
        //   }
        // ]
      }
    }),
    ...devImports
  ],
  bootstrap: [StorefrontComponent]
})
export class AppModule {}
