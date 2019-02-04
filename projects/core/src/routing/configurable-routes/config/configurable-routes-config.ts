import { RoutesConfig } from '../routes-config';

export abstract class ConfigurableRoutesConfig {
  routes?: {
    config?: RoutesConfig;
    fetch?: boolean;
  };
}
