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
import createSpy = jasmine.createSpy;

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  update = createSpy().and.returnValue(of({}));
}

class MockRoutingService {
  go = createSpy().and.stub();
  getUrl = createSpy().and.returnValue('');
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}
class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = createSpy();
}

class MockAuthService implements Partial<AuthService> {
  coreLogout = createSpy().and.returnValue(Promise.resolve());
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
        oldPassword.setValue('Old123!');
        newPassword.setValue('New123!');
        newPasswordConfirm.setValue('New123!');
        cdcJsService.updateUserPasswordWithoutScreenSet =
          createSpy().and.returnValue(of({ status: 'OK' }));
        TestBed.compileComponents();
      });

      it('should update password', () => {
        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(
          cdcJsService.updateUserPasswordWithoutScreenSet
        ).toHaveBeenCalledWith('Old123!', 'New123!');
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
        spyOn(service.form, 'reset').and.callThrough();
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
        cdcJsService.updateUserPasswordWithoutScreenSet =
          createSpy().and.returnValue(
            throwError({ status: 'ERROR', errorDetails: 'Error occured' })
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

      it('should not update the password or logout the user if CDC invocation fails', (done) => {
        oldPassword.setValue('Old123!');
        newPassword.setValue('New123!');
        newPasswordConfirm.setValue('New123!');

        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          'Error occured',
          GlobalMessageType.MSG_TYPE_ERROR
        );
        done();
      });
    });
  });
});
