import { OccConfig } from '../../occ/config/occ-config';
import { Injectable } from '@angular/core';
import { Config } from '../../config/config-injectors';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class KymaConfig extends OccConfig {
  authentication?: {
    kyma_client_id?: string;
    kyma_client_secret?: string;
  };
}
