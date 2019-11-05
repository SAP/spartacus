import { ProfileTagConfig } from './profiletag/config/profiletag-config';

export abstract class CdsConfig {
  cds?: {
    tenant: string;
    baseUrl: string;
    profileTag: ProfileTagConfig;
  };
}
