import { CpqConfiguratorAuthConfig } from './cpq-configurator-auth.config';

export const defaultCpqConfiguratorAuthConfig: CpqConfiguratorAuthConfig = {
  cpqConfigurator: {
    tokenExpirationBuffer: 10000,
    tokenMaxValidity: 24 * 60 * 60 * 1000,
    tokenMinValidity: 5000, // five seconds
  },
};
