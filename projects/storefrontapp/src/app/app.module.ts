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
import { EventService, TestConfigModule } from '@spartacus/core';
import {
  JsonLdBuilderModule,
  StorefrontComponent,
} from '@spartacus/storefront';
import { b2bFeature } from '../environments/b2b/b2b.feature';
import { b2cFeature } from '../environments/b2c/b2c.feature';
import { cdsFeature } from '../environments/cds/cds.feature';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { ProductEventModule } from './events/product-event.module';
import { BrandPageVisited } from './events/product.events';
import { RoutingEventModule } from './events/routing-event.module';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

let additionalImports = [];

if (environment.cds) {
  additionalImports = [...additionalImports, ...cdsFeature.imports];
}

if (environment.b2b) {
  additionalImports = [...additionalImports, ...b2bFeature.imports];
} else {
  additionalImports = [...additionalImports, ...b2cFeature.imports];
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    JsonLdBuilderModule,
    ...additionalImports,
    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    RoutingEventModule,
    ProductEventModule,

    ...devImports,
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {
  constructor(events: EventService) {
    // events.get(PageVisited).subscribe((x) => console.log('sub: ', x));
    // events.get(HomePageVisited).subscribe((x) => console.log('home: ', x));
    // events.get(CartPageVisited).subscribe((x) => console.log('cart: ', x));
    // events
    //   .get(OrderConfirmationPageVisited)
    //   .subscribe((x) => console.log('order confirm: ', x));

    // events
    //   .get(ProductDetailsPageVisited)
    //   .subscribe((x) => console.log('pdp: ', x));
    // events.get(CategoryPageVisited).subscribe((x) => console.log('cat: ', x));
    events.get(BrandPageVisited).subscribe((x) => console.log('brand: ', x));
    // events.get(SearchPageVisited).subscribe((x) => console.log('search: ', x));
  }
}
