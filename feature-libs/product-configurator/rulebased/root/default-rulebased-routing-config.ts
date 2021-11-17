import { RoutingConfig } from '@spartacus/core';

export const defaultRulebasedRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureCPQCONFIGURATOR: {
        paths: ['configure/vc/:ownerType/entityKey/:entityKey'],
      },
      configureOverviewCPQCONFIGURATOR: {
        paths: [
          'configure-overview/vc/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
          'configure-overview/vc/:ownerType/entityKey/:entityKey',
        ],
      },
    },
  },
};
