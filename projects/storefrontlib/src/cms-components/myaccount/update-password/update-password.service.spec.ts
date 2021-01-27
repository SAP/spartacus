import { ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { async, TestBed } from '@angular/core/testing';

import { NavigationExtras } from '@angular/router';
import { FormErrorsModule, UpdatePasswordService } from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import {
  GlobalMessage,
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  RoutingService,
  UrlCommands,
  UserService,
  User,
} from '@spartacus/core';

class MockUserService {
  get(): Observable<User> {
    return of();
  }
  updatePassword(): void {}
  resetUpdatePasswordProcessState(): void {}
  getUpdatePasswordResultLoading(): Observable<boolean> {
    return of(true);
  }
  getUpdatePasswordResultSuccess(): Observable<boolean> {
    return of();
  }
  getUpdatePasswordResultError(): Observable<boolean> {
    return of();
  }
}
class MockRoutingService {
  go(
    _commands: any[] | UrlCommands,
    _query?: object,
    _extras?: NavigationExtras
  ): void {}
}
class GlobalMessageServiceMock {
  add(_message: GlobalMessage): void {}
}

fdescribe('UpdatePasswordService', () => {
  let service: UpdatePasswordService;
  let userService: UserService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let oldPassword: AbstractControl;
  let newPassword: AbstractControl;
  let newPasswordConfirm: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [],
      providers: [
        UpdatePasswordService,
        { provide: UserService, useClass: MockUserService },
        { provide: RoutingService, useClass: MockRoutingService },
        { provide: GlobalMessageService, useClass: GlobalMessageServiceMock },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(UpdatePasswordService);

    userService = TestBed.inject(UserService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    oldPassword = service.form.controls.oldPassword;
    newPassword = service.form.controls.newPassword;
    newPasswordConfirm = service.form.controls.newPasswordConfirm;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('UserService Calls', () => {
    it('should call resetUpdatePasswordProcessState', () => {
      spyOn(userService, 'resetUpdatePasswordProcessState').and.stub();

      service.reset();
      expect(userService.resetUpdatePasswordProcessState).toHaveBeenCalled();
    });

    it('should call getUpdatePasswordResultLoading', () => {
      spyOn(userService, 'getUpdatePasswordResultLoading').and.returnValue(
        of(true)
      );

      service.isUpdating$.subscribe((isUpdating) => {
        expect(isUpdating).toBeTruthy();
      });
    });
  });

  it('onFormSubmit should userService.updatePassword', () => {
    spyOn(userService, 'updatePassword').and.stub();
    oldPassword.setValue('Qwe123!');
    newPassword.setValue('Qwe1234!');
    newPasswordConfirm.setValue('Qwe1234!');

    service.save();
    expect(userService.updatePassword).toHaveBeenCalledWith(
      'Qwe123!',
      'Qwe1234!'
    );
  });

  it('onSuccess show message', () => {
    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'add').and.stub();

    service['onSuccess']();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'updatePasswordForm.passwordUpdateSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );
  });
});
