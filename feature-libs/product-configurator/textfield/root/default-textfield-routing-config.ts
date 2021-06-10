import { RoutingConfig } from '@spartacus/core';

export const defaultTextfieldRoutingConfig: RoutingConfig = {
  routing: {
    routes: {
      configureTEXTFIELD: {
        paths: ['configure/textfield/:ownerType/entityKey/:entityKey'],
      },
    },
  },
};
