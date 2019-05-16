import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccPersonalizationTimeInterceptor } from './occ-personalization-time.interceptor';
import { PersonalizationConfig } from '../config/personalization-config';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { WindowRef } from '../../window/window-ref';

const mockPersonalizationConfig: PersonalizationConfig = {
  personalization: {
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
  },
};
const endpoint = '/test';
class OccEndpointsServiceMock {
  getBaseEndpoint(): string {
    return endpoint;
  }
}
describe('OccPersonalizationTimeInterceptor', () => {
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

    httpMock = TestBed.get(HttpTestingController);
    winRef = TestBed.get(WindowRef);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add request header if the personalization-time exists', inject(
    [HttpClient],
    (http: HttpClient) => {
      winRef.localStorage.setItem('personalization-time', 'test timestamp');

      http.get('https://localhost:9002/test').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
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

      http.get('https://localhost:9002/test').subscribe(response => {
        expect(response).toEqual('');
      });

      const mockReq = httpMock.expectOne(req => {
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
