import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { OccEndpointsService, WindowRef } from '@spartacus/core';
import { PersonalizationConfig } from '../config/personalization-config';
import { OccPersonalizationTimeInterceptor } from './occ-personalization-time.interceptor';

const mockPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    enabled: true,
    httpHeaderName: {
      id: 'test-personalization-id',
      timestamp: 'test-personalization-time',
    },
  },
};
const store = {};
const MockWindowRef = {
  localStorage: {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string): void => {
      if (key in store) {
        store[key] = undefined;
      }
    },
  },
  isBrowser(): boolean {
    return true;
  },
};
const endpoint = '/test';
class OccEndpointsServiceMock {
  getBaseUrl(): string {
    return endpoint;
  }
}
describe('OccPersonalizationTimeInterceptor with personalization enabled', () => {
  let httpMock: HttpTestingController;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: PersonalizationConfig, useValue: mockPersonalizationConfig },
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OccPersonalizationTimeInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    winRef = TestBed.inject(WindowRef);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add request header if the personalization-time exists', inject(
    [HttpClient],
    (http: HttpClient) => {
      winRef.localStorage.setItem('personalization-time', 'test timestamp');

      http.get('https://localhost:9002/test').subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      const perHeader: string = mockReq.request.headers.get(
        'test-personalization-time'
      );
      expect(perHeader).toBeTruthy();
      expect(perHeader).toEqual('test timestamp');

      mockReq.flush('someData');
    }
  ));

  it('should keep the new personalization-time, if it is different from the existing time', inject(
    [HttpClient],
    (http: HttpClient) => {
      winRef.localStorage.setItem('personalization-time', 'old timestamp');

      http.get('https://localhost:9002/test').subscribe((response) => {
        expect(response).toEqual('');
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      mockReq.flush('', {
        headers: { ['test-personalization-time']: 'new timestamp' },
      });
      expect(winRef.localStorage.getItem('personalization-time')).toEqual(
        'new timestamp'
      );
    }
  ));
});

describe('OccPersonalizationTimeInterceptor with personalization disabled', () => {
  let httpMock: HttpTestingController;
  let winRef: WindowRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: PersonalizationConfig,
          useValue: {
            personalization: {
              enabled: false,
            },
          },
        },
        { provide: WindowRef, useValue: MockWindowRef },
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: OccPersonalizationTimeInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    winRef = TestBed.inject(WindowRef);

    winRef.localStorage.setItem('personalization-id', 'test id');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should clear client-side personalization-id, and not send it in request header', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('https://localhost:9002/test').subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });
      const perHeader: string = mockReq.request.headers.get(
        'test-personalization-time'
      );
      expect(perHeader).toBeNull();
      mockReq.flush('someData');

      expect(winRef.localStorage.getItem('personalization-time')).toBeFalsy();
    }
  ));
});
