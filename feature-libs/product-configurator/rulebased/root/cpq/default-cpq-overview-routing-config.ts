import { RoutingConfig } from '@spartacus/core';

export const defaultCpqOverviewRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureOverviewCLOUDCPQCONFIGURATOR: {
        paths: [
          'configure-overview/cpq/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
          'configure-overview/cpq/:ownerType/entityKey/:entityKey',
        ],
      },
    },
  },
};
