import { TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CdcJsService } from '@spartacus/cdc/root';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UpdatePasswordModule } from '@spartacus/user/profile/components';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of, throwError } from 'rxjs';
import { CDCUpdatePasswordComponentService } from './cdc-update-password-component.service';

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  update = vi.fn().mockReturnValue(of({}));
}

class MockRoutingService {
  go = vi.fn().mockImplementation(() => {});
  getUrl = vi.fn().mockReturnValue('');
}
class MockGlobalMessageService {
  add = vi.fn().mockImplementation(() => {});
}
class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = vi.fn();
}

class MockAuthService implements Partial<AuthService> {
  coreLogout = vi.fn().mockReturnValue(Promise.resolve());
}

class MockCDCJsService implements Partial<CdcJsService> {}

describe('CDCUpdatePasswordComponentService', () => {
  let service: CDCUpdatePasswordComponentService;
  let userService: UserPasswordFacade;
  let globalMessageService: GlobalMessageService;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;
  let cdcJsService: CdcJsService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        I18nTestingModule,
        FormErrorsModule,
        UpdatePasswordModule,
      ],
      providers: [
        CDCUpdatePasswordComponentService,
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: MockGlobalMessageService },
        { provide: UserPasswordFacade, useClass: MockUserPasswordService },
        { provide: CdcJsService, useClass: MockCDCJsService },
        { provide: AuthRedirectService, useClass: MockAuthRedirectService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    });

    service = TestBed.inject(CDCUpdatePasswordComponentService);
    userService = TestBed.inject(UserPasswordFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    cdcJsService = TestBed.inject(CdcJsService);
    authService = TestBed.inject(AuthService);

    oldPassword = service.form.controls.oldPassword;
    newPassword = service.form.controls.newPassword;
    newPasswordConfirm = service.form.controls.newPasswordConfirm;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('save', () => {
    describe('success', () => {
      beforeEach(() => {
        oldPassword.setValue('Old1234!');
        newPassword.setValue('New1234!');
        newPasswordConfirm.setValue('New1234!');
        cdcJsService.updateUserPasswordWithoutScreenSet = vi
          .fn()
          .mockReturnValue(of({ status: 'OK' }));
        TestBed.compileComponents();
      });

      it('should update password', () => {
        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(
          cdcJsService.updateUserPasswordWithoutScreenSet
        ).toHaveBeenCalledWith('Old1234!', 'New1234!');
      });

      it('should show message', () => {
        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(
          cdcJsService.updateUserPasswordWithoutScreenSet
        ).toHaveBeenCalled();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'updatePasswordForm.passwordUpdateSuccess',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('should reset the form', () => {
        vi.spyOn(service.form, 'reset');
        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(
          cdcJsService.updateUserPasswordWithoutScreenSet
        ).toHaveBeenCalled();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });

    describe('error', () => {
      beforeEach(() => {
        cdcJsService.updateUserPasswordWithoutScreenSet = vi
          .fn()
          .mockReturnValue(
            throwError(() => ({
              status: 'ERROR',
              errorDetails: 'Error occured',
            }))
          );
        TestBed.compileComponents();
      });
      it('should not update the password', () => {
        newPassword.setValue('testpassword123');
        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(
          cdcJsService.updateUserPasswordWithoutScreenSet
        ).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
      });

      it('should not update the password or logout the user if CDC invocation fails', () => {
        oldPassword.setValue('Old1234!');
        newPassword.setValue('New1234!');
        newPasswordConfirm.setValue('New1234!');

        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          'Error occured',
          GlobalMessageType.MSG_TYPE_ERROR
        );
      });
    });
  });
});
