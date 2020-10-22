// #9423
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import {
  orderApprovalTranslationChunksConfig,
  orderApprovalTranslations,
} from '@spartacus/organization/order-approval/assets';
import { OrganizationRootModule } from '@spartacus/organization/administration/root';
import { B2bStorefrontModule } from '@spartacus/setup';
import { FeatureEnvironment } from '../models/feature.model';
import { OrderApprovalModule } from '@spartacus/organization/order-approval';
import { ConfigModule } from '@spartacus/core';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    OrganizationRootModule,
    OrderApprovalModule,
    B2bStorefrontModule.withConfig({
      context: {
        urlParameters: ['baseSite', 'language', 'currency'],
        baseSite: ['powertools-spa'],
      },

      featureModules: {
        organization: {
          module: () =>
            import('@spartacus/organization/administration').then(
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
    ConfigModule.withConfig({
      i18n: {
        resources: orderApprovalTranslations,
        chunks: orderApprovalTranslationChunksConfig,
        fallbackLang: 'en',
      },
    }),
  ],
};
