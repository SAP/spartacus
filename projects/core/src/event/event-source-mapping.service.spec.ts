import { inject, TestBed } from '@angular/core/testing';
import {
  EventSourceMapping,
  EVENT_SOURCE_MAPPINGS,
} from './event-source-mapping';
import { EventSourceMappingService } from './event-source-mapping.service';
import { EventService } from './event.service';

class EventA {
  a: number;
}
class EventB {
  b: number;
}
class EventC {
  c: number;
}
class MockEventService implements Partial<EventService> {
  register = jasmine.createSpy('register');
}

describe('EventSourceMappingService', () => {
  let mappings1: EventSourceMapping<any>[];
  let mappings2: EventSourceMapping<any>[];

  beforeEach(() => {
    mappings1 = [
      { type: EventA, source$: 'sourceA' as any },
      { type: EventB, source$: 'sourceB' as any },
    ];
    mappings2 = [{ type: EventC, source$: 'sourceC' as any }];

    TestBed.configureTestingModule({
      providers: [
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: EVENT_SOURCE_MAPPINGS,
          useValue: mappings1,
          multi: true,
        },
        {
          provide: EVENT_SOURCE_MAPPINGS,
          useValue: mappings2,
          multi: true,
        },
      ],
    });
  });

  it('should call EventService.register for each event source in provided mappings', inject(
    // inject `EventSourceMappingService` just to call its constructor
    [EventService, EventSourceMappingService],
    eventService => {
      expect(eventService.register).toHaveBeenCalledTimes(3);
      expect(eventService.register).toHaveBeenCalledWith(
        mappings1[0].type,
        mappings1[0].source$
      );
      expect(eventService.register).toHaveBeenCalledWith(
        mappings1[1].type,
        mappings1[1].source$
      );
      expect(eventService.register).toHaveBeenCalledWith(
        mappings2[0].type,
        mappings2[0].source$
      );
    }
  ));
});
