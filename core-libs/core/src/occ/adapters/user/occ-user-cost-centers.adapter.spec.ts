import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  COST_CENTERS_NORMALIZER,
  FeatureConfigService,
  OCC_HTTP_TOKEN,
} from '@spartacus/core';

import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccUserCostCenterAdapter } from './occ-user-cost-centers.adapter';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import createSpy = jasmine.createSpy;

const costCenterCode = 'testCode';
const userId = 'userId';
const costCenter = {
  code: costCenterCode,
  name: 'testCostCenter',
};

class MockOccEndpointsService {
  buildUrl = createSpy('MockOccEndpointsService.buildUrl').and.callFake(
    (url, { costCenterCode }) =>
      url === 'costCenter' ? url + costCenterCode : url
  );
}

class MockFeatureConfigService {
  isEnabled = createSpy('isEnabled').and.returnValue(false);
}

describe('OccUserCostCenterAdapter', () => {
  let service: OccUserCostCenterAdapter;
  let httpMock: HttpTestingController;
  let converterService: ConverterService;
  let occEndpointsService: OccEndpointsService;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OccUserCostCenterAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
        {
          provide: FeatureConfigService,
          useClass: MockFeatureConfigService,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    converterService = TestBed.inject(ConverterService);
    service = TestBed.inject(OccUserCostCenterAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    featureConfigService = TestBed.inject(FeatureConfigService);
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
      expect(mockReq.request.context.get(OCC_HTTP_TOKEN)).toEqual({
        sendUserIdAsHeader: true,
      });
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([costCenter]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        COST_CENTERS_NORMALIZER
      );
    });

    it('should include address fields when b2bCheckoutShippingAddressFilter is enabled', () => {
      (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(true);

      service.loadActiveList(userId).subscribe();
      httpMock
        .expectOne(
          (req) => req.method === 'GET' && req.url === 'getActiveCostCenters'
        )
        .flush([costCenter]);

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'getActiveCostCenters',
        {
          urlParams: { userId },
          queryParams: { fields: 'DEFAULT,unit(BASIC,addresses(FULL))' },
        }
      );
    });

    it('should not include address fields when b2bCheckoutShippingAddressFilter is disabled', () => {
      (featureConfigService.isEnabled as jasmine.Spy).and.returnValue(false);

      service.loadActiveList(userId).subscribe();
      httpMock
        .expectOne(
          (req) => req.method === 'GET' && req.url === 'getActiveCostCenters'
        )
        .flush([costCenter]);

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'getActiveCostCenters',
        {
          urlParams: { userId },
          queryParams: {},
        }
      );
    });
  });
});
