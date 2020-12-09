import { TestBed } from '@angular/core/testing';
import { GlobalMessageService } from '../../../facade';
import { GlobalMessageType } from '../../../models/global-message.model';
import { HttpResponseStatus } from '../../../models/response-status.model';
import { ConflictHandler } from './conflict.handler';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';

class MockGlobalMessageService {
  add() {}
}

const MockRequest = {} as HttpRequest<any>;

const MockRandomResponse = {} as HttpErrorResponse;

const MockBudgetConflictResponse = {
  error: {
    errors: [
      {
        message: 'Budget with code [BurritoPurchases1] already exists',
        type: 'AlreadyExistsError',
      },
    ],
  },
} as HttpErrorResponse;

const MockUserConflictResponse = {
  error: {
    errors: [
      {
        message: 'User already exists',
        type: 'AlreadyExistsError',
      },
    ],
  },
} as HttpErrorResponse;

const MockUpdateUserRequest = {
  body: { email: 'test@test.com' },
} as HttpRequest<any>;

const MockUserGroupConflictResponse = {
  error: {
    errors: [
      {
        message: 'Member Permission with the same id already exists',
        type: 'AlreadyExistsError',
      },
    ],
  },
} as HttpErrorResponse;

const MockUpdateUserGroupRequest = {
  body: { uid: 'testGroupId' },
} as HttpRequest<any>;

const MockUnitConflictResponse = {
  error: {
    errors: [
      {
        message: 'Organizational unit with uid [TU22] already exists',
        type: 'AlreadyExistsError',
      },
    ],
  },
} as HttpErrorResponse;

describe('ConflictHandler', () => {
  let service: ConflictHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConflictHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(ConflictHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 409 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.CONFLICT);
  });

  it('should send error to global message service', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockRandomResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.conflict' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle budget conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockBudgetConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'httpHandlers.organization.conflict.budget',
        params: { code: 'BurritoPurchases1' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle user conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockUpdateUserRequest, MockUserConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'httpHandlers.organization.conflict.user',
        params: { code: 'test@test.com' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle user group conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(
      MockUpdateUserGroupRequest,
      MockUserGroupConflictResponse
    );

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'httpHandlers.organization.conflict.userGroup',
        params: { code: 'testGroupId' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle user group conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockUnitConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'httpHandlers.organization.conflict.unit',
        params: { code: 'TU22' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
