import { Inject, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { EVENT_BUILDER } from './event.token';

@NgModule({})
export class EventsModule {
  constructor(@Optional() @Inject(EVENT_BUILDER) _builders?: any[]) {
    console.log('registered events: ', ..._builders);
  }

  static forRoot(): ModuleWithProviders<EventsModule> {
    return {
      ngModule: EventsModule,
    };
  }
}
