import { translationChunksConfig, translations } from '@spartacus/assets';
import { StorefrontConfig } from '@spartacus/storefront';
import { environment } from '../../environments/environment';

export const appConfig: StorefrontConfig = {
  backend: {
    occ: {
      baseUrl: environment.occBaseUrl,
      prefix: environment.occApiPrefix,
    },
  },
  context: {
    urlParameters: ['baseSite', 'language', 'currency'],
    baseSite: [
      'electronics-spa',
      'electronics',
      'apparel-de',
      'apparel-uk',
      'apparel-uk-spa',
    ],
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
    level: '2.0',
  },
  cart: {
    selectiveCart: {
      enabled: true,
    },
  },
};
