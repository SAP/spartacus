import { TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import {
  AuthService,
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  UrlCommands,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserPasswordFacade } from '@spartacus/user/profile/root';
import { Observable, of } from 'rxjs';
import { UpdatePasswordService } from './update-password.service';

class MockUserPasswordService implements Partial<UserPasswordFacade> {
  update(_password: string, _newUid: string): Observable<unknown> {
    return of({});
  }
}

class MockAuthService {
  coreLogout() {
    return Promise.resolve();
  }
}

class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class MockGlobalMessageService {
  add(_message: GlobalMessage): void {}
}

describe('UpdatePasswordService', () => {
  let service: UpdatePasswordService;
  let userService: UserPasswordFacade;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdatePasswordService,
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
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(UpdatePasswordService);

    routingService = TestBed.inject(RoutingService);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserPasswordFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);

    oldPassword = service.form.controls.oldPassword;
    newPassword = service.form.controls.newPassword;
    newPasswordConfirm = service.form.controls.newPasswordConfirm;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('reset()', () => {
    spyOn(service.form, 'reset').and.callThrough();
    service.reset();

    expect(service.form.reset).toHaveBeenCalled();
  });

  describe('save', () => {
    beforeEach(() => {
      spyOn(userService, 'update').and.callThrough();
      spyOn(globalMessageService, 'add').and.stub();
      spyOn(authService, 'coreLogout').and.callThrough();
      spyOn(routingService, 'go').and.stub();
      oldPassword.setValue('Old123!');
      newPassword.setValue('New123!');
      newPasswordConfirm.setValue('New123!');
    });

    it('should not save invalid email', () => {
      newPassword.setValue('diff@sap.com');
      service.update();
      expect(userService.update).not.toHaveBeenCalled();
      expect(globalMessageService.add).not.toHaveBeenCalled();
      expect(authService.coreLogout).not.toHaveBeenCalled();
      expect(routingService.go).not.toHaveBeenCalled();
    });

    it('should update password', () => {
      service.update();
      expect(userService.update).toHaveBeenCalledWith('Old123!', 'New123!');
    });

    it('should show message', () => {
      service.update();
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'updatePasswordForm.passwordUpdateSuccess',
        },
        GlobalMessageType.MSG_TYPE_CONFIRMATION
      );
    });

    it('should reroute to the login page', () => {
      service.update();

      expect(routingService.go).toHaveBeenCalledWith({ cxRoute: 'home' });
    });
  });
});
