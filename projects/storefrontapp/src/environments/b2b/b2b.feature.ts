import { B2bStorefrontModule } from '@spartacus/setup';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/my-account/organization/assets';
import { FeatureEnvironment } from '../models/feature.model';
import { OrganizationRootModule } from '@spartacus/my-account/organization/root';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    OrganizationRootModule,
    B2bStorefrontModule.withConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },

      featureModules: {
        organization: {
          module: () =>
            import('@spartacus/my-account/organization').then(
              (m) => m.OrganizationModule
            ),
        },
      },

      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
};
