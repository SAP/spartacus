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
  B2cStorefrontModule,
  B2bStorefrontModule,
  JsonLdBuilderModule,
  StorefrontComponent,
} from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';

import { b2cConfig } from './b2c-config';
import { b2bConfig } from './b2b-config';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];

if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

const channelImports = [];
if (environment.channel === 'b2b') {
  channelImports.push(B2bStorefrontModule.withConfig(b2bConfig));
} else {
  channelImports.push(B2cStorefrontModule.withConfig(b2cConfig));
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,

    JsonLdBuilderModule,

    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...channelImports,
    ...devImports,
    ConfigModule,
  ],

  bootstrap: [StorefrontComponent],
})
export class AppModule {}
