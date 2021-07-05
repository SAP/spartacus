import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import {
  ORDER_APPROVALS_NORMALIZER,
  ORDER_APPROVAL_DECISION_NORMALIZER,
  ORDER_APPROVAL_NORMALIZER,
} from '../../core/connectors/converters';
import {
  OrderApproval,
  OrderApprovalDecision,
  OrderApprovalDecisionValue,
} from '../../core/model/order-approval.model';
import { OccOrderApprovalAdapter } from './occ-order-approval.adapter';

import createSpy = jasmine.createSpy;

const orderApprovalCode = 'testCode';
const userId = 'userId';
const orderApproval: OrderApproval = {
  code: orderApprovalCode,
};

const orderApprovalDecision: OrderApprovalDecision = {
  decision: OrderApprovalDecisionValue.APPROVE,
  comment: 'yeah',
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { urlParams: { orderApprovalCode } }) =>
      url === 'orderApproval' || url === 'orderApprovalDecision'
        ? `${url}/${orderApprovalCode}`
        : url
  );
}

describe('OccOrderApprovalAdapter', () => {
  let service: OccOrderApprovalAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrderApprovalAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    service = TestBed.inject(OccOrderApprovalAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load orderApproval details', () => {
    it('should load orderApproval details for given orderApproval code', () => {
      service.load(userId, orderApprovalCode).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'GET' &&
          req.url === `orderApproval/${orderApprovalCode}`
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderApproval);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORDER_APPROVAL_NORMALIZER
      );
    });
  });

  describe('load orderApproval list', () => {
    it('should load orderApproval list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'orderApprovals'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orderApproval]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORDER_APPROVALS_NORMALIZER
      );
    });
  });

  describe('makeDecision', () => {
    it('should make orderApproval decision', () => {
      service
        .makeDecision(userId, orderApprovalCode, orderApprovalDecision)
        .subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === `orderApprovalDecision/${orderApprovalCode}` &&
          req.body === orderApprovalDecision
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orderApprovalDecision);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        ORDER_APPROVAL_DECISION_NORMALIZER
      );
    });
  });
});
