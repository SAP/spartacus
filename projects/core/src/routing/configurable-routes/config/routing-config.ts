import { RoutesConfig } from '../routes-config';
import { ServerConfig } from '../../../config/server-config/server-config';

export abstract class RoutingConfig extends ServerConfig {
  routing?: {
    routes: RoutesConfig;
  };
}
