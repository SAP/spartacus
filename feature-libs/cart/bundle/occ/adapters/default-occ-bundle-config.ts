import { OccConfig } from '@spartacus/core';
import { BundleProductScope } from '../../core/model/bundle-product-scope.model';

export const defaultOccBundleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        bundleStart: 'users/${userId}/carts/${cartId}/bundles?fields=BASIC',
        bundleAllowedProductsSearch:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupId}/allowedProductsSearch?fields=products',
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
