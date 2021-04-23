import { RoutingConfig } from '@spartacus/core';

export const defaultCpqInteractiveRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureCLOUDCPQCONFIGURATOR: {
        paths: ['configure/cpq/:ownerType/entityKey/:entityKey'],
      },
    },
  },
};
