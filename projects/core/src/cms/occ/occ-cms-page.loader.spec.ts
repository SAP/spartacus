import { HttpRequest } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CmsComponent,
  CmsComponentList,
  CMSPage,
  PageType,
} from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsStructureConfig } from '../config';
import { IdList } from '../model/idList.model';
import { CmsPageAdapter, CmsStructureConfigService } from '../services';
import { OccCmsPageLoader } from './occ-cms-page.loader';

const components: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' },
];

const cmsPageData: CMSPage = {
  uid: 'testPageId',
  name: 'testPage',
  template: 'testTemplate',
  contentSlots: {
    contentSlot: [
      { components: { component: components }, position: 'testPosition' },
    ],
  },
};

const componentList: CmsComponentList = {
  component: [{ uid: 'comp_uid1' }, { uid: 'comp_uid2' }],
  pagination: { count: 10 },
};

const CmsStructureConfigMock: CmsStructureConfig = {
  server: {
    baseUrl: '',
    occPrefix: '',
  },

  site: {
    baseSite: '',
    language: '',
    currency: '',
  },
  cmsStructure: {
    pages: [],
    slots: {},
  },
};

class CmsStructureConfigServiceMock {}

class AdapterMock {}

const endpoint = '/cms';

class OccEndpointsServiceMock {
  getEndpoint(): string {
    return endpoint;
  }
  getUrl(_endpoint: string, _urlParams?: any, _queryParams?: any): string {
    if (_endpoint === 'pages') {
      return (
        endpoint +
        `/pages?fields=${_urlParams.fields}${this.flattentParams(_queryParams)}`
      );
    } else {
      return (
        endpoint +
        `/components?fields=${_urlParams.fields}${this.flattentParams(
          _queryParams
        )}`
      );
    }
  }
  private flattentParams(_queryParams?: any) {
    let flat = '';
    if (_queryParams) {
      for (const key in _queryParams) {
        if (key) {
          flat += `&${key}=${_queryParams[key]}`;
        }
      }
    }
    return flat;
  }
}

describe('OccCmsPageLoader', () => {
  let service: OccCmsPageLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsPageLoader,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: CmsStructureConfig,
          useValue: CmsStructureConfigMock,
        },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
        { provide: CmsPageAdapter, useClass: AdapterMock },
      ],
    });

    service = TestBed.get(OccCmsPageLoader);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Load cms page data', () => {
    it('Should get cms content page data without parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE,
      };

      service.load(context).subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            endpoint +
              `/pages?fields=DEFAULT&pageType=${context.type}&pageLabelOrId=${
                context.id
              }`
        );
      });

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('Should get cms content page data with parameter fields', () => {
      const context: PageContext = {
        id: 'testPagId',
        type: PageType.CONTENT_PAGE,
      };

      service.load(context, 'BASIC').subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            endpoint +
              `/pages?fields=BASIC&pageType=${context.type}&pageLabelOrId=${
                context.id
              }`
        );
      });

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('should get cms product page data', () => {
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE,
      };
      service.load(context).subscribe(result => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            endpoint +
              `/pages?fields=DEFAULT&pageType=${context.type}&code=${
                context.id
              }`
        );
      });

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
        type: PageType.PRODUCT_PAGE,
      };

      service.loadListComponents(ids, context).subscribe(result => {
        expect(result).toEqual(componentList);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            endpoint + `/components?fields=DEFAULT&productCode=${context.id}`
        );
      });

      expect(testRequest.request.body).toEqual(ids);

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(componentList);
    });

    it('Should get a list of cms component data with pagination parameters', () => {
      const currentPage = 0;
      const pageSize = 5;
      const fields = 'FULL';
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE,
      };

      service
        .loadListComponents(ids, context, 'FULL', 0, 5)
        .subscribe(result => {
          expect(result).toEqual(componentList);
        });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'POST' &&
          req.url ===
            endpoint +
              `/components?fields=${fields}&productCode=${
                context.id
              }&currentPage=${currentPage}&pageSize=${pageSize}`
        );
      });

      const request: HttpRequest<any> = testRequest.request;
      expect(request.body).toEqual(ids);

      expect(request.responseType).toEqual('json');

      expect(testRequest.cancelled).toBeFalsy();
      testRequest.flush(componentList);
    });
  });
});
