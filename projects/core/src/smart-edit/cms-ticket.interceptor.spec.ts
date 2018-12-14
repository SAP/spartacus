import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { SmartEditService } from './smart-edit.service';
import { CmsTicketInterceptor } from './cms-ticket.interceptor';

class MockSmartEditService {
  private _cmsTicketId: string;
  get cmsTicketId(): string {
    return this._cmsTicketId;
  }
}

describe('CmsTicketInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: SmartEditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SmartEditService,
          useClass: MockSmartEditService
        },

        {
          provide: HTTP_INTERCEPTORS,
          useClass: CmsTicketInterceptor,
          multi: true
        }
      ]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(SmartEditService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: cmsTicketId', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/xxx').subscribe(result => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('cmsTicketId')).toEqual(null);
      mockReq.flush('somedata');
    }
  ));

  it('should add parameters only for cms requests: cmsTicketId', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOnProperty(service, 'cmsTicketId', 'get').and.returnValue(
        'mockCmsTicketId'
      );

      http
        .get('https://localhost:9002/rest/v2/electronics/cms/page')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });
      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('cmsTicketId')).toEqual(
        'mockCmsTicketId'
      );
      mockReq.flush('somedata');
    }
  ));

  it('should not add parameters to other requests: cmsTicketId', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOnProperty(service, 'cmsTicketId', 'get').and.returnValue(
        'mockCmsTicketId'
      );

      http
        .get('https://localhost:9002/rest/v2/electronics/user')
        .subscribe(result => {
          expect(result).toBeTruthy();
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('cmsTicketId')).toEqual(null);
      mockReq.flush('somedata');
    }
  ));
});
