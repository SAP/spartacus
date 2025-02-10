/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { Component, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  ANONYMOUS_CONSENT_STATUS,
  AnonymousConsent,
  AnonymousConsentsConfig,
  AnonymousConsentsService,
  BaseSite,
  BaseSiteService,
  ClientAuthenticationTokenService,
  ConsentTemplate,
  GlobalMessageEntities,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  LanguageService,
  RoutingService,
  SiteAdapter,
  Title,
} from '@spartacus/core';
import {
  CaptchaModule,
  FormErrorsModule,
  NgSelectA11yModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { MockFeatureDirective } from 'projects/storefrontlib/shared/test/mock-feature-directive';
import { EMPTY, Observable, of, throwError } from 'rxjs';

import createSpy = jasmine.createSpy;
import { ONE_TIME_PASSWORD_REGISTRATION_PURPOSE } from '../user-account-constants';
import { OneTimePasswordRegisterComponent } from './otp-login-register.component';
import { VerificationTokenFacade } from '@spartacus/user/account/root';
import { RegisterComponentService } from '../register';
import { HttpErrorResponse } from '@angular/common/http';

const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@thebest.john.intheworld.com',
  termsandconditions: true,
  newsletter: true,
  captcha: true,
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
  standalone: false,
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  selector: 'cx-spinner',
  template: '',
  standalone: false,
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
  getAdditionalConsents = createSpy();
  generateAdditionalConsentsFormControl = createSpy();
}

class MockSiteAdapter {
  public loadBaseSite(siteUid?: string): Observable<BaseSite> {
    return of<BaseSite>({
      uid: siteUid,
      captchaConfig: {
        enabled: true,
        publicKey: 'mock-key',
      },
    });
  }
}

class MockBaseSiteService {
  getActive(): Observable<string> {
    return of('mock-site');
  }
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('mock-lang');
  }
}

class MockClientAuthenticationTokenService
  implements Partial<ClientAuthenticationTokenService>
{
  loadClientAuthenticationToken = createSpy().and.returnValue(of(undefined));
}

describe('OneTimePasswordRegisterComponent', () => {
  let controls: any;
  let component: OneTimePasswordRegisterComponent;
  let fixture: ComponentFixture<OneTimePasswordRegisterComponent>;
  let mockRoutingService: RoutingService;

  let globalMessageService: GlobalMessageService;
  let anonymousConsentService: AnonymousConsentsService;
  let registrationVerificationTokenFacade: VerificationTokenFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FormErrorsModule,
        NgSelectModule,
        PasswordVisibilityToggleModule,
        NgSelectA11yModule,
        CaptchaModule,
      ],
      declarations: [
        OneTimePasswordRegisterComponent,
        MockUrlPipe,
        MockSpinnerComponent,
        MockFeatureDirective,
      ],
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
          provide: SiteAdapter,
          useClass: MockSiteAdapter,
        },
        {
          provide: BaseSiteService,
          useClass: MockBaseSiteService,
        },
        {
          provide: LanguageService,
          useClass: MockLanguageService,
        },
        {
          provide: ClientAuthenticationTokenService,
          useClass: MockClientAuthenticationTokenService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneTimePasswordRegisterComponent);
    globalMessageService = TestBed.inject(GlobalMessageService);
    anonymousConsentService = TestBed.inject(AnonymousConsentsService);
    registrationVerificationTokenFacade = TestBed.inject(
      VerificationTokenFacade
    );
    mockRoutingService = TestBed.inject(RoutingService);

    component = fixture.componentInstance;

    fixture.detectChanges();
    controls = component.registerForm.controls;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('submit button', () => {
    it('should NOT be disabled', () => {
      fixture = TestBed.createComponent(OneTimePasswordRegisterComponent);
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
  });

  describe('sendRegistrationVerificationToken', () => {
    it('should create registration verification token with valid form', () => {
      spyOn(
        registrationVerificationTokenFacade,
        'createVerificationToken'
      ).and.returnValue(
        of({
          expiresIn: '300',
          tokenId: 'mockTokenId',
        })
      );
      component.registerForm.patchValue(mockRegisterFormData);
      component.ngOnInit();
      component.submitForm();
      expect(
        registrationVerificationTokenFacade.createVerificationToken
      ).toHaveBeenCalledWith({
        loginId: mockRegisterFormData.email.toLowerCase(),
        purpose: ONE_TIME_PASSWORD_REGISTRATION_PURPOSE,
      });
    });

    it('should not create registration verification token with invalid form', () => {
      spyOn(
        registrationVerificationTokenFacade,
        'createVerificationToken'
      ).and.returnValue(
        of({
          expiresIn: '300',
          tokenId: 'mockTokenId',
        })
      );
      component.ngOnInit();
      component.submitForm();
      expect(
        registrationVerificationTokenFacade.createVerificationToken
      ).not.toHaveBeenCalled();
    });

    it('should redirect to next register page', () => {
      component.ngOnInit();
      component.sendRegistrationVerificationToken();

      expect(mockRoutingService.go).toHaveBeenCalled();
    });

    it('should redirect to next register page when create registration verification token up to rate limit', () => {
      const httpErrorResponse = new HttpErrorResponse({
        status: 400,
        url: 'https://localhost:9002/occ/v2/electronics-spa/users/anonymous/verificationToken?lang=en&curr=USD',
      });
      component.ngOnInit();
      spyOn(
        registrationVerificationTokenFacade,
        'createVerificationToken'
      ).and.returnValue(throwError(() => httpErrorResponse));
      component.sendRegistrationVerificationToken();

      expect(mockRoutingService.go).toHaveBeenCalled();
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

  describe('captcha', () => {
    let captchaComponent;
    beforeEach(() => {
      captchaComponent = fixture.debugElement.query(By.css('cx-captcha'));
      spyOn(component, 'sendRegistrationVerificationToken').and.callThrough();
      mockRegisterFormData.captcha = false;
      component.registerForm.patchValue(mockRegisterFormData);
    });

    function getCaptchaControl(
      component: OneTimePasswordRegisterComponent
    ): AbstractControl {
      return component.registerForm.get('captcha') as AbstractControl;
    }

    it('should create captcha component', () => {
      expect(captchaComponent).toBeTruthy();
    });

    it('should enable captcha', () => {
      captchaComponent.triggerEventHandler('enabled', true);
      component.submitForm();

      expect(getCaptchaControl(component).valid).toEqual(false);
      expect(component.sendRegistrationVerificationToken).toHaveBeenCalledTimes(
        0
      );
    });

    it('should confirm captcha', () => {
      spyOn(component, 'captchaConfirmed').and.callThrough();

      captchaComponent.triggerEventHandler('enabled', true);
      captchaComponent.triggerEventHandler('confirmed', true);
      component.submitForm();

      expect(getCaptchaControl(component).value).toBe(true);
      expect(getCaptchaControl(component).valid).toEqual(true);
      expect(component.sendRegistrationVerificationToken).toHaveBeenCalledTimes(
        1
      );
    });
  });
});
