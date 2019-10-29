import { InjectionToken } from '@angular/core';

export const CONFIG_INITIALIZER = new InjectionToken('ConfigInitializer');

export interface ConfigInitializer {
  scopes: string[];
  configFactory: () => Promise<any>;
}
