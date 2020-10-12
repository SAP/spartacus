import { Injectable } from '@angular/core';
import { Config } from '../../../config/config-tokens';
import { OccConfig } from '../../../occ/config/occ-config';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AuthConfig extends OccConfig {
  authentication?: {
    client_id?: string;
    client_secret?: string;
    baseUrl?: string;
    tokenEndpoint?: string;
    revokeEndpoint?: string;
    loginEndpoint?: string;
  };
}
