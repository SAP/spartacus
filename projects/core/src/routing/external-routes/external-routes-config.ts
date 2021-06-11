import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

interface ExternalRoutesSubConfig {
  internal?: string[];
}

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class ExternalRoutesConfig {
  routing?: ExternalRoutesSubConfig;
}

declare module '../configurable-routes/config/routing-config' {
  interface RoutingSubConfig extends ExternalRoutesSubConfig {}
}
