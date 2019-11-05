import { ProfileTagConfig } from './profiletag/config/profiletag-config';

//export type CdsConfig = CommonsConfig | ProfileTagConfig;

export abstract class CdsConfig {
  cds?: {
    tenant: string;
    baseUrl: string;
    profileTag: ProfileTagConfig;
  };
}
