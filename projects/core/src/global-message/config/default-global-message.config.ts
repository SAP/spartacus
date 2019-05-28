import { DefaultGlobalMessageConfig } from './global.message.config';

export const defaultGlobalMessageConfig: DefaultGlobalMessageConfig = {
  confirmation: {
    hideOnRouteChange: true,
    timeout: 2000,
  },
  information: {
    hideOnRouteChange: true,
    timeout: 10000,
  },
  error: {
    hideOnRouteChange: false,
  },
};
