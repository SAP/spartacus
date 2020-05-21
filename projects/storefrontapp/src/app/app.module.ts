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
import { TestConfigModule } from '@spartacus/core';
import {
  JsonLdBuilderModule,
  StorefrontComponent,
} from '@spartacus/storefront';
import { b2bFeature } from '../environments/b2c/b2b.environment';
import { b2cFeature } from '../environments/b2c/b2c.environment';
import { cdsFeature } from '../environments/cds/cds.environment';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';

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

    ...(environment.b2b ? b2bFeature.imports : b2cFeature.imports),
    JsonLdBuilderModule,

    ...cdsFeature.imports,

    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {}
