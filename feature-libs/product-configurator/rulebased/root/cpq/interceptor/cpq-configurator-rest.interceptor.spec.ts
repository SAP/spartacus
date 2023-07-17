import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
  HttpResponseBase,
} from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { CpqAccessData } from './cpq-access-data.models';
import { CpqAccessStorageService } from './cpq-access-storage.service';
import {
  CpqConfiguratorRestInterceptor,
  MARKER_HEADER_CPQ_CONFIGURATOR,
} from './cpq-configurator-rest.interceptor';

describe('CpqConfiguratorRestInterceptor', () => {
  let interceptorUnderTest: CpqConfiguratorRestInterceptor;
  let cpqAccessStorageServiceMock: CpqAccessStorageService;
  let mockedNextHandler: HttpHandler;
  let capturedRequestsStack: HttpRequest<any>[];

  const nonCPQRequest: HttpRequest<any> = new HttpRequest(
    'GET',
    'https://www.example.com'
  );

  const cpqRequest: HttpRequest<any> = new HttpRequest('GET', `/api/whatever`, {
    headers: new HttpHeaders({ [MARKER_HEADER_CPQ_CONFIGURATOR]: 'x' }),
  });

  const responseWithoutSessionId = new HttpResponse({
    headers: new HttpHeaders({}),
  });

  const validCpqResponse = new HttpResponse({
    headers: new HttpHeaders({ 'x-cpq-session-id': '123' }),
  });

  const asSpy = (f: any) => <jasmine.Spy>f;

  let cpqAccessDataStack: CpqAccessData[];
  let cpqResponseStack: HttpResponseBase[];

  beforeEach(() => {
    cpqAccessStorageServiceMock = jasmine.createSpyObj('mockedAccessService', [
      'getCpqAccessData',
      'renewCpqAccessData',
    ]);
    mockedNextHandler = jasmine.createSpyObj('mockedNextHandler', ['handle']);

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

    cpqAccessDataStack = [];

    cpqAccessDataStack.push({
      accessToken: 'TOKEN',
      endpoint: 'https://cpq',
      accessTokenExpirationTime: 0,
    });

    cpqResponseStack = [];
    capturedRequestsStack = [];
    cpqResponseStack.push(validCpqResponse);
    cpqResponseStack.push(validCpqResponse);

    asSpy(cpqAccessStorageServiceMock.getCpqAccessData).and.callFake(() =>
      of(cpqAccessDataStack[cpqAccessDataStack.length - 1])
    );
    asSpy(cpqAccessStorageServiceMock.renewCpqAccessData).and.callFake(() =>
      cpqAccessDataStack.pop()
    );

    asSpy(mockedNextHandler.handle).and.callFake(
      (request: HttpRequest<any>) => {
        capturedRequestsStack.push(request);
        const cpqResponse = cpqResponseStack.pop();
        return cpqResponse instanceof HttpErrorResponse
          ? throwError(cpqResponse)
          : of(cpqResponse);
      }
    );
  });

  it('should create service', () => {
    expect(interceptorUnderTest).toBeDefined();
  });

  it('should not intercept non-cpq related requests', () => {
    interceptorUnderTest.intercept(nonCPQRequest, mockedNextHandler);
    expect(mockedNextHandler.handle).toHaveBeenCalledWith(nonCPQRequest);
  });

  it('should intercept cpq related requests', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(mockedNextHandler.handle).not.toHaveBeenCalledWith(cpqRequest);
        expect(mockedNextHandler.handle).toHaveBeenCalled();
        done();
      });
  });

  it('should call CPQ only once per invocation', (done) => {
    asSpy(cpqAccessStorageServiceMock.getCpqAccessData).and.callFake(() =>
      of(cpqAccessDataStack[0], cpqAccessDataStack[0])
    );
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(mockedNextHandler.handle).toHaveBeenCalledTimes(1);
        done();
      });
  });

  it('should replace url of cpq related requests', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(capturedRequestsStack.pop()?.url).toBe(
          cpqAccessDataStack[0].endpoint + '/api/whatever'
        );
        done();
      });
  });

  it('should add authorization header to cpq related requests', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(capturedRequestsStack.pop()?.headers.get('Authorization')).toBe(
          'Bearer TOKEN'
        );
        done();
      });
  });

  it('should add cookieless header to cpq related requests', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(
          capturedRequestsStack.pop()?.headers.get('x-cpq-disable-cookies')
        ).toBe('true');
        done();
      });
  });

  it('should extract CPQ session id and append it to following requests', (done) => {
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(
          capturedRequestsStack.pop()?.headers.has('x-cpq-session-id')
        ).toBeFalsy();
        interceptorUnderTest
          .intercept(cpqRequest, mockedNextHandler)
          .subscribe(() => {
            expect(
              capturedRequestsStack.pop()?.headers.get('x-cpq-session-id')
            ).toBe('123');
            done();
          });
      });
  });

  it('should only extract CPQ session id and append it to following requests if existing', (done) => {
    cpqResponseStack = [];
    cpqResponseStack.push(responseWithoutSessionId);
    cpqResponseStack.push(responseWithoutSessionId);

    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(
          capturedRequestsStack.pop()?.headers.has('x-cpq-session-id')
        ).toBeFalsy();
        interceptorUnderTest
          .intercept(cpqRequest, mockedNextHandler)
          .subscribe(() => {
            expect(
              capturedRequestsStack.pop()?.headers.has('x-cpq-session-id')
            ).toBeFalsy();
            done();
          });
      });
  });

  it('should retry a CPQ request with fresh token on 403', (done) => {
    cpqAccessDataStack.push({
      accessToken: 'EXPIRED_TOKEN',
      endpoint: 'https://cpq',
      accessTokenExpirationTime: 0,
    });
    cpqResponseStack = [];
    cpqResponseStack.push(validCpqResponse); // second request should succeed
    cpqResponseStack.push(new HttpErrorResponse({ status: 403 })); // first error
    interceptorUnderTest
      .intercept(cpqRequest, mockedNextHandler)
      .subscribe(() => {
        expect(
          cpqAccessStorageServiceMock.getCpqAccessData
        ).toHaveBeenCalledTimes(2);
        expect(
          cpqAccessStorageServiceMock.renewCpqAccessData
        ).toHaveBeenCalled();
        expect(mockedNextHandler.handle).toHaveBeenCalledTimes(2);
        // last request with new token
        expect(capturedRequestsStack.pop()?.headers.get('Authorization')).toBe(
          'Bearer TOKEN'
        );
        // initial requests with expired token
        expect(capturedRequestsStack.pop()?.headers.get('Authorization')).toBe(
          'Bearer EXPIRED_TOKEN'
        );
        done();
      });
  });

  it('should not handle other errors', (done) => {
    cpqResponseStack = [];
    cpqResponseStack.push(new HttpErrorResponse({ status: 401 })); // first error
    interceptorUnderTest.intercept(cpqRequest, mockedNextHandler).subscribe(
      () => fail('error should be propagated'),
      () => {
        expect(
          cpqAccessStorageServiceMock.getCpqAccessData
        ).toHaveBeenCalledTimes(1);
        expect(
          cpqAccessStorageServiceMock.renewCpqAccessData
        ).not.toHaveBeenCalled();
        expect(mockedNextHandler.handle).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });
});
