import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CmsComponent, PageType } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsStructureConfigService } from '../services';
import { OccCmsPageAdapter } from './occ-cms-page.adapter';
import { CMS_PAGE_NORMALIZE, ConverterService } from '@spartacus/core';
import createSpy = jasmine.createSpy;

const components: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' },
];

const cmsPageData: any = {
  uid: 'testPageId',
  name: 'testPage',
  template: 'testTemplate',
  contentSlots: {
    contentSlot: [
      { components: { component: components }, position: 'testPosition' },
    ],
  },
};

class CmsStructureConfigServiceMock {}

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

class MockComverterService {
  pipeable = createSpy().and.returnValue(x => x);
}

describe('OccCmsPageAdapter', () => {
  let service: OccCmsPageAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsPageAdapter,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
        { provide: ConverterService, useClass: MockComverterService },
      ],
    });

    service = TestBed.get(OccCmsPageAdapter);
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

    it('should use normalizer', () => {
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE,
      };

      const converter = TestBed.get(ConverterService);

      service.load(context).subscribe();

      httpMock
        .expectOne(req => req.url === endpoint + '/pages')
        .flush(cmsPageData);

      expect(converter.pipeable).toHaveBeenCalledWith(CMS_PAGE_NORMALIZE);
    });
  });
});
