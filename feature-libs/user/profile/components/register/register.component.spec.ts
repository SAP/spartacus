import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ANONYMOUS_CONSENT_STATUS,
  AuthConfigService,
  ConsentTemplate,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
  StateUtils,
  Title,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { User } from '@spartacus/user/account/core';
import { UserRegisterService } from '@spartacus/user/profile/core';
import { Observable, of } from 'rxjs';
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

// let registerUserIsLoading: BehaviorSubject<boolean>;
// let registerUserIsSuccess: BehaviorSubject<boolean>;

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
  getConsent(_templateCode: string): Observable<AnonymousConsent> {
    return of();
  }
  getTemplate(_templateCode: string): Observable<ConsentTemplate> {
    return of();
  }
  withdrawConsent(_templateCode: string): void {}
  giveConsent(_templateCode: string): void {}
  isConsentGiven(_consent: AnonymousConsent): boolean {
    return true;
  }
}

class MockAuthConfigService implements Partial<AuthConfigService> {
  getOAuthFlow() {
    return OAuthFlow.ResourceOwnerPasswordFlow;
  }
}

const mockAnonymousConsentsConfig: AnonymousConsentsConfig = {
  anonymousConsents: {
    registerConsent: 'MARKETING',
    requiredConsents: ['MARKETING'],
  },
};

describe('RegisterComponent', () => {
  let controls: any;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let userRegisterService: UserRegisterService;
  let mockGlobalMessageService: GlobalMessageService;
  let mockRoutingService: RoutingService;
  let anonymousConsentService: AnonymousConsentsService;
  let authConfigService: AuthConfigService;

  beforeEach(
    waitForAsync(() => {
      // registerUserIsLoading = new BehaviorSubject(false);
      // registerUserIsSuccess = new BehaviorSubject(false);
      class MockUserRegisterService {
        loadTitles(): void {}

        getTitles(): Observable<Title[]> {
          return of([]);
        }

        register(
          _titleCode: string,
          _firstName: string,
          _lastName: string,
          _email: string,
          _password: string
        ): Observable<StateUtils.LoaderState<User>> {
          return of({});
        }
      }

      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
        ],
        declarations: [RegisterComponent, MockUrlPipe, MockSpinnerComponent],
        providers: [
          { provide: UserRegisterService, useClass: MockUserRegisterService },
          {
            provide: GlobalMessageService,
            useClass: MockGlobalMessageService,
          },
          {
            provide: RoutingService,
            useClass: MockRoutingService,
          },
          {
            provide: AnonymousConsentsService,
            useClass: MockAnonymousConsentsService,
          },
          {
            provide: AnonymousConsentsConfig,
            useValue: mockAnonymousConsentsConfig,
          },
          {
            provide: AuthConfigService,
            useClass: MockAuthConfigService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    userRegisterService = TestBed.inject(UserRegisterService);
    mockGlobalMessageService = TestBed.inject(GlobalMessageService);
    mockRoutingService = TestBed.inject(RoutingService);
    anonymousConsentService = TestBed.inject(AnonymousConsentsService);
    authConfigService = TestBed.inject(AuthConfigService);

    component = fixture.componentInstance;

    fixture.detectChanges();
    controls = component.registerForm.controls;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit button', () => {
    it('should NOT be disabled', () => {
      fixture = TestBed.createComponent(RegisterComponent);
      fixture.detectChanges();
      const el: HTMLElement = fixture.debugElement.nativeElement;
      const submitButton: HTMLElement = el.querySelector(
        'button[type="submit"]'
      );
      expect(submitButton.hasAttribute('disabled')).toBeFalsy();
    });
  });

  describe('ngOnInit', () => {
    it('should load titles', () => {
      spyOn(userRegisterService, 'getTitles').and.returnValue(
        of(mockTitlesList)
      );

      component.ngOnInit();

      let titleList: Title[];
      component.titles$
        .subscribe((data) => {
          titleList = data;
        })
        .unsubscribe();
      expect(titleList).toEqual(mockTitlesList);
    });

    it('should show spinner when loading = true', () => {
      spyOn(userRegisterService, 'register').and.returnValue(
        of({ loading: true })
      );
      component.ngOnInit();
      component.registerUser();
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('cx-spinner'));
      expect(spinner?.nativeElement).toBeDefined();
    });

    it('should hide spinner when loading = false', () => {
      spyOn(userRegisterService, 'register').and.returnValue(
        of({ loading: false })
      );
      component.ngOnInit();
      component.registerUser();
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('cx-spinner'));
      expect(spinner?.nativeElement).toBeUndefined();
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

  describe('register', () => {
    it('should submit form', () => {
      spyOn(userRegisterService, 'register').and.returnValue(
        of({ success: true })
      );
      component.ngOnInit();
      component.registerUser();
      expect(userRegisterService.register).toHaveBeenCalledWith({
        firstName: '',
        lastName: '',
        uid: '',
        password: '',
        titleCode: '',
      });
    });

    it('should redirect to login page and show message (new flow)', () => {
      spyOn(userRegisterService, 'register').and.returnValue(
        of({ success: true })
      );
      component.ngOnInit();
      component.registerUser();
      // registerUserIsSuccess.next(true);

      expect(mockRoutingService.go).toHaveBeenCalledWith('login');
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should not redirect in different flow that ResourceOwnerPasswordFlow', () => {
      spyOn(userRegisterService, 'register').and.returnValue(
        of({ success: true })
      );
      spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
        OAuthFlow.ImplicitFlow
      );
      component.ngOnInit();
      component.registerUser();

      // registerUserIsSuccess.next(true);

      // expect(mockRoutingService.go).not.toHaveBeenCalled();
      expect(mockGlobalMessageService.add).toHaveBeenCalledWith(
        { key: 'register.postRegisterMessage' },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });
  });

  const toggleAnonymousConsentMethod = 'toggleAnonymousConsent';
  describe(`${toggleAnonymousConsentMethod}`, () => {
    it('should call anonymousConsentsService.giveConsent when the consent is given', () => {
      spyOn(anonymousConsentService, 'giveConsent').and.stub();
      component.ngOnInit();

      controls['newsletter'].setValue(true);
      component.toggleAnonymousConsent();
      expect(anonymousConsentService.giveConsent).toHaveBeenCalled();
    });
    it('should call anonymousConsentsService.withdrawConsent when the consent is NOT given', () => {
      spyOn(anonymousConsentService, 'withdrawConsent').and.stub();
      component.ngOnInit();

      controls['newsletter'].setValue(false);
      component.toggleAnonymousConsent();
      expect(anonymousConsentService.withdrawConsent).toHaveBeenCalled();
    });
  });

  describe('isConsentGiven', () => {
    it('should call anonymousConsentsService.isConsentGiven', () => {
      spyOn(anonymousConsentService, 'isConsentGiven').and.stub();
      const mockConsent: AnonymousConsent = {
        consentState: ANONYMOUS_CONSENT_STATUS.GIVEN,
      };
      component.isConsentGiven(mockConsent);
      expect(anonymousConsentService.isConsentGiven).toHaveBeenCalledWith(
        mockConsent
      );
    });
  });

  const isConsentRequiredMethod = 'isConsentRequired';
  describe('isConsentRequired', () => {
    it('should disable form when register consent is required', () => {
      expect(component[isConsentRequiredMethod]()).toEqual(true);
    });

    it('should disable input when register consent is required', () => {
      spyOn<any>(component, isConsentRequiredMethod).and.returnValue(true);

      fixture.detectChanges();

      expect(controls['newsletter'].status).toEqual('DISABLED');
    });
  });
});
