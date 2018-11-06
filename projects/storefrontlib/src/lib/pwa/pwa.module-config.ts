import { ServerConfig } from '@spartacus/core';

export abstract class PWAModuleConfig extends ServerConfig {
  pwa?: {
    addToHomeScreen?: boolean;
  };
}

export const defaultPWAModuleConfig: PWAModuleConfig = {
  pwa: {
    addToHomeScreen: false
  }
};
