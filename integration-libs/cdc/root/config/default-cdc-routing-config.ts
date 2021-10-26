import { RoutesConfig, RoutingConfig } from '@spartacus/core';

export const defaultCdcRoutesConfig: RoutesConfig = {
  // semantic links for login related pages
  login: {
    paths: ['cdc/login'],
    protected: false,
    authFlow: true,
  },
  register: {
    paths: ['cdc/login/register'],
    protected: false,
    authFlow: true,
  },
};

export const defaultCdcRoutingConfig: RoutingConfig = {
  routing: {
    routes: defaultCdcRoutesConfig,
  },
};
