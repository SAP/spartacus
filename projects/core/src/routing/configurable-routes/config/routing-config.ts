import { RoutesConfig } from '../routes-config';

export abstract class RoutingConfig {
  routing?: {
    routes?: RoutesConfig;
    protected?: boolean;
  };
}
