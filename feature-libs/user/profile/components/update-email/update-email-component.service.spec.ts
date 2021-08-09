import { TestBed, waitForAsync } from '@angular/core/testing';
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
import { UserEmailFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { UpdateEmailComponentService } from './update-email-component.service';
import createSpy = jasmine.createSpy;
class MockUserEmailService implements Partial<UserEmailFacade> {
  update = createSpy().and.returnValue(of({}));
}
class MockAuthService {
  coreLogout = createSpy().and.returnValue(Promise.resolve());
}
class MockRoutingService {
  go = createSpy().and.stub();
  getUrl = createSpy().and.returnValue('');
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}

class MockAuthRedirectService implements Partial<AuthRedirectService> {
  setRedirectUrl = createSpy('setRedirectUrl');
}

describe('UpdateEmailComponentService', () => {
  let service: UpdateEmailComponentService;
  let userService: UserEmailFacade;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;
  let newUid: AbstractControl;
  let confirmNewUid: AbstractControl;
  let password: AbstractControl;
  let authRedirectService: AuthRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        UpdateEmailComponentService,
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: UserEmailFacade,
          useClass: MockUserEmailService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
        {
          provide: AuthRedirectService,
          useClass: MockAuthRedirectService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(UpdateEmailComponentService);

    routingService = TestBed.inject(RoutingService);
    authService = TestBed.inject(AuthService);
    userService = TestBed.inject(UserEmailFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authRedirectService = TestBed.inject(AuthRedirectService);

    newUid = service.form.controls.email;
    confirmNewUid = service.form.controls.confirmEmail;
    password = service.form.controls.password;
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
        newUid.setValue('tester@sap.com');
        confirmNewUid.setValue('tester@sap.com');
        password.setValue('Qwe123!');
      });

      it('should save valid email', () => {
        service.save();
        expect(userService.update).toHaveBeenCalledWith(
          'Qwe123!',
          'tester@sap.com'
        );
      });

      it('should show message', () => {
        service.save();
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'updateEmailForm.emailUpdateSuccess',
            params: { newUid: 'tester@sap.com' },
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('should logout', () => {
        service.save();
        expect(authService.coreLogout).toHaveBeenCalled();
      });

      it(
        'should reroute to the login page',
        waitForAsync(() => {
          service.save();
          authService.coreLogout().then(() => {
            expect(routingService.go).toHaveBeenCalledWith(
              { cxRoute: 'login' },
              {
                state: {
                  newUid: 'tester@sap.com',
                },
              }
            );
          });
        })
      );

      it('reset form', () => {
        spyOn(service.form, 'reset').and.callThrough();
        service.save();
        expect(service.form.reset).toHaveBeenCalled();
      });

      it(
        'should set the redirect url to the home page before navigating to the login page',
        waitForAsync(() => {
          service.save();
          expect(authRedirectService.setRedirectUrl).toHaveBeenCalledWith(
            routingService.getUrl({ cxRoute: 'home' })
          );
          authService.coreLogout().then(() => {
            expect(authRedirectService.setRedirectUrl).toHaveBeenCalledBefore(
              routingService.go
            );
          });
        })
      );
    });

    describe('error', () => {
      it('should not save invalid email', () => {
        confirmNewUid.setValue('diff@sap.com');
        service.save();
        expect(userService.update).not.toHaveBeenCalled();
        expect(globalMessageService.add).not.toHaveBeenCalled();
        expect(authService.coreLogout).not.toHaveBeenCalled();
        expect(routingService.go).not.toHaveBeenCalled();
      });
    });
  });
});
