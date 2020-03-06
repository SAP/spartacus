import { ModuleWithProviders, NgModule } from '@angular/core';
import { EventSourceMappingService } from './event-source-mapping.service';

@NgModule()
export class EventModule {
  // register all provided event sources when resolving dependencies (not in APP_INITIALIZER - it could be too late)
  constructor(_service: EventSourceMappingService) {}

  static forRoot(): ModuleWithProviders<EventModule> {
    return {
      ngModule: EventModule,
    };
  }
}
