import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

const accessData: Cpq.AccessData = {
  token: '8273635',
  endpoint: 'https://cpq',
  tokenExpirationTime: 1605004667020,
};

describe('CpqAccessLoaderService', () => {
  let serviceUnderTest: CpqAccessLoaderService;
  let httpMock: HttpTestingController;

  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqAccessLoaderService,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    httpMock = TestBed.inject(
      HttpTestingController as Type<HttpTestingController>
    );

    occEnpointsService = TestBed.inject(
      OccEndpointsService as Type<OccEndpointsService>
    );

    serviceUnderTest = TestBed.inject(
      CpqAccessLoaderService as Type<CpqAccessLoaderService>
    );

    spyOn(occEnpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should call getCpqAccessData endpoint', () => {
    serviceUnderTest.getCpqAccessData().subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === 'getCpqAccessData';
    });

    expect(occEnpointsService.getUrl).toHaveBeenCalledWith('getCpqAccessData');

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(accessData);
  });
});
