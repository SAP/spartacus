import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import { QuoteListEventListener } from './quote-list-event.listener';
import { QuoteListReloadQueryEvent } from './quote-list.events';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('QuoteListEventListener', () => {
  let globalMessageService: GlobalMessageService;
  let quoteListEventListener: QuoteListEventListener;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuoteListEventListener,
        {
          provide: EventService,
          useClass: MockEventService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });

    quoteListEventListener = TestBed.inject(QuoteListEventListener);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should call onQuoteListReload and add new global message', () => {
    //given
    mockEventStream$.next(createFrom(QuoteListReloadQueryEvent, {}));

    //then
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'sorting.pageViewUpdated' },
      GlobalMessageType.MSG_TYPE_ASSISTIVE,
      500
    );
  });

  it('onDestroy should clear subscriptions', () => {
    const spyUnsubscribe = spyOn(Subscription.prototype, 'unsubscribe');
    //given
    quoteListEventListener.ngOnDestroy();

    //then
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
