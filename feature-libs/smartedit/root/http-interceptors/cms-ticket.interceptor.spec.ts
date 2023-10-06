import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import {
  FeatureConfigService,
  PageContext,
  PageType,
  RoutingService,
  defaultOccConfig,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { SmartEditLauncherService } from '../services/smart-edit-launcher.service';
import { CmsTicketInterceptor } from './cms-ticket.interceptor';

const OccUrl = `https://localhost:9002${defaultOccConfig.backend.occ.prefix}electronics`;

class MockSmartEditLauncherService {
  private _cmsTicketId: string;
  get cmsTicketId(): string {
    return this._cmsTicketId;
  }
}
const mockPageContext = {
  id: 'mockCode',
  type: PageType.CATEGORY_PAGE,
};
class MockRoutingService implements Partial<RoutingService> {
  getPageContext(): Observable<PageContext> {
    return of(mockPageContext);
  }
}

describe('CmsTicketInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: SmartEditLauncherService;
  let routingService: RoutingService;
  let featureConfig: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: SmartEditLauncherService,
          useClass: MockSmartEditLauncherService,
        },
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CmsTicketInterceptor,
          multi: true,
        },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SmartEditLauncherService);
    routingService = TestBed.inject(RoutingService);
    featureConfig = TestBed.inject(FeatureConfigService);
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

  it('should add parameters for product requests: cmsTicketId', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOnProperty(service, 'cmsTicketId', 'get').and.returnValue(
        'mockCmsTicketId'
      );

      http.get(`${OccUrl}/products/mockId`).subscribe((result) => {
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

  it('should add parameters for productList requests: cmsTicketId, pageType, code', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(featureConfig, 'isLevel').and.returnValue(true);
      spyOnProperty(service, 'cmsTicketId', 'get').and.returnValue(
        'mockCmsTicketId'
      );

      http.get(`${OccUrl}/productList`).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('cmsTicketId')).toEqual(
        'mockCmsTicketId'
      );
      expect(mockReq.request.params.get('pageType')).toEqual(
        PageType.CATEGORY_PAGE
      );
      expect(mockReq.request.params.get('code')).toEqual('mockCode');
      mockReq.flush('somedata');
    }
  ));

  it('should add only one parameter for productList requests when pageContext is partial: cmsTicketId', inject(
    [HttpClient],
    (http: HttpClient) => {
      spyOn(featureConfig, 'isLevel').and.returnValue(true);
      spyOn(routingService, 'getPageContext').and.returnValue(
        of({
          ...mockPageContext,
          id: '',
        })
      );

      spyOnProperty(service, 'cmsTicketId', 'get').and.returnValue(
        'mockCmsTicketId'
      );

      http.get(`${OccUrl}/productList`).subscribe((result) => {
        expect(result).toBeTruthy();
      });
      const mockReq = httpMock.expectOne((req) => {
        return req.method === 'GET';
      });

      expect(mockReq.request.params.get('cmsTicketId')).toEqual(
        'mockCmsTicketId'
      );
      expect(mockReq.request.params.get('pageType')).toBeFalsy();
      expect(mockReq.request.params.get('code')).toBeFalsy();
      mockReq.flush('somedata');
    }
  ));
});
