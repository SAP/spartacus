import { Injectable } from '@angular/core';
import { OccConfig } from '../../../occ/config/occ-config';
import { Config } from '../../config/config-tokens';

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
