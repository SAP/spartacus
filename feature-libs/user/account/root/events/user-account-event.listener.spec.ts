import { TestBed } from '@angular/core/testing';
import {
  AuthService,
  CurrencyService,
  CurrencySetEvent,
  CxEvent,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  LoginEvent,
  LogoutEvent,
  WindowRef,
} from '@spartacus/core';
import { User, UserAccountFacade } from '@spartacus/user/account/root';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { filter, of, Subject } from 'rxjs';
import { UserAccountEventListener } from './user-account-event.listener';
import createSpy = jasmine.createSpy;

const mockEventStream$ = new Subject<CxEvent>();

class MockEventService implements Partial<EventService> {
  get = createSpy().and.callFake((eventType: new () => CxEvent) =>
    mockEventStream$
      .asObservable()
      .pipe(filter((event) => event instanceof eventType))
  );
  dispatch = createSpy();
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockUserAccountFacade implements Partial<UserAccountFacade> {
  get = createSpy().and.returnValue(
    of({ currency: { isocode: 'USD' } } as User)
  );
}

class MockCurrencyService implements Partial<CurrencyService> {
  setActive = createSpy();
}

class MockAuthService implements Partial<AuthService> {
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  update = createSpy().and.returnValue(of(undefined));
}

class MockWindowRef implements Partial<WindowRef> {
  localStorage = {
    getItem: createSpy('getItem').and.returnValue('"EUR"'),
    setItem: createSpy('setItem'),
    removeItem: createSpy('removeItem'),
  } as unknown as Storage;
}

describe(`UserAccountEventListener`, () => {
  let globalMessageService: GlobalMessageService;
  let userAccountFacade: UserAccountFacade;
  let currencyService: CurrencyService;
  let authService: AuthService;
  let userProfileFacade: UserProfileFacade;
  let winRef: WindowRef;

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
        {
          provide: UserAccountFacade,
          useClass: MockUserAccountFacade,
        },
        {
          provide: CurrencyService,
          useClass: MockCurrencyService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
        {
          provide: WindowRef,
          useClass: MockWindowRef,
        },
      ],
    });

    TestBed.inject(UserAccountEventListener);
    globalMessageService = TestBed.inject(GlobalMessageService);
    userAccountFacade = TestBed.inject(UserAccountFacade);
    currencyService = TestBed.inject(CurrencyService);
    authService = TestBed.inject(AuthService);
    userProfileFacade = TestBed.inject(UserProfileFacade);
    winRef = TestBed.inject(WindowRef);
  });

  describe(`onAuth`, () => {
    it(`LogoutEvent should add a global message`, () => {
      mockEventStream$.next(new LogoutEvent());

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'authMessages.signedOutSuccessfully' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('LoginEvent should set active currency from the OCC user response', () => {
      mockEventStream$.next(new LoginEvent());

      expect(userAccountFacade.get).toHaveBeenCalled();
      expect(currencyService.setActive).toHaveBeenCalledWith('USD');
      expect(winRef.localStorage?.getItem).toHaveBeenCalledWith(
        'spartacus⚿⚿currency'
      );
      expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿currency',
        '"EUR"'
      );
    });

    it('LoginEvent should not set active currency when OCC user has no currency', () => {
      (userAccountFacade.get as jasmine.Spy).and.returnValue(of({}));

      mockEventStream$.next(new LoginEvent());

      expect(currencyService.setActive).not.toHaveBeenCalled();
    });
  });

  describe('onCurrencyChange', () => {
    it('should persist currency update for logged-in users when currency changes', () => {
      const event = new CurrencySetEvent();
      event.activeCurrency = 'EUR';

      mockEventStream$.next(event);

      expect(authService.isUserLoggedIn).toHaveBeenCalled();
      expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿currency',
        '"EUR"'
      );
      expect(userProfileFacade.update).toHaveBeenCalledWith({
        currency: { isocode: 'EUR' },
      });
    });

    it('should not persist currency update for anonymous users', () => {
      (authService.isUserLoggedIn as jasmine.Spy).and.returnValue(of(false));
      const event = new CurrencySetEvent();
      event.activeCurrency = 'EUR';

      mockEventStream$.next(event);

      expect(winRef.localStorage?.setItem).not.toHaveBeenCalled();
      expect(userProfileFacade.update).not.toHaveBeenCalled();
    });

    it('should not persist currency update if user already has the same currency', () => {
      const event = new CurrencySetEvent();
      event.activeCurrency = 'USD';

      mockEventStream$.next(event);

      expect(userProfileFacade.update).not.toHaveBeenCalled();
    });
  });

  describe('logout currency restoration', () => {
    it('should restore anonymous currency on logout', () => {
      mockEventStream$.next(new LoginEvent());
      (currencyService.setActive as jasmine.Spy).calls.reset();

      mockEventStream$.next(new LogoutEvent());

      expect(winRef.localStorage?.setItem).toHaveBeenCalledWith(
        'spartacus⚿⚿currency',
        '"EUR"'
      );
      expect(currencyService.setActive).toHaveBeenCalledWith('EUR');
    });
  });
});
