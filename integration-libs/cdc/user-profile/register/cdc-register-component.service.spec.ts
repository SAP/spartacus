import { provideHttpClientTesting } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  CdcConsentManagementComponentService,
  CdcJsService,
} from '@spartacus/cdc/root';
import {
  AnonymousConsentsService,
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
import { config, firstValueFrom, Observable, of, throwError } from 'rxjs';
import { CDCRegisterComponentService } from './cdc-register-component.service';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

const userRegisterFormData: UserSignUp = {
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
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  get(): Observable<User> {
    return of({ uid: OCC_USER_ID_CURRENT });
  }
  getTitles = vi.fn().mockReturnValue(of([]));
  update(): Observable<User> {
    return of({});
  }
}

class MockUserRegisterFacade implements Partial<UserRegisterFacade> {
  getTitles = vi.fn().mockReturnValue(of([]));
}

class MockUserProfileConnector implements Partial<UserProfileConnector> {
  register = vi.fn().mockImplementation((user: any) => of(user));
}

class MockAuthService implements Partial<AuthService> {
  loginWithCredentials = vi.fn().mockReturnValue(Promise.resolve());
  isUserLoggedIn = vi.fn().mockReturnValue(of(true));
}

class MockEventService implements Partial<EventService> {
  get = vi.fn().mockImplementation(() => of(false)); //no failures
}

class MockCDCJsService implements Partial<CdcJsService> {
  didLoad = vi.fn().mockImplementation(() => of(true));
  registerUserWithoutScreenSet = vi.fn().mockImplementation(() =>
    of({ status: 'OK' })
  );
  onLoginEventHandler = vi.fn();
}

const mockedGlobalMessageService = {
  add: () => {},
  remove: () => {},
};
class MockConverterService implements Partial<ConverterService> {
  convert = vi.fn();
}
class MockCdcConsentManagementService
  implements Partial<CdcConsentManagementComponentService>
{
  getCdcConsentIDs = vi.fn();
  isConsentMandatory(_id: string): boolean {
    return true;
  }
}
class MockAnonymousConsentsService
  implements Partial<AnonymousConsentsService>
{
  getTemplates = vi.fn();
}
class MockUntypedFormBuilder implements Partial<UntypedFormBuilder> {
  array = vi.fn();
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
  let cdcConsentManagementService: CdcConsentManagementComponentService;
  let fb: UntypedFormBuilder;
  let anonymousConsentsService: AnonymousConsentsService;

  // TODO: CXSPA-4870 verify if can be avoided
  let originalOnUnhandledError: ((err: any) => void) | null;

  beforeAll(() => {
    // configure rxjs to not crash node instance with thrown errors
    // TODO: CXSPA-4870 verify if can be avoided
    originalOnUnhandledError = config.onUnhandledError;
    config.onUnhandledError = () => {};
  });

  afterAll(() => {
    // reset rxjs configuration
    // TODO: CXSPA-4870 verify if can be avoided
    config.onUnhandledError = originalOnUnhandledError;
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
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
          provide: CdcConsentManagementComponentService,
          useClass: MockCdcConsentManagementService,
        },
        {
          provide: UntypedFormBuilder,
          useClass: MockUntypedFormBuilder,
        },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        CDCRegisterComponentService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
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
    cdcConsentManagementService = TestBed.inject(
      CdcConsentManagementComponentService
    );
    anonymousConsentsService = TestBed.inject(AnonymousConsentsService);
    fb = TestBed.inject(UntypedFormBuilder);
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
    it('should be able to register user through CDC', async () => {
      converter.convert = vi.fn().mockReturnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcConsentManagementService.getCdcConsentIDs =
        vi.fn().mockReturnValue(['others.survey']);
      await firstValueFrom(cdcUserRegisterService.register(userRegisterFormData));
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
      expect(cdcJsService.didLoad).toHaveBeenCalled();
    });

    it('should NOT happen without CDC, should show error', async () => {
      vi.spyOn(globalMessageService, 'remove');
      vi.spyOn(globalMessageService, 'add');
      cdcConsentManagementService.getCdcConsentIDs =
        vi.fn().mockReturnValue(['others.survey']);
      cdcJsService.didLoad = vi.fn().mockImplementation(() => of(false));
      await expect(
        firstValueFrom(cdcUserRegisterService.register(userRegisterFormData))
      ).rejects.toBeDefined();
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
    });

    it('should not do anything when CDC registration fails', async () => {
      cdcJsService.registerUserWithoutScreenSet = vi.fn().mockReturnValue(
        throwError(() => 'ERROR')
      );
      await expect(
        firstValueFrom(cdcUserRegisterService.register(userRegisterFormData))
      ).rejects.toBeDefined();
      expect(connector.register).not.toHaveBeenCalled();
      expect(
        cdcJsService.registerUserWithoutScreenSet
      ).toHaveBeenCalledWith({
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
      expect(cdcJsService.didLoad).toHaveBeenCalled();
    });

    it('should throw error when CDC user token fails', async () => {
      (cdcUserRegisterService as any)['loadUserTokenFailed$'] = throwError(
        () => new Error('CDC user token failed')
      );
      cdcConsentManagementService.getCdcConsentIDs =
        vi.fn().mockReturnValue(['others.survey']);
      await expect(
        firstValueFrom(cdcUserRegisterService.register(userRegisterFormData))
      ).rejects.toBeDefined();
      expect(connector.register).not.toHaveBeenCalled();
      expect(
        cdcJsService.registerUserWithoutScreenSet
      ).toHaveBeenCalledWith({
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
      expect(cdcJsService.didLoad).toHaveBeenCalled();
    });

    it('should not do anything when user is not logged in', async () => {
      authService.isUserLoggedIn = vi.fn().mockReturnValue(of(false));
      converter.convert = vi.fn().mockReturnValue({
        others: {
          survey: {
            isConsentGranted: true,
          },
        },
      });
      cdcConsentManagementService.getCdcConsentIDs =
        vi.fn().mockReturnValue(['others.survey']);
      await firstValueFrom(cdcUserRegisterService.register(userRegisterFormData));
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
      expect(cdcJsService.didLoad).toHaveBeenCalled();
    });
  });
  it('fetchCdcConsentsForRegistration', () => {
    cdcConsentManagementService.getCdcConsentIDs = vi.fn().mockReturnValue([
      'consent1.terms1',
    ]);
    anonymousConsentsService.getTemplates = vi.fn().mockReturnValue(
      of([
        {
          id: 'consent1.terms1',
          description: 'sample consent 1',
        },
        {
          id: 'consent2.terms2',
          description: 'sample consent 2',
        },
        {
          id: 'consent3.terms3',
          description: 'sample consent 3',
        },
      ])
    );
    let result = cdcUserRegisterService.fetchCdcConsentsForRegistration();
    expect(anonymousConsentsService.getTemplates).toHaveBeenCalled();
    expect(cdcConsentManagementService.getCdcConsentIDs).toHaveBeenCalled();
    expect(result).toEqual([
      {
        id: 'consent1.terms1',
        description: 'sample consent 1',
      },
    ]);
  });
  it('generateAdditionalConsentsFormControl', () => {
    vi.spyOn(
      cdcUserRegisterService,
      'fetchCdcConsentsForRegistration'
    ).mockReturnValue([
      {
        id: 'consent1.terms1',
        description: 'sample consent 1',
      },
    ]);
    fb.array = vi.fn().mockReturnValue([]);
    fb.group = vi.fn().mockReturnValue({});
    cdcUserRegisterService.generateAdditionalConsentsFormControl();
    expect(
      cdcUserRegisterService.fetchCdcConsentsForRegistration
    ).toHaveBeenCalled();
    expect(fb.array).toHaveBeenCalled();
  });
  it('loadAdditionalConsents', () => {
    vi.spyOn(cdcConsentManagementService, 'isConsentMandatory')
      .mockImplementation((id: string) =>
        id === 'consent2.terms2' ? false : true
      );
    vi.spyOn(
      cdcUserRegisterService,
      'fetchCdcConsentsForRegistration'
    ).mockReturnValue([
      {
        id: 'consent2.terms2',
        description: 'sample consent 2',
      },
      {
        id: 'consent3.terms3',
        description: 'sample consent 3',
      },
    ]);

    let result = cdcUserRegisterService.getAdditionalConsents();
    expect(
      cdcUserRegisterService.fetchCdcConsentsForRegistration
    ).toHaveBeenCalled();
    expect(result).toEqual([
      {
        template: {
          id: 'consent2.terms2',
          description: 'sample consent 2',
        },
        required: false,
      },
      {
        template: {
          id: 'consent3.terms3',
          description: 'sample consent 3',
        },
        required: true,
      },
    ]);
  });
});
