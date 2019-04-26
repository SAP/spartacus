import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccPersonalizationIdInterceptor } from './occ-personalization-id.interceptor';
import { PersonalizationConfig } from '../config/personalization-config';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { WindowRef } from '../../window/window-ref';

const mockPersonalizationConfig: PersonalizationConfig = {
  personalization: {
    requestHeader: 'test-personalization-id',
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
describe('OccPersonalizationIdInterceptor', () => {
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
          useClass: OccPersonalizationIdInterceptor,
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

  it('should add request header if the personalization-id exists', inject(
    [HttpClient],
    (http: HttpClient) => {
      winRef.localStorage.setItem('personalization-id', 'test id');

      http.get('https://localhost:9002/test').subscribe(result => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      const perHeader: string = mockReq.request.headers.get(
        'test-personalization-id'
      );
      expect(perHeader).toBeTruthy();
      expect(perHeader).toEqual('test id');

      mockReq.flush('someData');
    }
  ));

  it('should keep the new personalization-id, if it is different from the existing id ', inject(
    [HttpClient],
    (http: HttpClient) => {
      winRef.localStorage.setItem('personalization-id', 'old id');

      http.get('https://localhost:9002/test').subscribe(response => {
        expect(response).toEqual('');
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });
      mockReq.flush('', { headers: { ['test-personalization-id']: 'new id' } });
      expect(winRef.localStorage.getItem('personalization-id')).toEqual(
        'new id'
      );
    }
  ));
});
