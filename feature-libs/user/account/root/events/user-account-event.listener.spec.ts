import { TestBed } from '@angular/core/testing';
import {
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LogoutEvent,
} from '@spartacus/core';
import { Subject } from 'rxjs';
import { UserAccountEventListener } from './user-account-event.listener';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.returnValue(mockEventStream$.asObservable());
  dispatch = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

describe(`UserAccountEventListener`, () => {
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserAccountEventListener,
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

    TestBed.inject(UserAccountEventListener);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  describe(`onAuth`, () => {
    it(`LogoutEvent should add a global message`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'authMessages.signedOutSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });
});
