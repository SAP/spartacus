import { InjectionToken } from '@angular/core';
import { AbstractTmsEventCollector } from './tms.event';

// TODO: replace `any` with an AbstractEventBuilder?
export const EVENT_BUILDER = new InjectionToken<
  AbstractTmsEventCollector | any
>('Event Builder');
