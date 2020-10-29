import { ConfigModule } from '@spartacus/core';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import { AdministrationRootModule } from '@spartacus/organization/administration/root';
import { OrderApprovalModule } from '@spartacus/organization/order-approval';
import {
  orderApprovalTranslationChunksConfig,
  orderApprovalTranslations,
} from '@spartacus/organization/order-approval/assets';
import { B2bStorefrontModule } from '@spartacus/setup';
import { FeatureEnvironment } from '../models/feature.model';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    OrderApprovalModule,
    AdministrationRootModule,

    B2bStorefrontModule.withConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },

      featureModules: {
        organizationAdministration: {
          module: () =>
            import('@spartacus/organization/administration').then(
              (m) => m.AdministrationModule
            ),
        },
      },

      i18n: {
        resources: organizationTranslations,
        chunks: organizationTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
    ConfigModule.withConfig({
      i18n: {
        resources: orderApprovalTranslations,
        chunks: orderApprovalTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
};
