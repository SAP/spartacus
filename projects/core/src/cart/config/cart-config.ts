import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

/**
 * @deprecated since 4.1 - use cart lib instead
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class CartConfig {
  cart?: {
    selectiveCart?: {
      enabled?: boolean;
    };
  };
}

declare module '../../config/config-tokens' {
  interface Config extends CartConfig {}
}
