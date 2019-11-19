import { InjectionToken } from '@angular/core';
import { CdsEndpoints } from '../cds-models/cds-endpoints.model';
import { ProfileTagConfig } from './profile-tag.config';

export abstract class CdsConfig {
  cds: {
    tenant: string;
    baseUrl: string;
    endpoints: CdsEndpoints;
    profileTag?: ProfileTagConfig;
  };
}

export const cdsConfigToken = new InjectionToken<CdsConfig>('cds-config');
