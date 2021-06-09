import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService,
  GlobalMessageType,
  HttpResponseStatus,
} from '@spartacus/core';
import { OrganizationBadRequestHandler } from './bad-request.handler';

const MockRequest = {} as HttpRequest<any>;

const MockCostCenterConflictResponse = {
  error: {
    errors: [
      {
        message:
          '[de.hybris.platform.servicelayer.interceptor.impl.UniqueAttributesInterceptor@3e8861b1]:ambiguous unique keys {code=NorthAmericaBurritos} for model B2BCostCenterModel (<unsaved>) - found 1 item(s) using the same keys',
        type: 'ModelSavingError',
      },
    ],
  },
} as HttpErrorResponse;

const MockPermissionConflictResponse = {
  error: {
    errors: [
      {
        message: 'Approval Permission with code: test2 already exists.',
        type: 'DuplicateUidError',
      },
    ],
  },
} as HttpErrorResponse;

const MockUnitConflictResponse = {
  error: {
    errors: [
      {
        message:
          '[de.hybris.platform.servicelayer.interceptor.impl.UniqueAttributesInterceptor@3e8861b1]:ambiguous unique keys {uid=TU} for model B2BUnitModel (8796125986821@15) - found 1 item(s) using the same keys',
        type: 'ModelSavingError',
      },
    ],
  },
} as HttpErrorResponse;

const MockUnknownConflictResponse = {
  error: {
    errors: [
      {
        message: 'Model saving error.',
        type: 'ModelSavingError',
      },
    ],
  },
} as HttpErrorResponse;

class MockGlobalMessageService {
  add() {}
  remove() {}
}

describe('OrganizationBadRequestHandler', () => {
  let service: OrganizationBadRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrganizationBadRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(OrganizationBadRequestHandler);
    globalMessageService = TestBed.inject(GlobalMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register 400 responseStatus', () => {
    expect(service.responseStatus).toEqual(HttpResponseStatus.BAD_REQUEST);
  });

  it('should handle unit conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockUnitConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'organization.httpHandlers.conflict.unit',
        params: { code: 'TU' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle cost center conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockCostCenterConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'organization.httpHandlers.conflict.costCenter',
        params: { code: 'NorthAmericaBurritos' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle permission conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockPermissionConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'organization.httpHandlers.conflict.permission',
        params: { code: 'test2' },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });

  it('should handle unknown conflict', () => {
    spyOn(globalMessageService, 'add');
    service.handleError(MockRequest, MockUnknownConflictResponse);

    expect(globalMessageService.add).toHaveBeenCalledWith(
      {
        key: 'organization.httpHandlers.conflict.unknown',
        params: { code: undefined },
      },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
