/*
 * SPDX-FileCopyrightText: 2025 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */
import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  FeatureConfigService,
  GlobalMessageService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  FormErrorsModule,
  LaunchDialogService,
  SpinnerModule,
} from '@spartacus/storefront';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import createSpy = jasmine.createSpy;
import { RegistrationVerificationTokenFormComponentService } from './verify-register-verification-token-form.service';
import { RegistrationVerificationTokenFormComponent } from './verify-register-verification-token-form.component';
import { By } from '@angular/platform-browser';

const mockRegisterFormData: any = {
  titleCode: 'Mr',
  firstName: 'John',
  lastName: 'Doe',
  email: 'JohnDoe@thebest.john.intheworld.com',
  tokenId: 'mock_tokenId',
  tokenCode: 'mock_tokenCode',
  password: 'strongPass$!123',
  passwordconf: 'strongPass$!123',
};

class MockRoutingService {
  go = createSpy();
}

class MockFormComponentService
  implements Partial<RegistrationVerificationTokenFormComponentService>
{
  form: UntypedFormGroup = new UntypedFormGroup({
    tokenId: new UntypedFormControl(),
    tokenCode: new UntypedFormControl(),
  });
  isUpdating$ = new BehaviorSubject(false);
  register = createSpy().and.stub();
  createVerificationToken = createSpy().and.returnValue(
    of({ tokenId: 'testTokenId', expiresIn: '300' })
  );
  displayMessage = createSpy('displayMessage').and.stub();
}
@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  openDialogAndSubscribe = createSpy().and.stub();
}

class MockRegistrationVerificationTokenFormComponentService
  implements Partial<RegistrationVerificationTokenFormComponentService>
{
  register = createSpy().and.returnValue(of(mockRegisterFormData));
  postRegisterMessage = createSpy();
  displayMessage = createSpy();
}

class MockGlobalMessageService {
  add = createSpy();
  remove = createSpy();
  get() {
    return EMPTY;
  }
}

describe('RegistrationVerificationTokenFormComponent', () => {
  let component: RegistrationVerificationTokenFormComponent;
  let fixture: ComponentFixture<RegistrationVerificationTokenFormComponent>;
  let service: RegistrationVerificationTokenFormComponentService;
  let launchDialogService: LaunchDialogService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        I18nTestingModule,
        FormErrorsModule,
        SpinnerModule,
      ],
      declarations: [RegistrationVerificationTokenFormComponent, MockUrlPipe],
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
        ChangeDetectorRef,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      RegistrationVerificationTokenFormComponent
    );
    service = TestBed.inject(RegistrationVerificationTokenFormComponentService);
    launchDialogService = TestBed.inject(LaunchDialogService);
    component = fixture.componentInstance;
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
    it('should register with valid form', () => {
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

    it('should not register with valid form', () => {
      component.ngOnInit();
      component.onSubmit();
      expect(service.register).not.toHaveBeenCalled();
    });

    it('should display info dialog', () => {
      component.openInfoDailog();
      expect(launchDialogService.openDialogAndSubscribe).toHaveBeenCalled();
    });

    it('should resend OTP', () => {
      component.target = 'example@example.com';
      spyOn(component, 'startWaitTimeInterval');
      spyOn(component, 'createRegistrationVerificationToken').and.returnValue(
        of({ tokenId: 'mock_tokenId', expiresIn: '300' })
      );

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

    it('should diplay error message when creat verification token up to rate limit', () => {
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
    let featureConfigService: FeatureConfigService;

    it('should have new validators when feature flag is enabled', () => {
      featureConfigService = TestBed.inject(FeatureConfigService);
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);

      fixture = TestBed.createComponent(
        RegistrationVerificationTokenFormComponent
      );
      component = fixture.componentInstance;

      fixture.detectChanges();

      const passwordControl = component.registerForm.get(
        'password'
      ) as UntypedFormControl;
      const validators = passwordControl.validator
        ? passwordControl.validator({} as any)
        : [];

      expect(passwordControl).toBeTruthy();
      expect(validators).toEqual({
        required: true,
        cxMinOneDigit: true,
        cxMinOneSpecialCharacter: true,
        cxMinOneUpperCaseCharacter: true,
        cxMinEightCharactersLength: true,
        cxMaxCharactersLength: true,
      });
    });

    it('should have old validators when feature flag is not enabled', () => {
      featureConfigService = TestBed.inject(FeatureConfigService);
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);

      fixture = TestBed.createComponent(
        RegistrationVerificationTokenFormComponent
      );
      component = fixture.componentInstance;

      fixture.detectChanges();

      const passwordControl = component.registerForm.get(
        'password'
      ) as UntypedFormControl;
      const validators = passwordControl.validator
        ? passwordControl.validator({} as any)
        : [];

      expect(passwordControl).toBeTruthy();
      expect(validators).toEqual({
        cxMinOneDigit: true,
        cxMinOneSpecialCharacter: true,
        cxMinOneUpperCaseCharacter: true,
        cxMinSixCharactersLength: true,
        required: true,
      });
    });
  });
});
