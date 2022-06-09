import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import {
  GlobalMessageService, GlobalMessageType, HttpErrorHandler,
  HttpResponseStatus,
} from '@spartacus/core';
import { BadCostCenterRequestHandler } from './bad-cost-center-request.handler';


const MockRequest = {} as HttpRequest<any>;

const MockRandomResponse = {} as HttpErrorResponse;

const MockCostCenterErrorResponse = {
  error: {
    errors: [
      {
        type: 'EntityValidationError',
        message: 'The application has encountered an error.',
      },
    ],
  },
  url: 'https://mockURL/occ/v2/powertools-spa/users/mockUsr/carts/00001004/costcenter?costCenterId=mockCostCtr',
} as HttpErrorResponse;


class MockGlobalMessageService {
  add() {}
  remove() {}
}

fdescribe('BadCostCenterRequestHandler', () => {
  let service: BadCostCenterRequestHandler;
  let globalMessageService: GlobalMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BadCostCenterRequestHandler,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
      ],
    });
    service = TestBed.inject(BadCostCenterRequestHandler);
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

  it('should match cost center error', () => {
    spyOn(HttpErrorHandler.prototype, 'hasMatch').and.returnValue(true);
    expect(service.hasMatch(MockCostCenterErrorResponse)).toBe(true);
  });

  it('should not have a match when super.hasMatch() is false', () => {
    spyOn(HttpErrorHandler.prototype, 'hasMatch').and.returnValue(false);
    expect(service.hasMatch(MockCostCenterErrorResponse)).toBe(false);
  });

  it('should not handle response without errors', () => {
    service.handleError(MockRequest, MockRandomResponse);
    expect(globalMessageService.add).not.toHaveBeenCalled();
  });

  it('should handle invalid cost center error', () => {
    service.handleError(MockRequest, MockCostCenterErrorResponse);
    expect(globalMessageService.add).toHaveBeenCalledWith(
      { key: 'httpHandlers.invalidCostCenter' },
      GlobalMessageType.MSG_TYPE_ERROR
    );
  });
});
