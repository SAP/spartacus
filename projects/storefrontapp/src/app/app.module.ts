/*
 * SPDX-FileCopyrightText: 2024 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import {
  APP_INITIALIZER,
  Injectable,
  NgModule,
  OnDestroy,
  Provider,
  inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  CxEvent,
  EventService,
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  OccProductAdapter,
  Product,
  ProductAdapter,
  ProductScope,
  RoutingConfig,
  ScopedProductData,
  Stock,
  TestConfigModule,
  WindowRef,
  provideConfig
} from '@spartacus/core';
import { StoreFinderConfig } from '@spartacus/storefinder/core';
import { GOOGLE_MAPS_DEVELOPMENT_KEY_CONFIG } from '@spartacus/storefinder/root';
import {
  AppRoutingModule,
  NavigationEvent,
  StorefrontComponent,
  USE_LEGACY_MEDIA_COMPONENT
} from '@spartacus/storefront';
import { Observable, Subscription, interval } from 'rxjs';
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

/**
 * Command event to reload stock of all products that are currently used
 * e.g. displayed on the page.
 * 
 * - on PDP it will reload 1 product's stock
 * - on homepage showing many miniatures of products - it might reload many products' stocks
 */
export class ReloadProductStockEvent extends CxEvent {
  static readonly type = 'ReloadProductStock';
}

/**
 * Subscribes to some source events (e.g. page navigation, timer, or global window
 * function invocation) and dispatches the `ReloadProductStockEvent` when it's time.
 */
@Injectable({
  providedIn: 'root',
})
export class ProductStockReloadService implements OnDestroy {
  protected windowRef = inject(WindowRef);
  protected eventService = inject(EventService);

  protected sub = new Subscription();

  initialize() {
    if (this.windowRef.isBrowser()) {
      // RELOAD PERIODICALLY
      this.sub.add(interval(3_000).subscribe(() => this.reloadStock()));

      // RELOAD ON DEMAND
      (window as any).reloadStock = ()=>this.reloadStock();

      // RELOAD ON ROUTE CHANGE
      this.sub.add(this.eventService.get(NavigationEvent).subscribe((_event) => {
        this.reloadStock();
      }));
    }
  }

  protected reloadStock(){
    this.eventService.dispatch(new ReloadProductStockEvent());
    console.log('Product stock reload event dispatched');
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}


/**
 * Fixes issues with the default product occ config, where STOCK is not semantically
 * declared as a part of the DETAILS scope.
 * 
 * See projects/core/src/occ/adapters/product/default-occ-product-config.ts
 * 
 * Moreover, it configures reloading of STOCK scope on event `ReloadProductStockEvent`.
 */
export const customBackendConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        product: {
          // removed ",stock(DEFAULT)" from default config: 
          [ProductScope.DETAILS]:
            'products/${productCode}?fields=averageRating,description,availableForPickup,code,url,price(DEFAULT),numberOfReviews,manufacturer,categories(FULL),priceRange,multidimensional,tags,images(FULL)',
        },
      },
    },
    loadingScopes: {
      product: {
        [ProductScope.DETAILS]: {
          include: [
            ProductScope.LIST,
            ProductScope.VARIANTS,
            ProductScope.STOCK, // it was missing in the default config
          ],
        },

        // configure reloading of STOCK scope on event `ReloadProductStockEvent`
        [ProductScope.STOCK]: {
          reloadOn: [ReloadProductStockEvent],
        },
      },
    },
  },
};


/**
 * Makes actual HTTP requests to the fake server, to get stock data.
 */
@Injectable({ providedIn: 'root' })
export class FakeServerService {
  protected httpClient = inject(HttpClient);
  protected getUrl(productCode: string): string {
    return `http://localhost:9003/fake-server/get-stock/${productCode}`;
  }

  getStock(productCode: string): Observable<{stock: Stock}> {
    return this.httpClient.get<{stock: Stock}>(this.getUrl(productCode));
  }
}

/**
 * Customized product adapter that uses the fake server to get product's stock data,
 * but the default OCC adapter for other product's data.
 */
@Injectable({providedIn: 'root'})
export class CustomOccProductAdapter extends OccProductAdapter {
  protected fakeServer = inject(FakeServerService)


  load(productCode: string, scope?: string): Observable<Product> {
    if (scope === ProductScope.STOCK) {
      return this.fakeServer.getStock(productCode);
    }
    return super.load(productCode, scope);
  }

  loadMany(products: ScopedProductData[]): ScopedProductData[] {
    const products_withoutScopeStock = products.filter(
      (product) => product.scope !== ProductScope.STOCK
    );
    const products_withScopeStock = products.filter(
      (product) => product.scope === ProductScope.STOCK
    );

    const responses_withoutScopeStock: ScopedProductData[] = super.loadMany(
      products_withoutScopeStock
    );
    const responses_withScopeStock: ScopedProductData[] =
      products_withScopeStock.map((product) => {
        return {
          ...product,
          data$: this.fakeServer.getStock(product.code),
        } satisfies ScopedProductData;
      });

    // let's preserve original order!
    return products.map((product) => {
      if (product.scope === ProductScope.STOCK) {
        return responses_withScopeStock.shift();
      } else {
        return responses_withoutScopeStock.shift();
      }
    }) as ScopedProductData[];
  }
}

/**
 * Bundle all custom providers together for easier providing in the AppModule.
 */
export const customProviders: Provider[] = [
  provideConfig(customBackendConfig),
  
  {
    provide: APP_INITIALIZER,
    useFactory: () => {
      const service = inject(ProductStockReloadService);
      return () => service.initialize();
    },
    multi: true,
  },

  { provide: ProductAdapter, useExisting: CustomOccProductAdapter },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // SPIKE - for visual demo purposes only
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,
    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
  ],
  providers: [
    customProviders, // SPIKE - normally, import a separate module, e.g. OmsaModule or OmsaRootModule
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: 'http://localhost:9002', // SPIKE - for visual demo purposes only - to use proxy server
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
