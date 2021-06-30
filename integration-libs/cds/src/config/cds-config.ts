import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';
import { CdsEndpoints } from '../cds-models/cds-endpoints.model';
import { MerchandisingConfig } from './merchandising.config';
import { ProfileTagConfig } from './profile-tag.config';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
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

declare module '@spartacus/core' {
  interface Config extends CdsConfig {}
}
