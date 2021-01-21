import { CommonModule, registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { Component, NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { translationChunksConfig, translations } from '@spartacus/assets';
import { ConfigModule, TestConfigModule } from '@spartacus/core';
import {
  JsonLdBuilderModule,
  OutletPosition,
  provideOutlet,
  StorefrontComponent,
} from '@spartacus/storefront';
import { b2bFeature } from '../environments/b2b/b2b.feature';
import { b2cFeature } from '../environments/b2c/b2c.feature';
import { cdcFeature } from '../environments/cdc/cdc.feature';
import { cdsFeature } from '../environments/cds/cds.feature';
import { environment } from '../environments/environment';
import { productConfigFeature } from '../environments/productconfig/productconfig.feature';
import { TestOutletModule } from '../test-outlets/test-outlet.module';

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
if (environment.productConfig) {
  additionalImports = [...additionalImports, ...productConfigFeature.imports];
}
if (environment.b2b) {
  additionalImports = [...additionalImports, ...b2bFeature.imports];
} else {
  additionalImports = [...additionalImports, ...b2cFeature.imports];
}

if (environment.cdc) {
  additionalImports = [...additionalImports, ...cdcFeature.imports];
}

console.log(`********************************************`);
console.log('environment', environment);
console.log('environment.productConfig', environment.productConfig);
console.log(`********************************************`);

@Component({
  template: `<ul>
    <li>
      <pre>'environment', {{ environment | json }}</pre>
    </li>
    <li>'environment.productConfig', {{ environment.productConfig }}</li>
  </ul> `,
})
export class DebugSpikeComponent {
  environment = environment;
}

@NgModule({
  providers: [
    provideOutlet({
      id: 'cx-header',
      component: DebugSpikeComponent,
      position: OutletPosition.AFTER,
    }),
  ],
  imports: [
    CommonModule,
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    JsonLdBuilderModule,
    ConfigModule.withConfig({
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
        },
      },

      // custom routing configuration for e2e testing
      routing: {
        routes: {
          product: {
            paths: ['product/:productCode/:name', 'product/:productCode'],
          },
        },
      },

      // we bring in static translations to be up and running soon right away
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },

      features: {
        level: '2.1',
      },
    }),
    ...additionalImports,
    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
  ],
  declarations: [DebugSpikeComponent],
  bootstrap: [StorefrontComponent],
})
export class AppModule {}
