import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export class TmsEvent {
  static type = 'TmsEvent';
  event: string;
  payload: any;
}

export interface TmsCollector {
  get(): Observable<any>[];
}

export const TMS_COLLECTORS = new InjectionToken<TmsCollector>(
  'TMS Collectors'
);
