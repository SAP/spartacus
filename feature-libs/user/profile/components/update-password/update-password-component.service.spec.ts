import { TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {
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

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  update = createSpy().and.returnValue(of({}));
}

class MockRoutingService {
  go = createSpy().and.stub();
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}

describe('UpdatePasswordComponentService', () => {
  let service: UpdatePasswordComponentService;
  let userService: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdatePasswordComponentService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: UserPasswordFacade,
          useClass: MockUserPasswordService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(UpdatePasswordComponentService);
    routingService = TestBed.inject(RoutingService);
    userService = TestBed.inject(UserPasswordFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);

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
      expect(result).toBeFalse;
      expect(service.form.disabled).toBeFalse();
    });
  });

  describe('save', () => {
    describe('success', () => {
      beforeEach(() => {
        oldPassword.setValue('Old123!');
        newPassword.setValue('New123!');
        newPasswordConfirm.setValue('New123!');
      });

      it('should update password', () => {
        service.updatePassword();
        expect(userService.update).toHaveBeenCalledWith('Old123!', 'New123!');
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

      it('should reroute to the login page', () => {
        service.updatePassword();

        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
      });

      it('reset()', () => {
        spyOn(service.form, 'reset').and.callThrough();
        service.updatePassword();
        expect(service.form.reset).toHaveBeenCalled();
      });
    });

    describe('error', () => {
      it('should not save invalid email', () => {
        newPassword.setValue('diff@sap.com');
        service.updatePassword();
        expect(userService.update).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });
  });
});
