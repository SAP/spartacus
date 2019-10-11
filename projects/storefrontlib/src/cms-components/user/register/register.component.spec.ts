import { Component, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  AuthRedirectService,
  AuthService,
  ConsentTemplate,
  FeatureConfigService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  Title,
  UserService,
  UserToken,
} from '@spartacus/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RegisterComponent } from './register.component';

import createSpy = jasmine.createSpy;

const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'JohnDoe@thebest.john.intheworld.com',
  email_lowercase: 'johndoe@thebest.john.intheworld.com',
  termsandconditions: true,
  password: 'strongPass$!123',
};

const mockTitlesList: Title[] = [
  {
    code: 'mr',
    name: 'Mr.',
  },
  {
    code: 'mrs',
    name: 'Mrs.',
  },
];

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
})
class MockSpinnerComponent {}

class MockAuthService {
  authorize = createSpy();
  getUserToken(): Observable<UserToken> {
    return of({ access_token: 'test' } as UserToken);
  }
}

class MockAuthRedirectService {
  redirect = createSpy('AuthRedirectService.redirect');
}

const isLevelBool: BehaviorSubject<boolean> = new BehaviorSubject(false);

class MockFeatureConfigService {
  isLevel(_level: string): boolean {
    return isLevelBool.value;
  }
}

const registerUserIsLoading: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);
const registerUserIsSuccess: BehaviorSubject<boolean> = new BehaviorSubject(
  false
);

class MockUserService {
  loadTitles(): void {}
  resetRegisterUserProcessState(): void {}

  getTitles(): Observable<Title[]> {
    return of([]);
  }

  register(
    _titleCode: string,
    _firstName: string,
    _lastName: string,
    _email: string,
    _password: string
  ): void {}

  getRegisterUserResultLoading(): Observable<boolean> {
    return registerUserIsLoading.asObservable();
  }
  getRegisterUserResultSuccess(): Observable<boolean> {
    return registerUserIsSuccess.asObservable();
  }
}

class MockGlobalMessageService {
  add = createSpy();
  remove = createSpy();
  get() {
    return of();
  }
}

class MockRoutingService {
  go = createSpy();
}

class MockAnonymousConsentsService {
  getAnonymousConsent(_templateCode: string): Observable<AnonymousConsent> {
    return of();
  }

  getAnonymousConsentTemplate(
    _templateCode: string
  ): Observable<ConsentTemplate> {
    return of();
  }

  giveAnonymousConsent(_templateCode: string): void {}
}

const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
    requiredConsents: ['MARKETING'],
  },
};

describe('RegisterComponent', () => {
  let controls;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userService: MockUserService;
  let mockGlobalMessageService: MockGlobalMessageService;
  let mockRoutingService: MockRoutingService;
  let mockAuthService: MockAuthService;
  let mockAuthRedirectService: MockAuthRedirectService;
  let anonymousConsentService: AnonymousConsentsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule, I18nTestingModule],
      declarations: [RegisterComponent, MockUrlPipe, MockSpinnerComponent],
      // TODO(issue:4237) Register flow
      providers: [
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        { provide: UserService, useClass: MockUserService },
        { provide: AuthService, useClass: MockAuthService },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
        {
          provide: AnonymousConsentsService,
          useClass: MockAnonymousConsentsService,
        },
        {
          provide: AnonymousConsentsConfig,
          useValue: mockAnonymousConsentsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    userService = TestBed.get(UserService as Type<UserService>);
    mockGlobalMessageService = TestBed.get(GlobalMessageService as Type<
      GlobalMessageService
    >);
    mockRoutingService = TestBed.get(RoutingService as Type<RoutingService>);
    mockAuthService = TestBed.get(AuthService as Type<AuthService>);
    mockAuthRedirectService = TestBed.get(AuthRedirectService as Type<
      AuthRedirectService
    >);
    anonymousConsentService = TestBed.get(AnonymousConsentsService as Type<
      AnonymousConsentsService
    >);

    component = fixture.componentInstance;

    fixture.detectChanges();
    controls = component.userRegistrationForm.controls;

    // TODO(issue:4237) Register flow
    component.isNewRegisterFlowEnabled = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      spyOn(userService, 'getTitles').and.returnValue(of(mockTitlesList));

      component.ngOnInit();

      let titleList: Title[];
      component.titles$
        .subscribe(data => {
          titleList = data;
        })
        .unsubscribe();
      expect(titleList).toEqual(mockTitlesList);
    });

    it('should fetch titles if the state is empty', done => {
      spyOn(userService, 'loadTitles').and.stub();
      spyOn(userService, 'getTitles').and.returnValue(of([]));

      component.ngOnInit();

      component.titles$
        .subscribe(() => {
          expect(userService.loadTitles).toHaveBeenCalled();
          done();
        })
        .unsubscribe();
    });

    it('should fetch registerUser process loading state', () => {
      const getSpinner = () => fixture.debugElement.query(By.css('cx-spinner'));
      component.ngOnInit();

      // when false
      registerUserIsLoading.next(false);
      fixture.detectChanges();

      expect(getSpinner()).toBeFalsy();

      // when true
      registerUserIsLoading.next(true);
      fixture.detectChanges();

      expect(getSpinner()).toBeTruthy();
    });
  });

  describe('form validate', () => {
    it('form invalid when empty', () => {
      spyOn(userService, 'getTitles').and.returnValue(of(mockTitlesList));

      component.ngOnInit();

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('should contains error if repassword is different than password', () => {
      component.ngOnInit();

      controls['password'].setValue('test');
      controls['passwordconf'].setValue('test1');

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeTruthy();
    });

    it('should not contain error if repassword is the same as password', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      const isNotEqual = component.userRegistrationForm.hasError('NotEqual');
      expect(isNotEqual).toBeFalsy();
    });

    it('form valid when filled', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['titleCode'].setValue(form.titleCode);
      controls['firstName'].setValue(form.firstName);
      controls['lastName'].setValue(form.lastName);
      controls['email'].setValue(form.email);
      controls['termsandconditions'].setValue(form.termsandconditions);
      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      expect(component.userRegistrationForm.valid).toBeTruthy();
    });

    it('form invalid when not all required fields filled', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['titleCode'].setValue(form.titleCode);
      controls['firstName'].setValue(form.firstName);
      controls['lastName'].setValue(''); // this field is intentionally empty
      controls['email'].setValue(form.email);
      controls['termsandconditions'].setValue(form.termsandconditions);
      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });

    it('form invalid when not terms not checked', () => {
      const form = mockRegisterFormData;
      component.ngOnInit();

      controls['titleCode'].setValue(form.titleCode);
      controls['firstName'].setValue(form.firstName);
      controls['lastName'].setValue(form.lastName);
      controls['email'].setValue(form.email);
      controls['termsandconditions'].setValue(false); // we are checking this field
      controls['password'].setValue(form.password);
      controls['passwordconf'].setValue(form.password);

      expect(component.userRegistrationForm.valid).toBeFalsy();
    });
  });

  describe('collectDataFromRegisterForm()', () => {
    it('should return correct register data', () => {
      const form = mockRegisterFormData;

      expect(component.collectDataFromRegisterForm(form)).toEqual({
        firstName: form.firstName,
        lastName: form.lastName,
        uid: form.email_lowercase,
        password: form.password,
        titleCode: form.titleCode,
      });
    });
  });

  // TODO(issue:4237) Register flow
  // NOTE: remove test for old flow
  describe('submit (old flow)', () => {
    beforeEach(() => {
      spyOn(userService, 'register').and.stub();
      isLevelBool.next(false);
      component.ngOnInit();
      component.submit();
    });

    it('should submit form', () => {
      expect(userService.register).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        uid: '',
        password: '',
        titleCode: '',
      });
    });

    it('should redirect to homepage and log in user', () => {
      registerUserIsSuccess.next(true);

      expect(mockAuthService.authorize).toHaveBeenCalledWith('', '');
      expect(mockGlobalMessageService.remove).toHaveBeenCalledWith(
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(mockAuthRedirectService.redirect).toHaveBeenCalled();
    });
  });

  describe('submit', () => {
    beforeEach(() => {
      spyOn(userService, 'register').and.stub();

      // TODO(issue:4237) Register flow
      // NOTE: remove isLevelBool
      isLevelBool.next(true);

      component.ngOnInit();
      component.submit();
    });

    it('should submit form', () => {
      expect(userService.register).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        uid: '',
        password: '',
        titleCode: '',
      });
    });

    it('should redirect to login page and show message (new flow)', () => {
      registerUserIsSuccess.next(true);

      expect(mockRoutingService.go).toHaveBeenCalledWith('login');
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });

  describe('onRegisterUserSuccess', () => {
    beforeEach(() => {
      spyOn(anonymousConsentService, 'giveAnonymousConsent').and.stub();
    });

    it('should give anonymous consent if consent was given', () => {
      component.userRegistrationForm.get('newsletter').setValue(true);

      registerUserIsSuccess.next(true);

      expect(anonymousConsentService.giveAnonymousConsent).toHaveBeenCalledWith(
        mockAnonymousConsentsConfig.anonymousConsents.registerConsent
      );
    });
    it('should give anonymous consent if consent was NOT given', () => {
      component.userRegistrationForm.get('newsletter').setValue(false);

      registerUserIsSuccess.next(true);

      expect(
        anonymousConsentService.giveAnonymousConsent
      ).not.toHaveBeenCalled();
    });
  });

  describe('isConsentRequired', () => {
    it('should disable form when register consent is required', () => {
      expect(component.isConsentRequired()).toEqual(true);
    });

    it('should disable input when when register consent is required', () => {
      spyOn(component, 'isConsentRequired').and.returnValue(true);

      fixture.detectChanges();

      expect(controls['newsletter'].status).toEqual('DISABLED');
    });
  });
});
