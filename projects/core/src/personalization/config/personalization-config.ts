import { Injectable } from '@angular/core';
import { Config } from '../../config/config-tokens';

/**
 * @deprecated since 3.2, use @spartacus/tracking/personalization instead
 */
@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class PersonalizationConfig {
  personalization?: {
    enabled?: boolean;
    httpHeaderName?: {
      id: string;
      timestamp: string;
    };
    context?: {
      slotPosition: string;
      componentId: string;
    };
  };
}
