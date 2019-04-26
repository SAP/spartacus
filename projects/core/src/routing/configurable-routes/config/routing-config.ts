import { ServerConfig } from 'projects/core/src/config';
import { RoutesConfig } from '../routes-config';

export abstract class RoutingConfig extends ServerConfig {
  routing?: {
    routes: RoutesConfig;
  };
}
