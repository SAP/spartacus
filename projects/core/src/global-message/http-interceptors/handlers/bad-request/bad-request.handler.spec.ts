import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { BadRequestHandler } from './bad-request.handler';

const MockRequest = {
  url: 'https://electronics-spa/occ/user/password',
} as HttpRequest<any>;

const MockRequestEmailChange = {
  url: 'https://electronics-spa/occ/user/email',
} as HttpRequest<any>;

const MockRandomResponse = {} as HttpErrorResponse;

const MockBadPasswordRequest = {
  body: {
    get(_grant_type) {
      return 'password';
    },
  },
} as HttpRequest<any>;

const MockBadPasswordResponse = {
  url: 'https://server.com/authorizationserver/oauth/token',
  error: {
    error: 'invalid_grant',
  },
} as HttpErrorResponse;

const MockJaloErrorResponse = {
  error: {
    errors: [
      {
        type: 'JaloObjectNoLongerValidError',
      },
    ],
  },
} as HttpErrorResponse;

const MockBadLoginResponse = {
  error: {
    errors: [
      {
        type: 'PasswordMismatchError',
      },
    ],
  },
} as HttpErrorResponse;

const MockValidationErrorResponse = {
  error: {
    errors: [
      {
        type: 'ValidationError',
        reason: 'the_reason',
        subject: 'the_subject',
      },
    ],
  },
} as HttpErrorResponse;

const MockUnknownIdentifierErrorResponse = {
  error: {
    errors: [
      {
        type: 'UnknownIdentifierError',
        message: 'item not found',
      },
    ],
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

const MockBadGuestDuplicateEmailResponse = {
  error: {
    errors: [
      {
        message: 'test@sap.com',
        type: 'DuplicateUidError',
      },
    ],
  },
} as HttpErrorResponse;

describe('BadRequestHandler', () => {
  let service: BadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(BadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);

    spyOn(globalMessageService, 'add');
    spyOn(globalMessageService, 'remove');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 400 responseStatus', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.BAD_REQUEST);
  });

  it('should not handle response without errors', () => {
    service.handleError(MockRequest, MockRandomResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should not handle response with Jalo errors', () => {
    service.handleError(MockRequest, MockJaloErrorResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should not show error with error type JaloObjectNoLongerValidError', () => {
    service.handleError(MockRequest, MockRandomResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should handle bad password message', () => {
    service.handleError(MockBadPasswordRequest, MockBadPasswordResponse);
    expect(globalMessageService.add).toHaveBeenCalled();
    expect(globalMessageService.remove).toHaveBeenCalled();
  });

  it('should handle non matching password response', () => {
    service.handleError(MockRequest, MockBadLoginResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.badRequestOldPasswordIncorrect' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle non matching password response for email update', () => {
    service.handleError(MockRequestEmailChange, MockBadLoginResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.validationErrors.invalid.password' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle validation error', () => {
    service.handleError(MockRequest, MockValidationErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: `httpHandlers.validationErrors.the_reason.the_subject`,
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle duplication of a registered email for guest checkout', () => {
    service.handleError(MockRequest, MockBadGuestDuplicateEmailResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'httpHandlers.badRequestGuestDuplicateEmail',
        params: {
          errorMessage:
            MockBadGuestDuplicateEmailResponse.error.errors[0].message,
        },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle unknown identifier error', () => {
    service.handleError(MockRequest, MockUnknownIdentifierErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      'item not found',
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
