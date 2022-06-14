import { TestBed } from '@angular/core/testing';
import { OrganizationUserRegistrationConflictHandler } from './conflict.handler';
import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import {
  GlobalMessageService,
  HttpResponseStatus,
  GlobalMessageType,
} from '@spartacus/core';

class MockGlobalMessageService {
  add() {}
}

const MockRequest = {} as HttpRequest<any>;

const MockOrganizationUserConflictResponse = {
  error: {
    errors: [
      {
        message: 'Already Exists.',
        type: 'AlreadyExistsError',
      },
    ],
  },
} as HttpErrorResponse;

describe('OrganizationUserRegistrationConflictHandler', () => {
  let service: OrganizationUserRegistrationConflictHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationUserRegistrationConflictHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(OrganizationUserRegistrationConflictHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 409 responseStatus ', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.CONFLICT);
  });

  it('should handle existing organization user conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockOrganizationUserConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'userRegistrationForm.httpHandlers.conflict',
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
