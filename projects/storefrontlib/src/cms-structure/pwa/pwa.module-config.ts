export abstract class PWAModuleConfig {
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
