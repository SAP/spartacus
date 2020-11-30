import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { defaultOccConfig } from '../../occ/config/default-occ-config';
import { SmartEditService } from '../services/smart-edit.service';
import { CmsTicketInterceptor } from './cms-ticket.interceptor';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}electronics`;

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
          useClass: MockSmartEditService,
        },

        {
          provide: HTTP_INTERCEPTORS,
          useClass: CmsTicketInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SmartEditService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should not add parameters: cmsTicketId', inject(
    [HttpClient],
    (http: HttpClient) => {
      http.get('/xxx').subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
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

      http.get(`${OccUrl}/cms/page`).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
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

      http.get(`${OccUrl}/user`).subscribe((result) => {
        expect(result).toBeTruthy();
      });

      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('cmsTicketId')).toEqual(null);
      mockReq.flush('somedata');
    }
  ));
});
