import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  ANONYMOUS_CONSENT_STATUS,
  AuthConfigService,
  ConsentTemplate,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  OAuthFlow,
  RoutingService,
  Title,
} from '@spartacus/core';
import {
  FormErrorsModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { EMPTY, Observable, of, Subject } from 'rxjs';
import { RegisterComponentService } from './register-component.service';
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
  passwordconf: 'strongPass$!123',
  newsletter: true,
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

class MockGlobalMessageService {
  add = createSpy();
  remove = createSpy();
  get() {
    return EMPTY;
  }
}

class MockRoutingService {
  go = createSpy();
}

class MockAnonymousConsentsService {
  getConsent(_templateCode: string): Observable<AnonymousConsent> {
    return EMPTY;
  }
  getTemplate(_templateCode: string): Observable<ConsentTemplate> {
    return EMPTY;
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

class MockRegisterComponentService
  implements Partial<RegisterComponentService>
{
  getTitles = createSpy().and.returnValue(of(mockTitlesList));
  register = createSpy().and.returnValue(of(undefined));
  postRegisterMessage = createSpy();
  getAdditionalConsents = createSpy();
  generateAdditionalConsentsFormControl = createSpy();
}

describe('RegisterComponent', () => {
  let controls: any;
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let regComponentService: RegisterComponentService;
  let globalMessageService: GlobalMessageService;
  let mockRoutingService: RoutingService;
  let anonymousConsentService: AnonymousConsentsService;
  let authConfigService: AuthConfigService;
  let registerComponentService: RegisterComponentService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          ReactiveFormsModule,
          RouterTestingModule,
          I18nTestingModule,
          FormErrorsModule,
          NgSelectModule,
          PasswordVisibilityToggleModule,
          NgSelectA11yModule,
        ],
        declarations: [RegisterComponent, MockUrlPipe, MockSpinnerComponent],
        providers: [
          {
            provide: RegisterComponentService,
            useClass: MockRegisterComponentService,
          },
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
    regComponentService = TestBed.inject(RegisterComponentService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    mockRoutingService = TestBed.inject(RoutingService);
    anonymousConsentService = TestBed.inject(AnonymousConsentsService);
    authConfigService = TestBed.inject(AuthConfigService);
    registerComponentService = TestBed.inject(RegisterComponentService);

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
      component.ngOnInit();

      let titleList: Title[];
      component.titles$
        .subscribe((data) => {
          titleList = data;
        })
        .unsubscribe();
      expect(titleList).toEqual(mockTitlesList);
    });

    it('should handle error when title code is required from the backend config', () => {
      spyOn(globalMessageService, 'get').and.returnValue(
        of({
          [GlobalMessageType.MSG_TYPE_ERROR]: [
            { raw: 'This field is required.' },
          ],
        } as GlobalMessageEntities)
      );
      component.ngOnInit();

      expect(globalMessageService.remove).toHaveBeenCalledWith(
        GlobalMessageType.MSG_TYPE_ERROR
      );
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'register.titleRequired',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should show spinner when loading = true', () => {
      const register = new Subject();
      (regComponentService.register as any).and.returnValue(register);
      component.ngOnInit();
      component.registerUser();
      fixture.detectChanges();
      const spinner = fixture.debugElement.query(By.css('cx-spinner'));
      expect(spinner?.nativeElement).toBeDefined();
      register.complete();
    });

    it('should hide spinner when loading = false', () => {
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
    it('should register with valid form', () => {
      component.registerForm.patchValue(mockRegisterFormData);
      component.ngOnInit();
      component.submitForm();
      expect(regComponentService.register).toHaveBeenCalledWith({
        firstName: mockRegisterFormData.firstName,
        lastName: mockRegisterFormData.lastName,
        uid: mockRegisterFormData.email_lowercase,
        password: mockRegisterFormData.password,
        titleCode: mockRegisterFormData.titleCode,
      });
    });

    it('should not register with valid form', () => {
      component.ngOnInit();
      component.submitForm();
      expect(regComponentService.register).not.toHaveBeenCalled();
    });

    it('should redirect to login page and show message (new flow)', () => {
      component.ngOnInit();
      component.registerUser();
      // registerUserIsSuccess.next(true);

      expect(mockRoutingService.go).toHaveBeenCalledWith('login');
      expect(registerComponentService.postRegisterMessage).toHaveBeenCalled();
    });

    it('should not redirect in different flow that ResourceOwnerPasswordFlow', () => {
      spyOn(authConfigService, 'getOAuthFlow').and.returnValue(
        OAuthFlow.ImplicitFlow
      );
      component.ngOnInit();
      component.registerUser();

      expect(mockRoutingService.go).not.toHaveBeenCalled();
      expect(registerComponentService.postRegisterMessage).toHaveBeenCalled();
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
