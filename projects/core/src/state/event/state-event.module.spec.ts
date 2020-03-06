import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { EVENT_SOURCE_MAPPINGS } from '../../event/event-source-mapping';
import { StateEventModule } from './state-event.module';
import { StateEventService } from './state-event.service';

describe('StateEventModule', () => {
  class EventA {}
  class EventB {}
  class EventC {}

  let mockSources: Observable<any>[];
  let mockStateEventService: Partial<StateEventService>;

  beforeEach(() => {
    mockSources = ['sourceA', 'sourceB', 'sourceC'] as any;
    mockStateEventService = {
      getFromAction: jasmine
        .createSpy('getFromAction')
        .and.returnValues(...mockSources),
    };
    const mappings1 = [
      { action: 'A', event: EventA },
      { action: 'B', event: EventB },
    ];
    const mappings2 = [{ action: 'C', event: EventC }];

    TestBed.configureTestingModule({
      imports: [
        StateEventModule.forRoot(),
        StateEventModule.forChild(mappings1),
        StateEventModule.forChild(mappings2),
      ],
      providers: [
        { provide: StateEventService, useValue: mockStateEventService },
      ],
    });
  });

  it('should provide event source mappings created out from action-to-event mappings', inject(
    [EVENT_SOURCE_MAPPINGS],
    eventSourceMappings => {
      expect(eventSourceMappings[0]).toEqual([
        { type: EventA, source$: mockSources[0] },
        { type: EventB, source$: mockSources[1] },
        { type: EventC, source$: mockSources[2] },
      ]);
    }
  ));
});
