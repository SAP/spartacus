import { Injectable } from '@angular/core';
import { Config } from '../../../config/config-tokens';
import { RoutesConfig } from '../routes-config';

export const enum RouteLoadStrategy {
  /**
   * Don't reload the data on navigation if it was loaded before
   */
  ONCE = 'once',
  /**
   * Always reload the data on navigation
   */
  ALWAYS = 'always',
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class RoutingConfig {
  routing?: RoutingConfigDefinition;
}

export interface RoutingConfigDefinition {
  /**
   * Configuration of semantic routes. Key is route's name. Value is the config specific to this route.
   */
  routes?: RoutesConfig;

  /**
   * When true, it closes the storefront for unauthorized users, except from routes that have individual config flag `protected: false`
   */
  protected?: boolean;

  /**
   * Global load strategy which is used as a fallback for loading data on each navigation
   */
  loadStrategy?: RouteLoadStrategy;
}

declare module '../../../config/config-tokens' {
  interface Config extends RoutingConfig {}
}
