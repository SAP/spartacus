import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OccEndpointsService, UserIdService } from '@spartacus/core';
import { MockOccEndpointsService } from 'projects/core/src/occ/adapters/user/unit-test.helper';
import { of } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessLoaderService } from './cpq-access-loader.service';

const accessData: CpqAccessData = {
  accessToken: '8273635',
  endpoint: 'https://cpq',
  accessTokenExpirationTime: 1605004667020,
};
const USER_ID = 'actualUser';
class MockUserIdService {
  takeUserId() {
    return of(USER_ID);
  }
}

describe('CpqAccessLoaderService', () => {
  let serviceUnderTest: CpqAccessLoaderService;
  let httpMock: HttpTestingController;

  let occEnpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqAccessLoaderService,
        { provide: UserIdService, useClass: MockUserIdService },
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

    spyOn(occEnpointsService, 'buildUrl').and.callThrough();
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
      return req.method === 'GET' && req.url === '/getCpqAccessData';
    });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'getCpqAccessData',
      { urlParams: { userId: USER_ID } }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(accessData);
  });

  it('should default to "current" user in case userId service is not present', () => {
    serviceUnderTest['userIdService'] = undefined;
    serviceUnderTest.getCpqAccessData().subscribe();

    const mockReq = httpMock.expectOne((req) => {
      return req.method === 'GET' && req.url === '/getCpqAccessData';
    });

    expect(occEnpointsService.buildUrl).toHaveBeenCalledWith(
      'getCpqAccessData',
      { urlParams: { userId: 'current' } }
    );

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');

    mockReq.flush(accessData);
  });
});
