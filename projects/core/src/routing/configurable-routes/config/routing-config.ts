import { RoutesConfig } from '../routes-config';

export abstract class RoutingConfig {
  routing?: {
    /**
     * Configuration of semantic routes. Key is route's name. Value is the config specific to this route.
     */
    routes?: RoutesConfig;

    /**
     * When true, it closes the storefront for unauthorized users, except from routes that have individual config flag `protected: false`
     */
    protected?: boolean;
  };
}
