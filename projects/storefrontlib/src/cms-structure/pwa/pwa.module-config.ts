import { BaseConfig } from '@spartacus/core';

export abstract class PWAModuleConfig extends BaseConfig {
  pwa?: {
    enabled?: boolean;
    addToHomeScreen?: boolean;
  };
}

export const defaultPWAModuleConfig: PWAModuleConfig = {
  pwa: {
    enabled: false,
    addToHomeScreen: false,
  },
};
