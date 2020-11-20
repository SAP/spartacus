import { async, TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import {
  AuthService,
  GlobalMessage,
  GlobalMessageService, GlobalMessageType, I18nTestingModule,
  RoutingService,
  UrlCommands,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UpdateEmailService } from './update-email.service';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { FormErrorsModule } from '@spartacus/storefront';



class MockUserService {
  updateEmail(): void {}
  resetUpdateEmailResultState(): void {}
  getUpdateEmailResultLoading(): Observable<boolean> {
    return of(true);
  }
  getUpdateEmailResultSuccess(): Observable<boolean> {
    return of();
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

describe('UpdateEmailService', () => {
  let service: UpdateEmailService;
  let userService: UserService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let newUid: AbstractControl;
  let confirmNewUid: AbstractControl;
  let password: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      declarations: [],
      providers: [
        UpdateEmailService,
        {
          provide: UserService,
          useClass: MockUserService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.inject(UpdateEmailService);

    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    routingService = TestBed.inject(RoutingService);
    globalMessageService = TestBed.inject(GlobalMessageService);

    newUid = service.form.controls.email;
    confirmNewUid = service.form.controls.confirmEmail;
    password = service.form.controls.password;
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('UserService Calls', () => {
    it('should call resetUpdateEmailResultState', () => {
      spyOn(userService, 'resetUpdateEmailResultState').and.stub();

      service.resetUpdateEmailResultState();
      expect(userService.resetUpdateEmailResultState).toHaveBeenCalled();
    });

    it('should call getUpdateEmailResultLoading', () => {
      spyOn(userService, 'getUpdateEmailResultLoading').and.returnValue(of(true));

      service.getUpdateEmailResultLoading();
      expect(userService.getUpdateEmailResultLoading).toHaveBeenCalled();
    });
  });

  it('onFormSubmit should userService.updateEmail', () => {
    spyOn(userService, 'updateEmail').and.stub();
    newUid.setValue('tester@sap.com');
    confirmNewUid.setValue('tester@sap.com');
    password.setValue('Qwe123!');

    service.onFormSubmit();
    expect(userService.updateEmail).toHaveBeenCalledWith('Qwe123!','tester@sap.com');
  });

  it('onSuccess show message, logout and reroute', async () => {
    spyOn(authService, 'coreLogout').and.stub();
    spyOn(routingService, 'go').and.stub();
    spyOn(globalMessageService, 'add').and.stub();
    service['newUid'] = 'new@sap.com';

    service['onSuccess'](true);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid: 'new@sap.com' },
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    await expect(authService.coreLogout).toHaveBeenCalled();

    expect(routingService.go).toHaveBeenCalledWith(
      {cxRoute: 'login'},
      null,
      {
        state: {
          newUid: 'new@sap.com',
        },
      }
    );
  });
});
