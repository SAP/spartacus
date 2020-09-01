import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ConverterService, OccEndpointsService } from '@spartacus/core';
import { OccBudgetAdapter } from './occ-budget.adapter';

import createSpy = jasmine.createSpy;
import { BUDGET_NORMALIZER, BUDGETS_NORMALIZER } from '../../../connectors';

const budgetCode = 'testCode';
const userId = 'userId';
const budget = {
  code: budgetCode,
  name: 'testBudget',
};

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { budgetCode }) => (url === 'budget' ? url + budgetCode : url)
  );
}

describe('OccBudgetAdapter', () => {
  let service: OccBudgetAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccBudgetAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    service = TestBed.get(OccBudgetAdapter as Type<OccBudgetAdapter>);
    httpMock = TestBed.get(
      HttpTestingController as Type<HttpTestingController>
    );
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load budget details', () => {
    it('should load budget details for given budget code', () => {
      service.load(userId, budgetCode).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'budget' + budgetCode
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(budget);
      expect(converterService.pipeable).toHaveBeenCalledWith(BUDGET_NORMALIZER);
    });
  });

  describe('load budget list', () => {
    it('should load budget list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'budgets'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([budget]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        BUDGETS_NORMALIZER
      );
    });
  });

  describe('create budget', () => {
    it('should create budget', () => {
      service.create(userId, budget).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'POST' &&
          req.url === 'budgets' &&
          req.body.code === budget.code
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(budget);
      expect(converterService.pipeable).toHaveBeenCalledWith(BUDGET_NORMALIZER);
    });
  });

  describe('update budget', () => {
    it('should update budget', () => {
      service.update(userId, budgetCode, budget).subscribe();
      const mockReq = httpMock.expectOne(
        (req) =>
          req.method === 'PATCH' &&
          req.url === 'budget' + budgetCode &&
          req.body.code === budget.code
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(budget);
      expect(converterService.pipeable).toHaveBeenCalledWith(BUDGET_NORMALIZER);
    });
  });
});
