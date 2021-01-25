import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';
import { OccConfig } from '../../occ/config/occ-config';

/**
 * @deprecated since 3.2, use asm lib instead
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class AsmConfig extends OccConfig {
  asm?: {
    agentSessionTimer?: {
      startingDelayInSeconds?: number;
    };
    customerSearch?: {
      maxResults?: number;
    };
  };
}
