import { ServerConfig } from '@spartacus/core';

export abstract class PWAModuleConfig extends ServerConfig {
  pwa?: {
    enabled?: boolean;
    addToHomeScreen?: boolean;
  };
}

export const defaultPWAModuleConfig: PWAModuleConfig = {
  pwa: {
    enabled: false,
    addToHomeScreen: false
  }
};
