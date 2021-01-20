import { ConfigModule } from '@spartacus/core';
import {
  organizationTranslationChunksConfig,
  organizationTranslations,
} from '@spartacus/organization/administration/assets';
import { AdministrationRootModule } from '@spartacus/organization/administration/root';
import {
  orderApprovalTranslationChunksConfig,
  orderApprovalTranslations,
} from '@spartacus/organization/order-approval/assets';
import {
  bulkPricingTranslationChunksConfig,
  bulkPricingTranslations,
} from '@spartacus/product/bulk-pricing/assets';

import { OrderApprovalRootModule } from '@spartacus/organization/order-approval/root';
import { B2bStorefrontModule } from '@spartacus/setup';
import { FeatureEnvironment } from '../models/feature.model';

import { BulkPricingRootModule } from '@spartacus/product/bulk-pricing/root';

export const b2bFeature: FeatureEnvironment = {
  imports: [
    AdministrationRootModule,
    OrderApprovalRootModule,
    BulkPricingRootModule,

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
        organizationOrderApproval: {
          module: () =>
            import('@spartacus/organization/order-approval').then(
              (m) => m.OrderApprovalModule
            ),
        },
        productBulkPricing: {
          module: () =>
            import('@spartacus/product/bulk-pricing').then(
              (m) => m.BulkPricingModule
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
        resources: bulkPricingTranslations,
        chunks: bulkPricingTranslationChunksConfig,
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
