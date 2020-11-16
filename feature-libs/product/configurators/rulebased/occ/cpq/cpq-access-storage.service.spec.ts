import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService } from '@spartacus/core';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { Cpq } from '../../cpq/cpq.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';
import { CpqAccessStorgeService } from './cpq-access-storage.service';

const accessData: Cpq.AccessData = {
  accessToken: '8273635',
  endpoint: 'https://cpq',
  tokenExpirationTime: 1605004667020,
};

describe('CpqAccessStorgeService', () => {
  let serviceUnderTest: CpqAccessStorgeService;
  let httpMock: HttpTestingController;

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

    serviceUnderTest = TestBed.inject(
      CpqAccessStorgeService as Type<CpqAccessStorgeService>
    );
    serviceUnderTest.clearCachedAccessData();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create service', () => {
    expect(serviceUnderTest).toBeDefined();
  });

  it('should return access data', () => {
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      expect(returnedData.accessToken).toEqual(accessData.accessToken);
      expect(returnedData.tokenExpirationTime).toEqual(
        accessData.tokenExpirationTime
      );
      expect(returnedData.endpoint).toEqual(accessData.endpoint);
    });
    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/getCpqAccessData';
    });
    mockReq.flush(accessData);
  });

  it('should cache access data', () => {
    let counter = 0;
    // first request
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });
    // second request, while first is in progress ()
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });
    // fullfill first request
    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/getCpqAccessData';
    });
    mockReq.flush(accessData);
    // third request
    serviceUnderTest.getCachedCpqAccessData().subscribe((returnedData) => {
      expect(returnedData).toBeDefined();
      counter++;
    });

    httpMock.expectNone('/getCpqAccessData');
    expect(counter).toBe(3, '3 consumers should have been called each once');
  });
});
