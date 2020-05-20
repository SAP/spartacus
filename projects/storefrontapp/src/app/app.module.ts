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
  B2cStorefrontModule,
  JsonLdBuilderModule,
  StorefrontComponent,
} from '@spartacus/storefront';
import { cdsFeature } from '../environments/cds/cds.environment';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { appConfig } from './configs/app-config';
registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const additionalImports = [];
if (cdsFeature.enabled) {
  additionalImports.push(cdsFeature.feature);
}

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,

    B2cStorefrontModule.withConfig(appConfig),
    JsonLdBuilderModule,

    ...additionalImports,

    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {}
