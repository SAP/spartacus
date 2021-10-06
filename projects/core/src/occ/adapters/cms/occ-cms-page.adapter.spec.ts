import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CMS_PAGE_NORMALIZER } from '../../../cms/connectors';
import { CmsStructureConfigService } from '../../../cms/services';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { HOME_PAGE_CONTEXT, PageContext } from '../../../routing';
import { ConverterService } from '../../../util/converter.service';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccCmsPageAdapter } from './occ-cms-page.adapter';
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
  buildUrl(_endpoint: string, _urlParams?: any, _queryParams?: any): string {
    return '';
  }
}

class MockConverterService {
  pipeable = createSpy().and.returnValue((x) => x);
}

const homePageContext: PageContext = {
  id: HOME_PAGE_CONTEXT,
  type: PageType.CONTENT_PAGE,
};

const contentPageContext: PageContext = {
  id: 'testPagId',
  type: PageType.CONTENT_PAGE,
};

const contextWithoutType: PageContext = {
  id: 'xyz',
};

const productPageContext: PageContext = {
  id: 'p123',
  type: PageType.PRODUCT_PAGE,
};

const categoryPageContext: PageContext = {
  id: 'c456',
  type: PageType.CATEGORY_PAGE,
};

describe('OccCmsPageAdapter', () => {
  let service: OccCmsPageAdapter;
  let httpMock: HttpTestingController;
  let endpointsService: OccEndpointsService;

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
        { provide: ConverterService, useClass: MockConverterService },
      ],
    });
    service = TestBed.inject(OccCmsPageAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    endpointsService = TestBed.inject(OccEndpointsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('endpoint configuration', () => {
    it('should get cms home page by specific context', () => {
      spyOn(endpointsService, 'buildUrl');
      service.load(homePageContext);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {},
      });
    });

    it('should get cms pages by page type and id for any page', () => {
      spyOn(endpointsService, 'buildUrl');
      service.load(contentPageContext);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {
          pageLabelOrId: contentPageContext.id,
          pageType: PageType.CONTENT_PAGE,
        },
      });
    });

    it('should get cms pages by page type and id for any page', () => {
      spyOn(endpointsService, 'buildUrl');
      service.load(homePageContext);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {},
      });
    });

    it('should get cms product page by product code and ProductPage type', () => {
      spyOn(endpointsService, 'buildUrl');
      service.load(productPageContext);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {
          pageType: PageType.PRODUCT_PAGE,
          code: productPageContext.id,
        },
      });
    });

    it('should get cms category page by category code and CategoryPage type', () => {
      spyOn(endpointsService, 'buildUrl');
      service.load(categoryPageContext);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {
          pageType: PageType.CATEGORY_PAGE,
          code: categoryPageContext.id,
        },
      });
    });

    it('should get cms page by pageId if there is no PageType', () => {
      spyOn(endpointsService, 'buildUrl');
      service.load(contextWithoutType);
      expect(endpointsService.buildUrl).toHaveBeenCalledWith('page', {
        urlParams: { id: contextWithoutType.id },
      });
    });
  });

  describe('http', () => {
    it('Should get home page', () => {
      spyOn(endpointsService, 'buildUrl').and.returnValue(endpoint + `/pages`);

      service.load(homePageContext).subscribe((result) => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne((req) => {
        return req.method === 'GET' && req.url === endpoint + `/pages`;
      });

      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {},
      });
      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('Should get cms content page data', () => {
      spyOn(endpointsService, 'buildUrl').and.returnValue(
        endpoint +
          `/pages?pageType=${contentPageContext.type}&pageLabelOrId=${contentPageContext.id}`
      );

      service.load(contentPageContext).subscribe((result) => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            endpoint +
              `/pages?pageType=${contentPageContext.type}&pageLabelOrId=${contentPageContext.id}`
        );
      });

      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {
          pageType: contentPageContext.type,
          pageLabelOrId: contentPageContext.id,
        },
      });
      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('should get cms product page data', () => {
      spyOn(endpointsService, 'buildUrl').and.returnValue(
        endpoint +
          `/pages?pageType=${productPageContext.type}&code=${productPageContext.id}`
      );
      service.load(productPageContext).subscribe((result) => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url ===
            endpoint +
              `/pages?pageType=${productPageContext.type}&code=${productPageContext.id}`
        );
      });

      expect(endpointsService.buildUrl).toHaveBeenCalledWith('pages', {
        queryParams: {
          pageType: productPageContext.type,
          code: productPageContext.id,
        },
      });
      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });

    it('should get cms page data by pageId if PageType is unknown', () => {
      spyOn(endpointsService, 'buildUrl').and.returnValue(
        endpoint + `/pages/${contextWithoutType.id}`
      );
      service.load(contextWithoutType).subscribe((result) => {
        expect(result).toEqual(cmsPageData);
      });

      const testRequest = httpMock.expectOne((req) => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/pages/${contextWithoutType.id}`
        );
      });

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(cmsPageData);
    });
  });

  describe('normalizer', () => {
    it('should use normalizer', () => {
      spyOn(endpointsService, 'buildUrl').and.returnValue(endpoint + '/pages');
      const converter = TestBed.inject(ConverterService);

      service.load(contentPageContext).subscribe();

      httpMock
        .expectOne((req) => req.url === endpoint + '/pages')
        .flush(cmsPageData);

      expect(converter.pipeable).toHaveBeenCalledWith(CMS_PAGE_NORMALIZER);
    });
  });
});
