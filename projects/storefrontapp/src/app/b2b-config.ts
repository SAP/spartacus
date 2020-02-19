import { StorefrontConfig } from '@spartacus/storefront';
import { environment } from '../environments/environment';
import { translationChunksConfig, translations } from '@spartacus/assets';

export const b2bConfig: StorefrontConfig = {
  backend: {
    occ: {
      baseUrl: environment.occBaseUrl,
      legacy: false,
      endpoints: {
        addEntries: 'orgUsers/${userId}/carts/${cartId}/entries',
        user: 'orgUsers/${userId}',
      },
    },
  },
  context: {
    urlParameters: ['baseSite', 'language', 'currency'],
    baseSite: ['powertools-spa'],
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
    level: '1.5',
  },
};
