import { RoutingConfig } from '@spartacus/core';

export const defaultPunchoutRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      punchoutError: {
        paths: ['punchout/cxml/error'],
        protected: false,
        authFlow: true,
      },
    },
  },
};
