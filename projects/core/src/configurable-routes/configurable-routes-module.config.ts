import { RoutesConfig, defaultRoutesConfig } from './routes-config';

export abstract class ConfigurableRoutesModuleConfig {
  routesConfig?: RoutesConfig;
}

export const defaultConfigurableRoutesModuleConfig = {
  routesConfig: defaultRoutesConfig
};
