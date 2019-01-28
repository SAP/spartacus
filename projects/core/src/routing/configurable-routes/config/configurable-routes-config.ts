import { RoutesConfig } from '../routes-config';

export abstract class ConfigurableRoutesConfig {
  routesConfig?: RoutesConfig;
  fetchRoutesConfig?: Boolean;
}
