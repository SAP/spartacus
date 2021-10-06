import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, COST_CENTERS_NORMALIZER } from '@spartacus/core';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccUserCostCenterAdapter } from './occ-user-cost-centers.adapter';

import createSpy = jasmine.createSpy;

const costCenterCode = 'testCode';
const userId = 'userId';
const costCenter = {
  code: costCenterCode,
  name: 'testCostCenter',
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    // eslint-disable-next-line no-shadow
    (url, { costCenterCode }) =>
      url === 'costCenter' ? url + costCenterCode : url
  );
}

describe('OccUserCostCenterAdapter', () => {
  let service: OccUserCostCenterAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccUserCostCenterAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.inject(ConverterService);
    service = TestBed.inject(OccUserCostCenterAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load active costCenter list', () => {
    it('should load active costCenter list', () => {
      service.loadActiveList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'getActiveCostCenters'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([costCenter]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        COST_CENTERS_NORMALIZER
      );
    });
  });
});
