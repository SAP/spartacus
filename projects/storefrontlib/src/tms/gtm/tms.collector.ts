import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Tag Management System Data Collector interface.
 */
export interface TmsDataCollector {
  /**
   * Collects the tag data.
   */
  collect(): Observable<any>;
}

export const TMS_COLLECTORS = new InjectionToken<TmsDataCollector>(
  'tms collector'
);
