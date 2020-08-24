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
import { ConfigModule, TestConfigModule } from '@spartacus/core';
import {
  JsonLdBuilderModule,
  StorefrontComponent,
  TableConfig,
} from '@spartacus/storefront';
import { b2bFeature } from '../environments/b2b/b2b.feature';
import { b2cFeature } from '../environments/b2c/b2c.feature';
import { cdcFeature } from '../environments/cdc/cdc.feature';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { TestComponent } from './test.component';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

let additionalImports = [];

if (environment.b2b) {
  additionalImports = [...additionalImports, ...b2bFeature.imports];
} else {
  additionalImports = [...additionalImports, ...b2cFeature.imports];
}
if (environment.cdc) {
  additionalImports = [...additionalImports, ...cdcFeature.imports];
}

@NgModule({
  declarations: [TestComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    JsonLdBuilderModule,
    ...additionalImports,
    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,

    // app mod
    ConfigModule.withConfig({
      table: {
        budget: {
          options: {
            fields: {
              // name: {
              //   dataRenderer: TestComponent,
              // },
            },
          },
        },
        //   mockTable: {
        //     fields: ['first', 'second'],
        //     options: {
        //       first: {
        //         // headerRenderer: 'comp',
        //         // dataRenderer: 'comp',
        //         // label: 'FFF',
        //       },
        //     },
        //     md: {
        //       options: {
        //         hideHeader: false,
        //       },
        //     },
        //     xs: {
        //       fields: ['name'],
        //       options: {
        //         hideHeader: true,
        //         second: {
        //           label: {
        //             i18nKey: 'prop.second',
        //           },
        //         },
        //       },
        //     },
        //   },
      },
    } as TableConfig),
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {}
