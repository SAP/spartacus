import { GlobalMessageConfig } from './global-message-config';

export const defaultGlobalMessageConfig: GlobalMessageConfig = {
  globalMessages: {
    '[GlobalMessage] Confirmation': {
      timeout: 3000,
    },
    '[GlobalMessage] Information': {
      timeout: 10000,
    },
  },
};
