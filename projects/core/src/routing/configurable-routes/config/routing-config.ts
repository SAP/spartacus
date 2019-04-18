import { RoutesConfig } from '../routes-config';
import { ServerConfig } from 'projects/core/src/config';

export abstract class RoutingConfig extends ServerConfig {
  routing?: RoutesConfig;
}
