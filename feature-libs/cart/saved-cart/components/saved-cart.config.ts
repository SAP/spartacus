import { RoutingConfig } from '@spartacus/core';

export const savedCartRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      savedCarts: {
        paths: ['/my-account/saved-carts'],
      },
      savedCartDetailsPage: {
        paths: ['/my-account/saved-cart/:savedCartCode'],
        paramsMapping: { savedCartCode: 'code' },
      },
    },
  },
};
