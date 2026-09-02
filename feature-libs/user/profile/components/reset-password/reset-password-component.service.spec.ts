import { vi } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {
  FeatureToggles,
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
import { BehaviorSubject, firstValueFrom, of, throwError } from 'rxjs';
import { ResetPasswordComponentService } from './reset-password-component.service';

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
  go = vi.fn().mockImplementation(() => {});

  getRouterState() {
    return routerState$;
  }
}

class MockGlobalMessageService {
  add = vi.fn().mockImplementation(() => {});
}

describe('ResetPasswordComponentService', () => {
  let service: ResetPasswordComponentService;
  let userPasswordService: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let passwordConfirm: AbstractControl;
  let password: AbstractControl;
  let featureToggles: FeatureToggles;

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
    featureToggles = TestBed.inject(FeatureToggles);
    featureToggles.useEnhancedSecurePasswordValidators = false;
  });
  describe(' - ', () => {
    beforeEach(() => {
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
      it('should return true', async () => {
        service['busy$'].next(true);
        const result = await firstValueFrom(service.isUpdating$);
        expect(result).toBeTruthy();
        expect(service.form.disabled).toBeTruthy();
      });

      it('should return false', async () => {
        service['busy$'].next(false);
        const result = await firstValueFrom(service.isUpdating$);
        expect(result).toBeFalsy();
        expect(service.form.disabled).toBeFalsy();
      });
    });

    describe('resetToken$', () => {
      it('should return token', async () => {
        const result = await firstValueFrom(service.resetToken$);
        expect(result).toEqual(resetToken);
      });

      it('should not return token', async () => {
        routerState$.next({
          state: {
            queryParams: {},
          },
        });
        const result = await firstValueFrom(service.resetToken$);
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
          vi.spyOn(userPasswordService, 'reset');
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
          vi.spyOn(service.form, 'reset');
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
            vi.spyOn(userPasswordService, 'reset').mockReturnValue(
              throwError(() => error)
            );
            service.resetPassword(resetToken);
            expect(globalMessageService.add).toHaveBeenCalledWith(
              { raw: 'error message' },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          });

          it('should not show error message when error is null', () => {
            vi.spyOn(userPasswordService, 'reset').mockReturnValue(
              throwError(() => null)
            );
            service.resetPassword(resetToken);
            expect(globalMessageService.add).not.toHaveBeenCalled();
          });

          it('should not display an error message when HttpErrorModel has no details', () => {
            vi.spyOn(userPasswordService, 'reset').mockReturnValue(
              throwError(() => new HttpErrorModel())
            );
            service.resetPassword(resetToken);
            expect(globalMessageService.add).not.toHaveBeenCalled();
          });
        });
      });

      it('should not reset invalid form', () => {
        vi.spyOn(userPasswordService, 'reset').mockReturnValue(
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
    describe('when useEnhancedSecurePasswordValidators is enabled', () => {
      beforeEach(() => {
        featureToggles.useEnhancedSecurePasswordValidators = true;
      });
      it('should include mustEndWithLegalCharacter validator', () => {
        service = TestBed.inject(ResetPasswordComponentService);
        expect((service as any).passwordValidators).toContain(
          CustomFormValidators.mustEndWithLegalCharacter
        );
      });
    });
  });
});
