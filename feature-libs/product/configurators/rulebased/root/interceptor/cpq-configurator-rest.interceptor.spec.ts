import {
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessStorageService } from './cpq-access-storage.service';
import {
  CpqConfiguratorRestInterceptor,
  CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT,
} from './cpq-configurator-rest.interceptor';

describe('CpqConfiguratorRestInterceptor', () => {
  let interceptorUnderTest: CpqConfiguratorRestInterceptor;

  const nonCPQRequest: HttpRequest<any> = new HttpRequest(
    'GET',
    'https://www.exmaple.com'
  );

  const cpqRequest: HttpRequest<any> = new HttpRequest(
    'GET',
    `${CPQ_CONFIGURATOR_VIRTUAL_ENDPOINT}/api/whatever`
  );

  const cpqAccessData: CpqAccessData = {
    accessToken: 'TOKEN',
    endpoint: 'https://cpq',
  };

  const asSpy = (f) => <jasmine.Spy>f;

  const mockedNextHandler: HttpHandler = jasmine.createSpyObj(
    'mockedNextHandler',
    ['handle']
  );
  const response: HttpResponse<any> = new HttpResponse({
    headers: new HttpHeaders({ 'x-cpq-session-id': '123' }),
  });
  let capturedRequest: HttpRequest<any>;
  asSpy(mockedNextHandler.handle).and.callFake((request) => {
    capturedRequest = request;
    return of(response);
  });

  const cpqAccessStorageServiceMock: CpqAccessStorageService = jasmine.createSpyObj(
    'mockedAccessService',
    ['getCachedCpqAccessData']
  );

  asSpy(cpqAccessStorageServiceMock.getCachedCpqAccessData).and.callFake(() =>
    of(cpqAccessData)
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CpqConfiguratorRestInterceptor,
        {
          provide: CpqAccessStorageService,
          useValue: cpqAccessStorageServiceMock,
        },
      ],
    });

    interceptorUnderTest = TestBed.inject(
      CpqConfiguratorRestInterceptor as Type<CpqConfiguratorRestInterceptor>
    );
  });

  it('should create service', () => {
    expect(interceptorUnderTest).toBeDefined();
  });

  it('should not intercept non-cpq related requetes', () => {
    interceptorUnderTest.intercept(nonCPQRequest, mockedNextHandler);
    expect(mockedNextHandler.handle).toHaveBeenCalledWith(nonCPQRequest);
  });

  it('should intercept cpq related requetes', () => {
    interceptorUnderTest.intercept(cpqRequest, mockedNextHandler);
    expect(mockedNextHandler.handle).not.toHaveBeenCalledWith(cpqRequest);
    expect(mockedNextHandler.handle).toHaveBeenCalled();
  });

  it('should replace url of cpq related requetes', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(capturedRequest.url).toBe(
          cpqAccessData.endpoint + '/api/whatever'
        );
        done();
      });
  });

  it('should add authprization header to cpq related requetes', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(capturedRequest.headers.get('Authorization')).toBe(
          'Bearer TOKEN'
        );
        done();
      });
  });

  it('should add cookieless header to cpq related requetes', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(capturedRequest.headers.get('x-cpq-disable-cookies')).toBe(
          'true'
        );
        done();
      });
  });

  it('should extract CPQ session id and append it to following requets', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(capturedRequest.headers.has('x-cpq-session-id')).toBeFalse();
        interceptorUnderTest
          .intercept(cpqRequest, mockedNextHandler)
          .subscribe(() => {
            expect(capturedRequest.headers.get('x-cpq-session-id')).toBe('123');
            done();
          });
      });
  });
});
