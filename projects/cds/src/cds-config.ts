import { CdsEndpoints } from './cds-models/cds-endpoints.model';
import { ProfileTagConfig } from './profiletag/config/profiletag-config';

export abstract class CdsConfig {
  cds?: {
    tenant: string;
    baseUrl: string;
    endpoints: CdsEndpoints;
    profileTag: ProfileTagConfig;
  };
}
