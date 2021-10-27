import { Observable } from 'rxjs';
import { OrderEntry } from '@spartacus/core';

/**
 * An interface for context which determinate export products source
 */
export interface GetOrderEntriesContext {
  /**
   * Retrieve order entries from context source for export action.
   *
   * @returns {Observable<OrderEntry[]>}
   */
  getEntries(): Observable<OrderEntry[]>;
}
