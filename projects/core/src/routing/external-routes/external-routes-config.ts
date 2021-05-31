import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { RoutingConfig } from '../configurable-routes';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ExternalRoutesConfig {
  routing?: {
    internal?: string[];
  };
}

declare module '../../config/config-tokens' {
  interface Config {
    routing?: {
      internal?: string[];
    } & RoutingConfig['routing'];
  }
}
