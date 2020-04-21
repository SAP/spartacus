import { CdsEndpoints } from '../cds-models/cds-endpoints.model';
import { MerchandisingConfig } from './merchandising.config';
import { ProfileTagConfig } from './profile-tag.config';

export abstract class CdsConfig {
  cds?: {
    tenant?: string;
    baseUrl?: string;
    consentTemplateId?: string;
    endpoints?: CdsEndpoints;
    merchandising?: MerchandisingConfig;
    profileTag?: ProfileTagConfig;
  };
}
