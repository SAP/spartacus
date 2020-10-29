import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { ForbiddenHandler } from './forbidden.handler';
import { AuthService } from '../../../../auth/user-auth/facade/auth.service';

class MockGlobalMessageService {
  add() {}
}

class MockAuthService {
  initLogout() {}
}

describe('ForbiddenHandler', () => {
  let service: ForbiddenHandler;
  let globalMessageService: GlobalMessageService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ForbiddenHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: AuthService,
          useClass: MockAuthService,
        },
      ],
    });
    service = TestBed.inject(ForbiddenHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 403 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.FORBIDDEN);
  });

  it('should init logout unauthorised user', () => {
    spyOn(authService, 'initLogout');
    service.handleError();

    expect(authService.initLogout).toHaveBeenCalledWith();
  });

  it('should send common error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError();

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.forbidden' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
