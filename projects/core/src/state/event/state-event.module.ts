import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  EventSourceMapping,
  provideEventSources,
} from '../../event/event-source-mapping';
import { ActionToEvent, ACTION_TO_EVENT } from './action-to-event';
import { StateEventService } from './state-event.service';

// private
/**
 * Creates the event sources based on mappings from actions to events.
 */
export function eventSourcesFactory(
  stateEventService: StateEventService,
  mappingChunks: ActionToEvent<any>[][]
): EventSourceMapping<any>[] {
  const result: EventSourceMapping<any>[] = [];
  mappingChunks.forEach(mappingChunk =>
    mappingChunk.forEach(mapping => {
      result.push({
        type: mapping.event,
        source$: stateEventService.getFromAction(mapping),
      });
    })
  );
  return result;
}

@NgModule()
export class StateEventModule {
  static forRoot(): ModuleWithProviders<StateEventModule> {
    return {
      ngModule: StateEventModule,
      providers: [
        provideEventSources(eventSourcesFactory, [
          StateEventService,
          ACTION_TO_EVENT,
        ]),
      ],
    };
  }

  static forChild(
    mappings: ActionToEvent<any>[]
  ): ModuleWithProviders<StateEventModule> {
    return {
      ngModule: StateEventModule,
      providers: [
        {
          provide: ACTION_TO_EVENT,
          multi: true,
          useValue: mappings,
        },
      ],
    };
  }
}
