import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  FeatureToggles,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';

const mockSecurePassword = 'strongPas$!123';
const mockInvalidPassword = 'strongPas$!123|';

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  update = vi.fn().mockReturnValue(of({}));
}

class MockRoutingService implements Partial<RoutingService> {
  go = vi.fn();
  getUrl = vi.fn().mockReturnValue('');
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = vi.fn();
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = vi.fn();
}

class MockAuthService implements Partial<AuthService> {
  coreLogout = vi.fn().mockReturnValue(Promise.resolve());
}

describe('UpdatePasswordComponentService', () => {
  let service: UpdatePasswordComponentService;
  let userPasswordFacade: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;
  let authService: AuthService;
  let featureToggles: FeatureToggles;

  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdatePasswordComponentService,
        {
          provide: UserPasswordFacade,
          useClass: MockUserPasswordFacade,
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
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    featureToggles = TestBed.inject(FeatureToggles);
    featureToggles.useEnhancedSecurePasswordValidators = true;

    service = TestBed.inject(UpdatePasswordComponentService);
    userPasswordFacade = TestBed.inject(UserPasswordFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);
    authService = TestBed.inject(AuthService);

    oldPassword = service.form.controls.oldPassword;
    newPassword = service.form.controls.newPassword;
    newPasswordConfirm = service.form.controls.newPasswordConfirm;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('isUpdating$', () => {
    it('should return true', () => {
      service['busy$'].next(true);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBeTruthy();
      expect(service.form.disabled).toBeTruthy();
    });

    it('should return false', () => {
      service['busy$'].next(false);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBeFalsy();
      expect(service.form.disabled).toBeFalsy();
    });
  });

  describe('updatePassword', () => {
    describe('success', () => {
      beforeEach(() => {
        oldPassword.setValue('OldPas123!');
        newPassword.setValue('NewPas123!');
        newPasswordConfirm.setValue('NewPas123!');
      });

      it('should update password', () => {
        service.updatePassword();
        expect(userPasswordFacade.update).toHaveBeenCalledWith(
          'OldPas123!',
          'NewPas123!'
        );
      });

      it('should show message', () => {
        service.updatePassword();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'updatePasswordForm.passwordUpdateSuccess',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('should reroute to the login page', async () => {
        vi.useFakeTimers();
        service.updatePassword();

        await vi.advanceTimersByTimeAsync(0);
        vi.useRealTimers();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      });

      it('should reset the form', () => {
        vi.spyOn(service.form, 'reset');
        service.updatePassword();
        expect(service.form.reset).toHaveBeenCalled();
      });

      it('should call logout', () => {
        service.updatePassword();

        expect(authService.coreLogout).toHaveBeenCalled();
      });

      it('should set the redirect url to homepage', () => {
        service.updatePassword();

        expect(authRedirectService.setRedirectUrl).toHaveBeenCalledWith(
          routingService.getUrl({ cxRoute: 'home' })
        );
      });
    });

    describe('error', () => {
      it('should not update the password', () => {
        newPassword.setValue(mockInvalidPassword);
        service.updatePassword();
        expect(userPasswordFacade.update).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
      });
    });

    describe('password validators', () => {
      it('should validate password ends with legal character when useEnhancedSecurePasswordValidators is enabled', () => {
        const newPasswordControl = service.form.get(
          'newPassword'
        ) as UntypedFormControl;
        const validations = {
          whenEmpty: newPasswordControl.validator?.({} as any),
          whenNotEmptyAndInvalid: newPasswordControl.validator?.({
            value: mockInvalidPassword,
          } as any),
          whenNotEmpty: newPasswordControl.validator?.({
            value: mockSecurePassword,
          } as any),
        };

        expect(newPasswordControl).toBeTruthy();
        expect(validations.whenEmpty).toEqual({
          required: true,
          cxMinOneDigit: true,
          cxMinOneUpperCaseCharacter: true,
          cxMinOneSpecialCharacter: true,
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

  describe('onError', () => {
    it('should handle AccessDeniedError', () => {
      const httpError = new HttpErrorModel();
      httpError.details = [{ type: 'AccessDeniedError' }];

      service['onError'](httpError);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'updatePasswordForm.accessDeniedError',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should not show AccessDeniedError', () => {
      const httpError = new HttpErrorModel();

      service['onError'](httpError);

      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });
});
