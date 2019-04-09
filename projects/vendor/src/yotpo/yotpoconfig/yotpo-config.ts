import { BaseVendorConfig } from '../../vendor-config';

export abstract class YotpoConfig extends BaseVendorConfig {
  vendor?: {
    yotpo?: {
      appToken?: string;
    };
  };
}
