import { BaseConfig } from '../../../config/index';
import { RoutesConfig } from '../routes-config';

export abstract class RoutingConfig extends BaseConfig {
  routing?: {
    routes: RoutesConfig;
  };
}
