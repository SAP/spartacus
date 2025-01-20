import { TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import {
  FeatureConfigService,
  FeaturesConfigModule,
  GlobalMessageService,
  GlobalMessageType,
  HttpErrorModel,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import {
  CustomFormValidators,
  FormErrorsModule,
  PasswordVisibilityToggleModule,
} from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';
import createSpy = jasmine.createSpy;

const resetToken = '123#Token';
const routerState$: BehaviorSubject<any> = new BehaviorSubject({
  state: {
    queryParams: {
      token: resetToken,
    },
  },
});

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  reset() {
    return of({});
  }
}

class MockRoutingService {
  go = createSpy().and.stub();

  getRouterState() {
    return routerState$;
  }
}

class MockGlobalMessageService {
  add = createSpy().and.stub();
}

describe('ResetPasswordComponentService', () => {
  let service: ResetPasswordComponentService;
  let userPasswordService: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let passwordConfirm: AbstractControl;
  let password: AbstractControl;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        FormErrorsModule,
        PasswordVisibilityToggleModule,
        FeaturesConfigModule,
      ],
      providers: [
        ResetPasswordComponentService,
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
      ],
    }).compileComponents();
  });
  describe(' - ', () => {
    beforeEach(() => {
      featureConfigService = TestBed.inject(FeatureConfigService);
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);

      service = TestBed.inject(ResetPasswordComponentService);

      userPasswordService = TestBed.inject(UserPasswordFacade);
      routingService = TestBed.inject(RoutingService);
      globalMessageService = TestBed.inject(GlobalMessageService);

      password = service.form.controls.password;
      passwordConfirm = service.form.controls.passwordConfirm;
    });

    it('should create', () => {
      expect(service).toBeTruthy();
    });

    describe('isUpdating$', () => {
      it('should return true', () => {
        service['busy$'].next(true);
        let result;
        service.isUpdating$
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBeTruthy();
        expect(service.form.disabled).toBeTruthy();
      });

      it('should return false', () => {
        service['busy$'].next(false);
        let result;
        service.isUpdating$
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBeFalsy();
        expect(service.form.disabled).toBeFalsy();
      });
    });

    describe('resetToken$', () => {
      it('should return token', () => {
        let result;
        service.resetToken$
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toEqual(resetToken);
      });

      it('should not return token', () => {
        routerState$.next({
          state: {
            queryParams: {},
          },
        });
        let result;
        service.resetToken$
          .subscribe((value) => (result = value))
          .unsubscribe();
        expect(result).toBeFalsy();
      });
    });

    describe('reset', () => {
      describe('success', () => {
        beforeEach(() => {
          password.setValue('QwePas123!');
          passwordConfirm.setValue('QwePas123!');
        });

        it('should reset password', () => {
          spyOn(userPasswordService, 'reset').and.callThrough();
          service.resetPassword(resetToken);
          expect(userPasswordService.reset).toHaveBeenCalledWith(
            resetToken,
            'QwePas123!'
          );
        });

        it('should show message', () => {
          service.resetPassword(resetToken);
          expect(globalMessageService.add).toHaveBeenCalledWith(
            { key: 'forgottenPassword.passwordResetSuccess' },
            GlobalMessageType.MSG_TYPE_CONFIRMATION
          );
        });

        it('should reroute to the login page', () => {
          service.resetPassword(resetToken);
          expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
        });

        it('should reset form', () => {
          spyOn(service.form, 'reset').and.callThrough();
          service.resetPassword(resetToken);
          expect(service.form.reset).toHaveBeenCalled();
        });
      });

      describe('error', () => {
        describe('valid form', () => {
          beforeEach(() => {
            password.setValue('QwePas123!');
            passwordConfirm.setValue('QwePas123!');
          });

          it('should show error message', () => {
            const error = new HttpErrorModel();
            error.details = [{ message: 'error message' }];
            spyOn(userPasswordService, 'reset').and.returnValue(
              throwError(() => error)
            );
            service.resetPassword(resetToken);
            expect(globalMessageService.add).toHaveBeenCalledWith(
              { raw: 'error message' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          });

          it('should not show error message when error is null', () => {
            spyOn(userPasswordService, 'reset').and.returnValue(
              throwError(() => null)
            );
            service.resetPassword(resetToken);
            expect(globalMessageService.add).not.toHaveBeenCalled();
          });

          it('should not display an error message when HttpErrorModel has no details', () => {
            spyOn(userPasswordService, 'reset').and.returnValue(
              throwError(() => new HttpErrorModel())
            );
            service.resetPassword(resetToken);
            expect(globalMessageService.add).not.toHaveBeenCalled();
          });
        });
      });

      it('should not reset invalid form', () => {
        spyOn(userPasswordService, 'reset').and.returnValue(
          throwError(() => ({}))
        );
        passwordConfirm.setValue('Diff123!');
        service.resetPassword(resetToken);
        expect(userPasswordService.reset).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });
  });
  describe('password validators', () => {
    let passwordControl: UntypedFormControl;

    describe('when formErrorsDescriptiveMessages are enabled', () => {
      beforePasswordValidatorCase([
        'formErrorsDescriptiveMessages',
        'enableSecurePasswordValidation',
      ]);

      it('should use securePasswordValidators', () => {
        expect(passwordControl).toBeTruthy();
        expect((service as any).passwordValidators).toEqual(
          CustomFormValidators.securePasswordValidators
        );
      });
    });

    describe('when formErrorsDescriptiveMessages and enableConsecutiveCharactersPasswordRequirement are enabled', () => {
      beforePasswordValidatorCase([
        'formErrorsDescriptiveMessages',
        'enableConsecutiveCharactersPasswordRequirement',
      ]);

      it('should use passwordValidators with noConsecutiveCharacters', () => {
        expect((service as any).passwordValidators).toEqual([
          ...CustomFormValidators.passwordValidators,
          CustomFormValidators.noConsecutiveCharacters,
        ]);
      });
    });

    describe('when only formErrorsDescriptiveMessages is enabled', () => {
      beforePasswordValidatorCase(['formErrorsDescriptiveMessages']);

      it('should use passwordValidators', () => {
        expect(passwordControl).toBeTruthy();
        expect((service as any).passwordValidators).toEqual(
          CustomFormValidators.passwordValidators
        );
      });
    });

    describe('when only enableSecurePasswordValidation is enabled', () => {
      beforePasswordValidatorCase(['enableSecurePasswordValidation']);

      it('should use securePasswordValidator', () => {
        expect(passwordControl).toBeTruthy();

        expect((service as any).passwordValidators).toEqual([
          CustomFormValidators.securePasswordValidator,
        ]);
      });
    });

    describe('when only enableConsecutiveCharactersPasswordRequirement is enabled', () => {
      beforePasswordValidatorCase([
        'enableConsecutiveCharactersPasswordRequirement',
      ]);

      it('should use strongPasswordValidator', () => {
        expect(passwordControl).toBeTruthy();

        expect((service as any).passwordValidators).toEqual([
          CustomFormValidators.strongPasswordValidator,
        ]);
      });
    });

    describe('when no feature flags are enabled', () => {
      beforePasswordValidatorCase([]);

      it('should use passwordValidator', () => {
        expect(passwordControl).toBeTruthy();
        expect((service as any).passwordValidators).toEqual([
          CustomFormValidators.passwordValidator,
        ]);
      });
    });

    function beforePasswordValidatorCase(featuresEnabled: string[]) {
      beforeEach(() => {
        featureConfigService = TestBed.inject(FeatureConfigService);
        spyOn(featureConfigService, 'isEnabled').and.callFake(
          (flag: string) => {
            return featuresEnabled.includes(flag);
          }
        );

        service = TestBed.inject(ResetPasswordComponentService);
        passwordControl = service.form.get('password') as UntypedFormControl;

        userPasswordService = TestBed.inject(UserPasswordFacade);
        routingService = TestBed.inject(RoutingService);
        globalMessageService = TestBed.inject(GlobalMessageService);
      });
    }
  });
});
