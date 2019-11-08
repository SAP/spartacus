import { ProfileTagConfig } from './profile-tag.config';

export abstract class CdsConfig {
  cds: {
    tenant: string;
    profileTag: ProfileTagConfig;
  };
}
