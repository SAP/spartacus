import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccCmsService } from './occ-cms.service';
import { IdList } from './../model/idList.model';
import { CmsConfig } from '../config/cms-config';
import { CmsComponent, CMSPage, PageType } from '../../occ/occ-models/index';
import { PageContext } from '../../routing/index';

const comps: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' }
];
const cmsPageData: CMSPage = {
  uid: 'testPageId',
  name: 'testPage',
  template: 'testTemplate',
  contentSlots: {
    contentSlot: [
      { components: { component: comps }, position: 'testPosition' }
    ]
  }
};
const component: CmsComponent = {
  uid: 'comp1',
  typeCode: 'SimpleBannerComponent'
};
const listComponents: any = {
  component: [{ uid: 'comp_uid1' }, { uid: 'comp_uid2' }],
  pagination: { count: 10 }
};

const MockCmsModuleConfig: CmsConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: '',
    language: '',
    currency: ''
  }
};
const endpoint = '/cms';

describe('OccCmsService', () => {
  let service: OccCmsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsService,
        { provide: CmsConfig, useValue: MockCmsModuleConfig }
      ]
    });

    service = TestBed.get(OccCmsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load cms component', () => {
    it('should get cms component data without parameter fields', () => {
      const context: PageContext = {
        id: 'testProductCode',
        type: PageType.PRODUCT_PAGE
      };

      service.loadComponent('comp1', context).subscribe(result => {
        expect(result).toEqual(component);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' && req.url === endpoint + '/components/comp1'
        );
      });

      expect(mockReq.request.params.get('productCode')).toEqual(
        'testProductCode'
      );
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(component);
    });

    it('should get cms component data with parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };

      service.loadComponent('comp1', context, 'FULL').subscribe(result => {
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
        return req.method === 'GET' && req.url === endpoint + '/pages';
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
        return req.method === 'GET' && req.url === endpoint + '/pages';
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
        return req.method === 'GET' && req.url === endpoint + '/pages';
      });
      expect(mockReq.request.params.get('code')).toEqual('123');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(cmsPageData);
    });
  });

  describe('load list of cms component data', () => {
    it('should get a list of cms component data without pagination parameters', () => {
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE
      };

      service.loadListComponents(ids, context).subscribe(result => {
        expect(result).toEqual(listComponents);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint + '/components';
      });

      expect(mockReq.request.body).toEqual(ids);
      expect(mockReq.request.params.get('productCode')).toEqual('123');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(listComponents);
    });

    it('should get a list of cms component data with pagination parameters', () => {
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE
      };

      service
        .loadListComponents(ids, context, 'FULL', 0, 5)
        .subscribe(result => {
          expect(result).toEqual(listComponents);
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint + '/components';
      });

      expect(mockReq.request.body).toEqual(ids);
      expect(mockReq.request.params.get('productCode')).toEqual('123');
      expect(mockReq.request.params.get('fields')).toEqual('FULL');
      expect(mockReq.request.params.get('currentPage')).toEqual('0');
      expect(mockReq.request.params.get('pageSize')).toEqual('5');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(listComponents);
    });
  });
});
