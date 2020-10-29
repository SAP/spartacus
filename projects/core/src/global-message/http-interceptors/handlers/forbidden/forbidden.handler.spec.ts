import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { ForbiddenHandler } from './forbidden.handler';
import { AuthService } from '../../../../auth/user-auth/facade/auth.service';
import { MockOccEndpointsService } from '../../../../occ/adapters/user/unit-test.helper';
import { OccEndpointsService } from '@spartacus/core';

class MockGlobalMessageService {
  add() {}
}

class MockAuthService {
  logout() {}
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
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
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

  it('should logout unauthorised user', () => {
    spyOn(authService, 'logout');
    service.handleError({ url: '/user' });

    expect(authService.logout).toHaveBeenCalledWith();
  });

  it('should send common error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError({ url: '' });

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.forbidden' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
