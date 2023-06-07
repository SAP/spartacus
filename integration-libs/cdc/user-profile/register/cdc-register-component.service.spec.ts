import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  EventService,
  GlobalMessageService,
  GlobalMessageType,
  OCC_USER_ID_CURRENT,
} from '@spartacus/core';
import { User } from '@spartacus/user/account/root';
import {
  UserProfileConnector,
  UserRegisterService,
} from '@spartacus/user/profile/core';
import {
  UserProfileFacade,
  UserRegisterFacade,
  UserSignUp,
} from '@spartacus/user/profile/root';
import { Observable, of, throwError } from 'rxjs';
import { CDCRegisterComponentService } from './cdc-register-component.service';
import createSpy = jasmine.createSpy;

const userRegisterFormData: UserSignUp = {
  titleCode: 'Mr.',
  firstName: 'firstName',
  lastName: 'lastName',
  uid: 'uid',
  password: 'password',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = createSpy().and.returnValue(of([]));
  update(): Observable<User> {
    return of({});
  }
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles = createSpy().and.returnValue(of([]));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = createSpy().and.callFake((user: any) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = createSpy().and.returnValue(Promise.resolve());
  isUserLoggedIn = createSpy().and.returnValue(of(true));
}

class MockEventService implements Partial<EventService> {
  get = createSpy().and.callFake(() => of(false)); //no failures
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = createSpy().and.callFake(() => of(true));
  registerUserWithoutScreenSet = createSpy().and.callFake(() =>
    of({ status: 'OK' })
  );
  onLoginEventHandler = createSpy();
}

const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};

describe('CdcRegisterComponentService', () => {
  let cdcUserRegisterService: CDCRegisterComponentService;
  let connector: UserProfileConnector;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;
  let userRegisterFacade: UserRegisterFacade;
  let authService: AuthService;
  let eventService: EventService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Store, useValue: { dispatch: () => {} } },
        {
          provide: UserProfileConnector,
          useClass: MockUserProfileConnector,
        },
        { provide: UserProfileFacade, useClass: MockUserProfileFacade },
        { provide: CdcJsService, useClass: MockCDCJsService },
        { provide: UserRegisterFacade, useClass: MockUserRegisterFacade },
        { provide: EventService, useClass: MockEventService },
        { provide: GlobalMessageService, useValue: mockedGlobalMessageService },
        CDCRegisterComponentService,
      ],
    });

    globalMessageService = TestBed.inject(GlobalMessageService);
    cdcUserRegisterService = TestBed.inject(CDCRegisterComponentService);
    connector = TestBed.inject(UserProfileConnector);
    cdcJsService = TestBed.inject(CdcJsService);
    userRegisterFacade = TestBed.inject(UserRegisterFacade);
    authService = TestBed.inject(AuthService);
    eventService = TestBed.inject(EventService);

    TestBed.compileComponents();
  });

  it('should be created', () => {
    expect(cdcUserRegisterService).toBeTruthy();
  });

  it('should inject UserRegisterService', inject(
    [CDCRegisterComponentService],
    (userRegisterService: UserRegisterService) => {
      expect(userRegisterService).toBeTruthy();
    }
  ));

  it('should get titles from UserRegisterService', () => {
    cdcUserRegisterService.getTitles();
    expect(userRegisterFacade.getTitles).toHaveBeenCalled();
  });

  describe('Register', () => {
    it('should be able to register user through CDC', (done) => {
      cdcUserRegisterService.register(userRegisterFormData).subscribe(() => {
        expect(connector.register).not.toHaveBeenCalled();
        expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
          titleCode: 'Mr.',
          firstName: 'firstName',
          lastName: 'lastName',
          uid: 'uid',
          password: 'password',
        });
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should NOT happen without CDC, should show error', (done) => {
      spyOn(globalMessageService, 'remove');
      spyOn(globalMessageService, 'add');
      cdcJsService.didLoad = createSpy().and.callFake(() => of(false));
      cdcUserRegisterService.register(userRegisterFormData).subscribe({
        error: () => {
          expect(
            cdcJsService.registerUserWithoutScreenSet
          ).not.toHaveBeenCalled();
          expect(connector.register).not.toHaveBeenCalled();
          expect(globalMessageService.add).toHaveBeenCalledWith(
            {
              key: 'errorHandlers.scriptFailedToLoad',
            },
            GlobalMessageType.MSG_TYPE_ERROR
          );
          expect(
            cdcJsService.registerUserWithoutScreenSet
          ).not.toHaveBeenCalled();
          done();
        },
      });
    });

    it('should not do anything when CDC registration fails', (done) => {
      cdcJsService.registerUserWithoutScreenSet = createSpy().and.returnValue(
        throwError('ERROR')
      );

      cdcUserRegisterService.register(userRegisterFormData).subscribe({
        error: () => {
          expect(connector.register).not.toHaveBeenCalled();
          expect(
            cdcJsService.registerUserWithoutScreenSet
          ).toHaveBeenCalledWith({
            titleCode: 'Mr.',
            firstName: 'firstName',
            lastName: 'lastName',
            uid: 'uid',
            password: 'password',
          });
        },
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should throw error when CDC user token fails', (done) => {
      eventService.get = createSpy().and.returnValue(of(true));

      cdcUserRegisterService.register(userRegisterFormData).subscribe({
        error: () => {
          expect(connector.register).not.toHaveBeenCalled();
          expect(
            cdcJsService.registerUserWithoutScreenSet
          ).toHaveBeenCalledWith({
            titleCode: 'Mr.',
            firstName: 'firstName',
            lastName: 'lastName',
            uid: 'uid',
            password: 'password',
          });
          done();
        },
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should not do anything when user is not logged in', (done) => {
      authService.isUserLoggedIn = createSpy().and.returnValue(of(false));

      cdcUserRegisterService.register(userRegisterFormData).subscribe(() => {
        expect(connector.register).not.toHaveBeenCalled();
        expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
          titleCode: 'Mr.',
          firstName: 'firstName',
          lastName: 'lastName',
          uid: 'uid',
          password: 'password',
        });
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });
  });
});
