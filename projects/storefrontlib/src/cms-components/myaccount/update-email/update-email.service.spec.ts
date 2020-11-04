import { async, TestBed } from '@angular/core/testing';
import { NavigationExtras } from '@angular/router';
import {
  AuthService,
  GlobalMessage,
  GlobalMessageService, GlobalMessageType,
  RoutingService,
  UrlCommands,
  UserService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { UpdateEmailService } from './update-email.service';



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
  logout(): void {}
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

fdescribe('UpdateEmailService', () => {
  let service: UpdateEmailService;
  let userService: UserService;
  let authService: AuthService;
  let routingService: RoutingService;
  let globalMessageService: GlobalMessageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

    it('should call getUpdateEmailResultSuccess', () => {
      spyOn(userService, 'getUpdateEmailResultSuccess').and.stub();

      service.getUpdateEmailResultSuccess();
      expect(userService.getUpdateEmailResultSuccess).toHaveBeenCalled();
    });


    it('should call updateEmail with params', () => {
      spyOn(userService, 'updateEmail').and.stub();

      const newUid = 'tester@sap.com';
      const password = 'Qwe123!';
      service.updateEmail(password, newUid);
      expect(userService.updateEmail).toHaveBeenCalledWith(password, newUid);
    });
  });

  describe('AuthService Calls', () => {
    it('should call logout', () => {
      spyOn(authService, 'logout').and.stub();

      service.logout();
      expect(authService.logout).toHaveBeenCalled();
    });
  });

  describe('GlobalMessageService Calls', () => {
    it('should call add with params', () => {
      spyOn(globalMessageService, 'add').and.stub();

      const text = {
        key: 'updateEmailForm.emailUpdateSuccess',
        params: { newUid: 'new@sap.com' },
      };
      const type = GlobalMessageType.MSG_TYPE_CONFIRMATION;

      service.addGlobalMessage(text, type);
      expect(globalMessageService.add).toHaveBeenCalledWith(text, type, undefined);
    });
  });

  describe('RoutingService Calls', () => {
    it('should call go with params', () => {
      spyOn(routingService, 'go').and.stub();

      const command = { cxRoute: 'home' };

      service.goToRoute(command);
      expect(routingService.go).toHaveBeenCalledWith(command, undefined, undefined);
    });

    it('should call go with params and query', () => {
      spyOn(routingService, 'go').and.stub();

      const command = { cxRoute: 'home' };
      const query = { state: { key: 'value' }};

      service.goToRoute(command, query);
      expect(routingService.go).toHaveBeenCalledWith(command, query, undefined);
    });
  });
});
