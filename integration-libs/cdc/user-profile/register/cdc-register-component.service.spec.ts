import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { CdcConsentManagementService, CdcJsService } from '@spartacus/cdc/root';
import {
  AuthService,
  ConverterService,
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
  preferences: {},
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
class MockConverterService implements Partial<ConverterService> {
  convert = createSpy();
}
class MockCdcConsentManagementService
  implements Partial<CdcConsentManagementService>
{
  getCdcRequiredConsents = createSpy();
}
describe('CdcRegisterComponentService', () => {
  let cdcUserRegisterService: CDCRegisterComponentService;
  let connector: UserProfileConnector;
  let cdcJsService: CdcJsService;
  let globalMessageService: GlobalMessageService;
  let userRegisterFacade: UserRegisterFacade;
  let authService: AuthService;
  let eventService: EventService;
  let converter: ConverterService;
  let cdcConsentManagementService: CdcConsentManagementService;

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
        {
          provide: ConverterService,
          useClass: MockConverterService,
        },
        {
          provide: CdcConsentManagementService,
          useClass: MockCdcConsentManagementService,
        },
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
    converter = TestBed.inject(ConverterService);
    cdcConsentManagementService = TestBed.inject(CdcConsentManagementService);
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
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcConsentManagementService.getCdcRequiredConsents =
        createSpy().and.returnValue(['others.survey']);
      cdcUserRegisterService.register(userRegisterFormData).subscribe(() => {
        expect(connector.register).not.toHaveBeenCalled();
        expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
          titleCode: 'Mr.',
          firstName: 'firstName',
          lastName: 'lastName',
          uid: 'uid',
          password: 'password',
          preferences: {
            others: {
              survey: {
                isConsentGranted: true,
              },
            },
          },
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
      cdcUserRegisterService.generatePreferencesObject =
        createSpy().and.returnValue({});

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
            preferences: {},
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
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcConsentManagementService.getCdcRequiredConsents =
        createSpy().and.returnValue(['others.survey']);
      cdcUserRegisterService.register(userRegisterFormData).subscribe(() => {
        expect(connector.register).not.toHaveBeenCalled();
        expect(cdcJsService.registerUserWithoutScreenSet).toHaveBeenCalledWith({
          titleCode: 'Mr.',
          firstName: 'firstName',
          lastName: 'lastName',
          uid: 'uid',
          password: 'password',
          preferences: {
            others: {
              survey: {
                isConsentGranted: true,
              },
            },
          },
        });
      });
      expect(cdcJsService.didLoad).toHaveBeenCalled();
      done();
    });

    it('should generate preferences for user registration', (done) => {
      converter.convert = createSpy().and.returnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcConsentManagementService.getCdcRequiredConsents =
        createSpy().and.returnValue(['others.survey']);
      let result = cdcUserRegisterService.generatePreferencesObject();
      expect(
        cdcConsentManagementService.getCdcRequiredConsents
      ).toHaveBeenCalled();
      expect(result).toEqual({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      done();
    });
  });
});
