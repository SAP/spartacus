import { translationChunksConfig, translations } from '@spartacus/assets';
import { B2bStorefrontModule } from '@spartacus/storefront';
import { environment } from '../environment';
import { FeatureEnvironment } from '../models/feature.model';
import { translationChunksConfig, translations } from '@spartacus/assets';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/my-account/organization/assets';
import { OrganizationModule } from '@spartacus/my-account/organization';
import { B2bStorefrontModule } from '@spartacus/my-account';
import { environment } from '../environment';
import { FeatureEnvironment } from '../models/feature.model';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    B2bStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: environment.occBaseUrl,
          prefix: environment.occApiPrefix,
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
      i18n: { {
      resources: {
        en: { ...translations.en, ...organizationTranslations.en },
      },
      chunks: {
        ...translationChunksConfig,
        ...organizationTranslationChunksConfig,
      },

      resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },

      features: {
        level: '2.1',
      },
    }),

    OrganizationModule,
  ],
};
