import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccCmsService } from './occ-cms.service';
import { ConfigService } from '../config.service';
import { PageContext, PageType } from '../../routing/models/page-context.model';

const comps: any[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' }
];
const cmsPageData: any = {
  pageId: 'testPageId',
  name: 'testPage',
  template: 'testTemplate',
  contentSlots: {
    contentSlot: [
      { components: { component: comps }, position: 'testPosition' }
    ]
  }
};

const component: any = { uid: 'comp1', typeCode: 'SimpleBannerComponent' };

export class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: '',
    language: '',
    currency: ''
  };
}
const endpoint = '/cms';

describe('OccCmsService', () => {
  let service: OccCmsService;
  let config: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccCmsService);
    httpMock = TestBed.get(HttpTestingController);
    config = TestBed.get(ConfigService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load cms component', () => {
    it('should get cms component data without parameter fields', () => {
      service.loadComponent('comp1').subscribe(result => {
        expect(result).toEqual(component);
      });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url: endpoint + '/components/comp1'
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(component);
    });

    it('should get cms component data with parameter fields', () => {
      service.loadComponent('comp1', 'FULL').subscribe(result => {
        expect(result).toEqual(component);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' && req.url === endpoint + '/components/comp1'
        );
      });
      expect(mockReq.request.params.get('fields')).toEqual('FULL');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(component);
    });
  });

  describe('load cms page data', () => {
    it('should get cms content page data without parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };
      service.loadPageData(context).subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/page';
      });
      expect(mockReq.request.params.get('pageLabelOrId')).toEqual('testPagId');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cmsPageData);
    });

    it('should get cms content page data with parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };
      service.loadPageData(context, 'BASIC').subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/page';
      });
      expect(mockReq.request.params.get('pageLabelOrId')).toEqual('testPagId');
      expect(mockReq.request.params.get('fields')).toEqual('BASIC');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cmsPageData);
    });

    it('should get cms product page data', () => {
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE
      };
      service.loadPageData(context).subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/page';
      });
      expect(mockReq.request.params.get('productCode')).toEqual('123');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cmsPageData);
    });
  });
});
