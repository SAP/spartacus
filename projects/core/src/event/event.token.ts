import { InjectionToken } from '@angular/core';
import { TmsEventCollector } from './tms.event';

// TODO: replace `any` with an AbstractEventBuilder?
export const EVENT_BUILDER = new InjectionToken<TmsEventCollector | any>(
  'Event Builder'
);
