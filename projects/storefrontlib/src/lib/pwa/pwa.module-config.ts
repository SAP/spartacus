import { ServerConfig } from '../config/server-config/server-config';

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
