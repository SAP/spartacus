import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import * as AngularCore from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthConfigService } from '../../../../auth/user-auth/services/auth-config.service';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { UnauthorizedErrorHandler } from './unauthorized.handler';

const MockRequest = {} as HttpRequest<any>;
const MockEmptyResponse = {} as HttpErrorResponse;
const MockErrorResponse = {
  error: {
    error: 'invalid_client',
  },
} as HttpErrorResponse;

const MockErrorWithDescriptionResponse = {
  error: {
    error: 'invalid_client',
    error_description: 'This is the backend error',
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
}

class MockAuthConfigService {
  getRevokeEndpoint() {
    return 'revoke';
  }
}

describe('UnauthorizedErrorHandler', () => {
  let service: UnauthorizedErrorHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UnauthorizedErrorHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: AuthConfigService,
          useClass: MockAuthConfigService,
        },
      ],
    });
    service = TestBed.inject(UnauthorizedErrorHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);

    // avoid dev warnings during test
    spyOnProperty(AngularCore, 'isDevMode').and.returnValue(() => false);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 401 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.UNAUTHORIZED);
  });

  describe('Unknown Response', () => {
    it('should send common error to global message service', () => {
      spyOn(globalMessageService, 'add');
      service.handleError(MockRequest, MockEmptyResponse);

      expect(globalMessageService.add).toHaveBeenCalledWith(
        { key: 'httpHandlers.unauthorized.common' },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should not show common error in case of revoke endpoint', () => {
      spyOn(globalMessageService, 'add');
      service.handleError(MockRequest, { ...MockEmptyResponse, url: 'revoke' });

      expect(globalMessageService.add).not.toHaveBeenCalled();
    });
  });

  describe('401 Error Response', () => {
    it('should send common error description to global message service', () => {
      spyOn(globalMessageService, 'add');
      service.handleError(MockRequest, MockErrorResponse);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        {
          key: 'httpHandlers.unauthorized.invalid_client',
        },
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });

    it('should send backend error_description to global message service', () => {
      spyOn(globalMessageService, 'add');
      service.handleError(MockRequest, MockErrorWithDescriptionResponse);
      expect(globalMessageService.add).toHaveBeenCalledWith(
        'This is the backend error',
        GlobalMessageType.MSG_TYPE_ERROR
      );
    });
  });
});
