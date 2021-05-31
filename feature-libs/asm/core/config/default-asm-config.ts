import { Config } from '@spartacus/core';

export const defaultAsmConfig: Config = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 600,
    },
    customerSearch: {
      maxResults: 20,
    },
  },
};
