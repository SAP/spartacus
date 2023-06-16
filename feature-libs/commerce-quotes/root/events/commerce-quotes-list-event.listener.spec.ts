import { TestBed } from '@angular/core/testing';
import {
  createFrom,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
} from '@spartacus/core';
import { Subject, Subscription } from 'rxjs';
import { CommerceQuotesListEventListener } from './commerce-quotes-list-event.listener';
import { CommerceQuotesListReloadQueryEvent } from './commerce-quotes-list.events';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe('CommerceQuotesListEventListener', () => {
  let globalMessageService: GlobalMessageService;
  let commerceQuotesListEventListener: CommerceQuotesListEventListener;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommerceQuotesListEventListener,
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

    commerceQuotesListEventListener = TestBed.inject(
      CommerceQuotesListEventListener
    );
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should call onQuoteListReload and add new global message', () => {
    //given
    mockEventStream$.next(createFrom(CommerceQuotesListReloadQueryEvent, {}));

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
    commerceQuotesListEventListener.ngOnDestroy();

    //then
    expect(spyUnsubscribe).toHaveBeenCalled();
  });
});
