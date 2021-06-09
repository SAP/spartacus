import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeJa from '@angular/common/locales/ja';
import localeZh from '@angular/common/locales/zh';
import { NgModule } from '@angular/core';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  ConfigModule,
  FeatureModuleConfig,
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  provideConfig,
  RoutingConfig,
  TestConfigModule,
} from '@spartacus/core';
import { configuratorTranslations } from '@spartacus/product-configurator/common/assets';
import {
  PRODUCT_CONFIGURATOR_RULEBASED_FEATURE,
  RulebasedConfiguratorRootModule,
} from '@spartacus/product-configurator/rulebased/root';
import {
  PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE,
  TextfieldConfiguratorRootModule,
} from '@spartacus/product-configurator/textfield/root';
import { StorefrontComponent } from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { TestOutletModule } from '../test-outlets/test-outlet.module';
import { AppRoutingModule } from './app-routing.module';
import { SpartacusModule } from './spartacus/spartacus.module';

registerLocaleData(localeDe);
registerLocaleData(localeJa);
registerLocaleData(localeZh);

const devImports = [];
if (!environment.production) {
  devImports.push(StoreDevtoolsModule.instrument());
}

// PRODUCT CONFIGURATOR
// TODO(#10883): Move product configurator to a separate feature module
const ruleBasedVcFeatureConfiguration: {
  [featureName: string]: FeatureModuleConfig | string;
} = {
  [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
    module: () =>
      import('@spartacus/product-configurator/rulebased').then(
        (m) => m.RulebasedConfiguratorModule
      ),
  },
};
const ruleBasedCpqFeatureConfiguration: {
  [featureName: string]: FeatureModuleConfig | string;
} = {
  [PRODUCT_CONFIGURATOR_RULEBASED_FEATURE]: {
    module: () =>
      import('@spartacus/product-configurator/rulebased/cpq').then(
        (m) => m.RulebasedCpqConfiguratorModule
      ),
  },
};
const ruleBasedFeatureConfiguration = environment.cpq
  ? ruleBasedCpqFeatureConfiguration
  : ruleBasedVcFeatureConfiguration;
// PRODUCT CONFIGURATOR END

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'spartacus-app' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SpartacusModule,

    // PRODUCT CONFIGURATOR
    // TODO(#10883): Move product configurator to a separate feature module
    ConfigModule.withConfig({
      i18n: {
        resources: configuratorTranslations,
      },
      featureModules: {
        ...ruleBasedFeatureConfiguration,
        [PRODUCT_CONFIGURATOR_TEXTFIELD_FEATURE]: {
          module: () =>
            import('@spartacus/product-configurator/textfield').then(
              (m) => m.TextfieldConfiguratorModule
            ),
        },
      },
    }),
    RulebasedConfiguratorRootModule,
    TextfieldConfiguratorRootModule,
    // PRODUCT CONFIGURATOR END

    TestOutletModule, // custom usages of cxOutletRef only for e2e testing
    TestConfigModule.forRoot({ cookie: 'cxConfigE2E' }), // Injects config dynamically from e2e tests. Should be imported after other config modules.

    ...devImports,
  ],
  providers: [
    provideConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
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
      features: {
        level: '3.3',
      },
    }),
  ],
  bootstrap: [StorefrontComponent],
})
export class AppModule {}
