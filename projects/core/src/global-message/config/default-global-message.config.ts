import { GlobalMessageConfigs } from './globalMessageConfigs';

export const defaultGlobalMessageConfig: GlobalMessageConfigs = {
  confirmation: {
    hideOnRouteChange: true,
    // timeout: 3000,
  },
  information: {
    hideOnRouteChange: true,
    timeout: 10000,
  },
};
