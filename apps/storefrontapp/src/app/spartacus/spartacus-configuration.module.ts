import { NgModule } from '@angular/core';
import { translationChunksConfig, translationsEn } from '@spartacus/assets';
import {
  FeaturesConfig,
  I18nConfig,
  OccConfig,
  provideConfig,
  provideConfigFactory,
  provideDefaultConfig,
  SiteContextConfig,
} from '@spartacus/core';
import {
  defaultCmsContentProviders,
  layoutConfigFactory,
  mediaConfig,
} from '@spartacus/storefront';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    provideConfigFactory(layoutConfigFactory),
    provideConfig(mediaConfig),
    ...defaultCmsContentProviders,
    // provideDefaultConfig so the occ-backend-base-url meta tag takes precedence
    // in CCv2 deployments (meta tag is ConfigChunk, default is DefaultConfigChunk).
    // In local dev the meta tag contains the unsubstituted placeholder so this
    // fallback value is used instead.
    provideDefaultConfig(<OccConfig>{
      backend: {
        occ: {
          baseUrl: 'https://api.cc3ihxtp03-mcpacppoc1-p3-public.model-t.myhybris.cloud',
        },
      },
    }),
    provideConfig(<SiteContextConfig>{
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['electronics-spa','apparel-uk-spa'],
        currency: ['USD', 'GBP',]
      },
    }),
    provideConfig(<I18nConfig>{
      i18n: {
        resources: { en: translationsEn },
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    provideConfig(<FeaturesConfig>{
      features: {
        level: '221121.9',
      },
    }),
  ],
})
export class SpartacusConfigurationModule {}
