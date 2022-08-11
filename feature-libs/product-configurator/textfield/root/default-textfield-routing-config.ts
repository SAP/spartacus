import { RoutingConfig } from '@spartacus/core';

export const defaultTextfieldRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureTEXTFIELD: {
        paths: ['configure/textfield/:ownerType/entityKey/:entityKey'],
      },
      configureOverviewTEXTFIELD: {
        paths: [
          'configure-overview/textfield/:ownerType/entityKey/:entityKey/displayOnly/:displayOnly',
          'configure-overview/textfield/:ownerType/entityKey/:entityKey',
        ],
      },
    },
  },
};
