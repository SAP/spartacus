import { RoutingConfig } from '@spartacus/core';

export const defaulTextfieldRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureTEXTFIELD: {
        paths: ['configure/textfield/:ownerType/entityKey/:entityKey'],
      },
    },
  },
};
