import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {
  AuthRedirectService,
  AuthService,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { UpdatePasswordComponentService } from './update-password-component.service';
import createSpy = jasmine.createSpy;

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  update = createSpy().and.returnValue(of({}));
}

class MockRoutingService implements Partial<RoutingService> {
  go = createSpy();
  getUrl = createSpy().and.returnValue('');
}

class MockGlobalMessageService implements Partial<GlobalMessageService> {
  add = createSpy();
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = createSpy();
}

class MockAuthService implements Partial<AuthService> {
  coreLogout = createSpy().and.returnValue(Promise.resolve());
}

describe('UpdatePasswordComponentService', () => {
  let service: UpdatePasswordComponentService;
  let userPasswordFacade: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let authRedirectService: AuthRedirectService;
  let authService: AuthService;

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
      expect(result).toBeTrue();
      expect(service.form.disabled).toBeTrue();
    });

    it('should return false', () => {
      service['busy$'].next(false);
      let result;
      service.isUpdating$.subscribe((value) => (result = value)).unsubscribe();
      expect(result).toBeFalse();
      expect(service.form.disabled).toBeFalse();
    });
  });

  describe('updatePassword', () => {
    describe('success', () => {
      beforeEach(() => {
        oldPassword.setValue('Old123!');
        newPassword.setValue('New123!');
        newPasswordConfirm.setValue('New123!');
      });

      it('should update password', () => {
        service.updatePassword();
        expect(userPasswordFacade.update).toHaveBeenCalledWith(
          'Old123!',
          'New123!'
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

      it('should reroute to the login page', fakeAsync(() => {
        service.updatePassword();

        tick();
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      }));

      it('should reset the form', () => {
        spyOn(service.form, 'reset').and.callThrough();
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
        newPassword.setValue('testpassword123');
        service.updatePassword();
        expect(userPasswordFacade.update).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
      });
    });
  });
});
