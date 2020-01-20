import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  B2BUNIT_NORMALIZER,
  B2BUNIT_LIST_NORMALIZER,
} from '@spartacus/core';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccOrgUnitAdapter } from './occ-org-unit.adapter';

import createSpy = jasmine.createSpy;

const orgUnitId = 'testId';
const userId = 'userId';
const orgUnit = {
  id: orgUnitId,
  name: 'testOrgUnit',
};

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { orgUnitId }) => (url === 'orgUnit' ? url + orgUnitId : url)
  );
}

describe('OccOrgUnitAdapter', () => {
  let service: OccOrgUnitAdapter;
  let httpMock: HttpTestingController;

  let converterService: ConverterService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccOrgUnitAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    converterService = TestBed.get(ConverterService as Type<ConverterService>);
    service = TestBed.get(OccOrgUnitAdapter as Type<OccOrgUnitAdapter>);
    httpMock = TestBed.get(HttpTestingController as Type<
      HttpTestingController
    >);
    spyOn(converterService, 'pipeable').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('load orgUnit details', () => {
    it('should load orgUnit details for given orgUnit id', () => {
      service.load(userId, orgUnitId).subscribe();
      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === 'orgUnit' + orgUnitId
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NORMALIZER
      );
    });
  });

  describe('load orgUnit list', () => {
    it('should load orgUnit list', () => {
      service.loadList(userId).subscribe();
      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === 'orgUnits'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush([orgUnit]);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_LIST_NORMALIZER
      );
    });
  });

  describe('create orgUnit', () => {
    it('should create orgUnit', () => {
      service.create(userId, orgUnit).subscribe();
      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'POST' &&
          req.url === 'orgUnits' &&
          req.body.id === orgUnit.id
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NORMALIZER
      );
    });
  });

  describe('update orgUnit', () => {
    it('should update orgUnit', () => {
      service.update(userId, orgUnitId, orgUnit).subscribe();
      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'PATCH' &&
          req.url === 'orgUnit' + orgUnitId &&
          req.body.id === orgUnit.id
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(orgUnit);
      expect(converterService.pipeable).toHaveBeenCalledWith(
        B2BUNIT_NORMALIZER
      );
    });
  });
});
