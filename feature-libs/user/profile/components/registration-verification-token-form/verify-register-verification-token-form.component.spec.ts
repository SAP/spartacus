/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthConfigService,
  FeatureToggles,
  GlobalMessageService,
  MockTranslatePipe,
  MockTranslationService,
  OAuthFlow,
  RoutingService,
  TranslatePipe,
  TranslationService,
  UrlPipe,
} from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of, throwError } from 'rxjs';
import { RegistrationVerificationTokenFormComponent } from './verify-register-verification-token-form.component';
import { RegistrationVerificationTokenFormComponentService } from './verify-register-verification-token-form.service'
import { vi } from 'vitest';
import { MockUrlPipe } from 'core-libs/core/src/routing/configurable-routes/url-translation/testing/mock-url.pipe';

const mockSecurePassword = 'strongPas$!123';
const mockInvalidPassword = 'strongPas$!123|';

const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'JohnDoe@thebest.john.intheworld.com',
  tokenId: 'mock_tokenId',
  tokenCode: 'mock_tokenCode',
  password: mockSecurePassword,
  passwordconf: mockSecurePassword,
};

class MockRoutingService {
  go = vi.fn();
}

class MockFormComponentService
  implements Partial<RegistrationVerificationTokenFormComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl(),
    tokenCode: new UntypedFormControl(),
  });
  isUpdating$ = new BehaviorSubject(false);
  createVerificationToken = vi
    .fn()
    .mockReturnValue(of({ tokenId: 'testTokenId', expiresIn: '300' }));
  displayMessage: any = vi.fn('displayMessage').mockImplementation(() => {});
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe = vi.fn().mockImplementation(() => {});
}

class MockRegistrationVerificationTokenFormComponentService
  implements Partial<RegistrationVerificationTokenFormComponentService>
{
  postRegisterMessage = vi.fn();
  displayMessage = vi.fn();
}

class MockGlobalMessageService {
  add = vi.fn();
  remove = vi.fn();
  get() {
    return EMPTY;
  }
}

describe('RegistrationVerificationTokenFormComponent', () => {
  let component: RegistrationVerificationTokenFormComponent;
  let fixture: ComponentFixture<RegistrationVerificationTokenFormComponent>;
  let service: RegistrationVerificationTokenFormComponentService;
  let launchDialogService: LaunchDialogService;
  let authConfigService: AuthConfigService;
  let el: DebugElement;
  let routingService: RoutingService;
  let featureToggles: FeatureToggles;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        FormErrorsModule,
        SpinnerModule,
        RegistrationVerificationTokenFormComponent,
      ],
      providers: [
        {
          provide: RegistrationVerificationTokenFormComponentService,
          useClass: MockFormComponentService,
        },
        {
          provide: LaunchDialogService,
          useClass: MockLaunchDialogService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: RegistrationVerificationTokenFormComponentService,
          useClass: MockRegistrationVerificationTokenFormComponentService,
        },
        { provide: TranslationService, useClass: MockTranslationService },
        ChangeDetectorRef,
      ],
    })
      .overrideComponent(RegistrationVerificationTokenFormComponent, {
        remove: { imports: [TranslatePipe, UrlPipe] },
        add: { imports: [MockTranslatePipe, MockUrlPipe] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      RegistrationVerificationTokenFormComponent
    );
    service = TestBed.inject(RegistrationVerificationTokenFormComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    authConfigService = TestBed.inject(AuthConfigService);
    routingService = TestBed.inject(RoutingService);
    featureToggles = TestBed.inject(FeatureToggles);
    featureToggles.useEnhancedSecurePasswordValidators = false;
    featureToggles.authorizationCodeFlowByDefault = false;

    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
    history.pushState(
      {
        tokenId: 'mock_tokenId',
        loginId: 'JohnDoe@thebest.john.intheworld.com',
        titleCode: 'Mr',
        firstName: 'John',
        lastName: 'Doe',
      },
      ''
    );
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  describe('register', () => {
    it('should call onSubmit() method on submit', () => {
      const request = vi.spyOn(component, 'onSubmit');
      const form = el.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      expect(request).toHaveBeenCalled();
    });

    it('should display send verification token sucessful message when history state is valid', () => {
      vi.spyOn(component, 'startWaitTimeInterval');
      component.ngOnInit();
      expect(component.startWaitTimeInterval).toHaveBeenCalled();
      expect(service.displayMessage).toHaveBeenCalledWith(
        'verificationTokenForm.createVerificationToken',
        { target: 'JohnDoe@thebest.john.intheworld.com' }
      );
    });

    it('should register with valid form', () => {
      service.register = vi.fn().mockReturnValue(of(mockRegisterFormData));
      component.registerForm.patchValue(mockRegisterFormData);
      component.ngOnInit();
      component.onSubmit();
      expect(service.register).toHaveBeenCalledWith({
        firstName: mockRegisterFormData.firstName,
        lastName: mockRegisterFormData.lastName,
        uid: mockRegisterFormData.email.toLowerCase(),
        password: mockRegisterFormData.password,
        titleCode: mockRegisterFormData.titleCode,
        verificationTokenId: mockRegisterFormData.tokenId,
        verificationTokenCode: mockRegisterFormData.tokenCode,
      });
    });

    it('should not register with invalid form', () => {
      service.register = vi.fn();
      component.ngOnInit();
      component.onSubmit();
      expect(service.register).not.toHaveBeenCalled();
    });

    it('should not redirect in different flow that ResourceOwnerPasswordFlow', () => {
      service.register = vi.fn().mockReturnValue(of(mockRegisterFormData));
      vi.spyOn(authConfigService, 'getOAuthFlow').mockReturnValue(
        OAuthFlow.ImplicitFlow
      );
      component.ngOnInit();
      component.registerUserWithVerificationToken();

      expect(service.postRegisterMessage).toHaveBeenCalled();
    });

    it('should redirect in different flow that ResourceOwnerPasswordFlow', () => {
      service.register = vi.fn().mockReturnValue(of(mockRegisterFormData));
      vi.spyOn(authConfigService, 'getOAuthFlow').mockReturnValue(
        OAuthFlow.ResourceOwnerPasswordFlow
      );
      component.ngOnInit();
      component.registerUserWithVerificationToken();
      expect(routingService.go).toHaveBeenCalled();
    });

    it('should display error message when input invalid code', () => {
      const httpErrorResponse = new HttpErrorResponse({
        status: 400,
      });
      service.register = vi
        .fn()
        .mockReturnValue(throwError(() => httpErrorResponse));
      component.registerForm.patchValue(mockRegisterFormData);
      component.ngOnInit();
      component.onSubmit();
      const errorMessageElement =
        fixture.nativeElement.querySelector('cx-form-errors');
      expect(errorMessageElement).toBeTruthy();
    });

    it('should display info dialog', () => {
      component.openInfoDailog();
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should display info dialog when keydown', () => {
      const event = {
        key: 'Enter',
        preventDefault: () => {},
      };
      component.onOpenInfoDailogKeyDown(event as KeyboardEvent);
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should enable the submit button', () => {
      component.registerForm.enable();
      fixture.detectChanges();
      const submitBtn = el.query(By.css('button'));
      expect(submitBtn.nativeElement.disabled).toBeFalsy();
    });

    it('should resend OTP', () => {
      component.target = 'example@example.com';
      vi.spyOn(component, 'startWaitTimeInterval');
      vi.spyOn(
        component,
        'createRegistrationVerificationToken'
      ).mockReturnValue(of({ tokenId: 'mock_tokenId', expiresIn: '300' }));

      component.resendOTP();

      expect(component.isResendDisabled).toBe(true);
      expect(component.waitTime).toBe(60);
      expect(component.startWaitTimeInterval).toHaveBeenCalled();
      expect(component.createRegistrationVerificationToken).toHaveBeenCalled();
      expect(service.displayMessage).toHaveBeenCalledWith(
        'verificationTokenForm.createVerificationToken',
        { target: 'example@example.com' }
      );
    });

    it('should display error message when create verification token up to rate limit', () => {
      history.pushState(
        {
          tokenId: '',
          loginId: 'JohnDoe@thebest.john.intheworld.com',
          titleCode: 'Mr',
          firstName: 'John',
          lastName: 'Doe',
          errorStatus: 400,
        },
        ''
      );

      component.ngOnInit();
      fixture.detectChanges();
      fixture.whenStable();
      expect(component.upToRateLimit).toBe(true);
      component.waitTimeForRateLimit = 300;
      const errorMessageElement = fixture.debugElement.queryAll(
        By.css('.rate-limit-error-display')
      );
      expect(errorMessageElement).toBeTruthy();
    });
  });

  describe('password validators', () => {
    describe('when useEnhancedSecurePasswordValidators is enabled', () => {
      beforeEach(() => {
        featureToggles.useEnhancedSecurePasswordValidators = true;
      });

      it('should include new cxMustEndWithLegalCharacter validator', () => {
        fixture = TestBed.createComponent(
          RegistrationVerificationTokenFormComponent
        );
        component = fixture.componentInstance;
        fixture.detectChanges();

        const passwordControl = component.registerForm.get(
          'password'
        ) as UntypedFormControl;
        const validations = {
          whenEmpty: passwordControl.validator?.({} as any),
          whenNotEmptyAndInvalid: passwordControl.validator?.({
            value: mockInvalidPassword,
          } as any),
          whenNotEmpty: passwordControl.validator?.({
            value: mockSecurePassword,
          } as any),
        };

        expect(passwordControl).toBeTruthy();
        expect(validations.whenEmpty).toEqual({
          required: true,
          cxMinOneDigit: true,
          cxMinOneSpecialCharacter: true,
          cxMinOneUpperCaseCharacter: true,
          cxMinEightCharactersLength: true,
          cxMaxCharactersLength: true,
          cxMustEndWithLegalCharacter: true,
        });
        expect(validations.whenNotEmptyAndInvalid).toEqual({
          cxMustEndWithLegalCharacter: true,
        });
        expect(validations.whenNotEmpty).toEqual(null);
      });
    });
  });
});
