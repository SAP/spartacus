import { OccConfig } from '@spartacus/core';
import { BundleProductScope } from '../../core/model/bundle-product-scope.model';

export const defaultOccBundleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        bundleStart: 'users/${userId}/carts/${cartId}/bundles?fields=FULL',
        bundleAllowedProductsSearch:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupNumber}/allowedProductsSearch?fields=products(FULL)',
        product: {
          bundleTemplates:
            'products/${productCode}?fields=code,bundleTemplates',
        },
      },
    },
    loadingScopes: {
      product: {
        details: {
          include: [BundleProductScope.TEMPLATES],
        },
      },
    },
  },
};
