import { OccConfig } from '../../../../occ/config/occ-config';

export const defaultOccBundleConfig: OccConfig = {
  backend: {
    occ: {
      endpoints: {
        bundleStart: 'users/${userId}/carts/${cartId}/bundles?fields=DEFAULT',
        bundleAllowedProductsSearch:
          'users/${userId}/carts/${cartId}/entrygroups/${entryGroupId}/allowedProductsSearch',
      },
    },
  },
};
