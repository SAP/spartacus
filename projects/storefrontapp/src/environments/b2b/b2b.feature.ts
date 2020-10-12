import { B2bStorefrontModule } from '@spartacus/setup';
import { OrganizationModule } from '@spartacus/my-account/organization';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/my-account/organization/assets';
import { FeatureEnvironment } from '../models/feature.model';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/my-account/organization/assets';
import { OrganizationModule } from '@spartacus/my-account/organization';
import { B2bStorefrontModule } from '@spartacus/my-account';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    B2bStorefrontModule.withConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },

      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),

    OrganizationModule,
  ],
};
