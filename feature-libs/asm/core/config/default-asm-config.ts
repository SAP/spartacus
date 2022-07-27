import { AsmConfig } from './asm-config';

export const defaultAsmConfig: AsmConfig = {
  asm: {
    agentSessionTimer: {
      startingDelayInSeconds: 600,
    },
    customerSearch: {
      maxResults: 20,
    },
    userIdInterceptor: {
      patterns: ['**/products/search*', '**/costcenters*'],
    },
  },
};
