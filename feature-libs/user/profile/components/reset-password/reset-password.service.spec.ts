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
import { ResetPasswordService } from './reset-password.service';
import createSpy = jasmine.createSpy;

const resetToken = '123#Token';

class MockUserPasswordFacade implements Partial<UserPasswordFacade> {
  reset = createSpy().and.returnValue(of({}));
}

class MockRoutingService {
  go = createSpy().and.stub();
  getRouterState = createSpy().and.returnValue(of(resetToken));
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}

describe('ResetPasswordService', () => {
  let service: ResetPasswordService;
  let userService: UserPasswordFacade;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let passwordConfirm: AbstractControl;
  let password: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        ResetPasswordService,
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

  beforeEach(() => {
    service = TestBed.inject(ResetPasswordService);

    userService = TestBed.inject(UserPasswordFacade);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    password = service.form.controls.password;
    passwordConfirm = service.form.controls.passwordConfirm;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('reset', () => {
    describe('success', () => {
      beforeEach(() => {
        password.setValue('Qwe123!');
        passwordConfirm.setValue('Qwe123!');
      });

      it('should reset password', () => {
        service.reset(resetToken);
        expect(userService.reset).toHaveBeenCalledWith(resetToken, 'Qwe123!');
      });

      it('should show message', () => {
        service.reset(resetToken);
        expect(globalMessageService.add).toHaveBeenCalledWith(
          { key: 'forgottenPassword.passwordResetSuccess' },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('should reroute to the login page', () => {
        service.reset(resetToken);
        expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'login' });
      });

      it('should reset form', () => {
        spyOn(service.form, 'reset').and.callThrough();
        service.reset(resetToken);
        expect(service.form.reset).toHaveBeenCalled();
      });
    });
    describe('error', () => {
      it('should not reset invalid form', () => {
        passwordConfirm.setValue('Diff123!');
        service.reset(resetToken);
        expect(userService.reset).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });
  });
});
