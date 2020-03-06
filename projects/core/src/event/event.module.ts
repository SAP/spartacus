import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  EventSourceMapping,
  provideEventSources,
} from './event-source-mapping';
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

  static forChild<T>(
    factory: (..._args: any[]) => EventSourceMapping<T>[],
    deps?: any[]
  ): ModuleWithProviders<EventModule> {
    return {
      ngModule: EventModule,
      providers: [provideEventSources(factory, deps)],
    };
  }
}
