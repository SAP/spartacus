import { YotpoConfig } from './yotpo/yotpoconfig/yotpo-config';

export interface VendorConfig {
  vendor?: {
    yotpo?: YotpoConfig;
  };
}
