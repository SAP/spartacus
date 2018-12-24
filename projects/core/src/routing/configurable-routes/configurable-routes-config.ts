import { RoutesConfig, defaultRoutesConfig } from './routes-config';

export abstract class ConfigurableRoutesConfig {
  routesConfig?: RoutesConfig;
}

export const defaultConfigurableRoutesConfig: ConfigurableRoutesConfig = {
  routesConfig: defaultRoutesConfig
};
