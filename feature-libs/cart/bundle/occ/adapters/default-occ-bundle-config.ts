import { OccConfig } from '@spartacus/core';

export const defaultOccBundleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        bundleStart: 'users/${userId}/carts/${cartId}/bundles?fields=BASIC',
        bundleAllowedProductsSearch:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupId}/allowedProductsSearch?fields=products',
      },
    },
    loadingScopes: {
      product: {
        details: {
          include: ['bundleTemplates'],
        },
      },
    },
  },
};
