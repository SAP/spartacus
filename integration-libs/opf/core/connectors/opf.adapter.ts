import { ActiveConfiguration } from '@spartacus/opf/root';
import { Observable } from 'rxjs';

export abstract class OpfAdapter {
  /**
   * Abstract method used to get checkout payment
   * active configurations
   */

  abstract getActiveConfigurations(): Observable<ActiveConfiguration[]>;
}
