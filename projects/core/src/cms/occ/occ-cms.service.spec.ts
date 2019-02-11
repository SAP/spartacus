import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccCmsService } from './occ-cms.service';
import { IdList } from './../model/idList.model';
import { CmsConfig } from '../config/cms-config';
import {
  CmsComponent,
  CMSPage,
  PageType,
  CmsComponentList
} from '../../occ/occ-models/index';
import { PageContext } from '../../routing/index';
import { HttpRequest } from '@angular/common/http';

const components: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' }
];

const component: CmsComponent = components[1];

const cmsPageData: CMSPage = {
  uid: 'testPageId',
  name: 'testPage',
  template: 'testTemplate',
  contentSlots: {
    contentSlot: [
      { components: { component: components }, position: 'testPosition' }
    ]
  }
};

const componentList: CmsComponentList = {
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

fdescribe('OccCmsService', () => {
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

  describe('Load cms component', () => {
    it('Should get cms component data without parameter fields', () => {
      const context: PageContext = {
        id: 'testProductCode',
        type: PageType.PRODUCT_PAGE
      };

      service.loadComponent('comp1', context).subscribe(result => {
        expect(result).toEqual(component);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' && req.url === endpoint + '/components/comp1'
        );
      });

      expect(testRequest.request.params.get('productCode')).toEqual(
        'testProductCode'
      );
      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(component);
    });

    it('Should get cms component data with parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };

      service.loadComponent('comp1', context, 'FULL').subscribe(result => {
        expect(result).toEqual(component);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' && req.url === endpoint + '/components/comp1'
        );
      });
      expect(testRequest.request.params.get('fields')).toEqual('FULL');

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(component);
    });
  });

  describe('Load cms page data', () => {
    it('Should get cms content page data without parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };

      service.loadPageData(context).subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/pages';
      });

      expect(testRequest.request.params.get('pageLabelOrId')).toEqual(
        'testPagId'
      );

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('Should get cms content page data with parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE
      };

      service.loadPageData(context, 'BASIC').subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/pages';
      });

      expect(testRequest.request.params.get('pageLabelOrId')).toEqual(
        'testPagId'
      );
      expect(testRequest.request.params.get('fields')).toEqual('BASIC');

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('should get cms product page data', () => {
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE
      };
      service.loadPageData(context).subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/pages';
      });
      expect(testRequest.request.params.get('code')).toEqual('123');

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });
  });

  describe('Load list of cms component data', () => {
    it('Should get a list of cms component data without pagination parameters', () => {
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE
      };

      service.loadListComponents(context, ids).subscribe(result => {
        expect(result).toEqual(componentList);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/components';
      });

      expect(testRequest.request.params.get('componentIds')).toEqual(
        ids.idList.toString()
      );
      expect(testRequest.request.params.get('productCode')).toEqual('123');

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(componentList);
    });

    it('Should get a list of cms component data with pagination parameters', () => {
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE
      };

      service
        .loadListComponents(context, ids, 'FULL', 0, 5)
        .subscribe(result => {
          expect(result).toEqual(componentList);
        });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/components';
      });

      const request: HttpRequest<any> = testRequest.request;
      expect(request.params.get('componentIds')).toEqual(ids.idList.toString());
      expect(request.params.get('productCode')).toEqual('123');
      expect(request.params.get('fields')).toEqual('FULL');
      expect(request.params.get('currentPage')).toEqual('0');
      expect(request.params.get('pageSize')).toEqual('5');

      expect(request.responseType).toEqual('json');

      expect(testRequest.cancelled).toBeFalsy();
      testRequest.flush(componentList);
    });
  });
});
