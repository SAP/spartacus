import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CMS_COMPONENT_NORMALIZER } from '../../../cms/connectors/component/converters';
import { CmsStructureConfigService } from '../../../cms/services';
import { CmsComponent, PageType } from '../../../model/cms.model';
import { PageContext } from '../../../routing';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';

const components: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' },
];

const component: CmsComponent = components[1];

const componentList: Occ.ComponentList = {
  component: [{ uid: 'comp_uid1' }, { uid: 'comp_uid2' }],
};

class CmsStructureConfigServiceMock {}

const endpoint = '/cms';

class OccEndpointsServiceMock {
  getEndpoint(): string {
    return endpoint;
  }
  getUrl(_endpoint: string, _urlParams?: any, _queryParams?: any): string {
    return '';
  }
}

const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

const ids = ['comp_uid1', 'comp_uid2'];

fdescribe('OccCmsComponentAdapter', () => {
  let service: OccCmsComponentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let endpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsComponentAdapter,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
      ],
    });

    service = TestBed.get(OccCmsComponentAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    endpointsService = TestBed.get(OccEndpointsService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load', () => {
    it('should get cms component data', () => {
      spyOn(endpointsService, 'getUrl').and.returnValue(
        endpoint + `/components/comp1?productCode=${context.id}`
      );
      service.load('comp1', context).subscribe(result => {
        expect(result).toEqual(component);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url === endpoint + `/components/comp1?productCode=${context.id}`
        );
      });

      expect(endpointsService.getUrl).toHaveBeenCalledWith(
        'component',
        { id: 'comp1' },
        { productCode: '123' }
      );
      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(component);
    });

    it('should use normalizer', () => {
      spyOn(endpointsService, 'getUrl').and.returnValue(
        endpoint + `/components/comp1?productCode=${context.id}`
      );
      service.load('comp1', context).subscribe();
      httpMock
        .expectOne(
          req =>
            req.url === endpoint + `/components/comp1?productCode=${context.id}`
        )
        .flush(component);

      expect(converter.pipeable).toHaveBeenCalledWith(CMS_COMPONENT_NORMALIZER);
    });
  });

  describe('Load list of cms component data', () => {
    it('should get a list of cms component data without pagination parameters', () => {
      mockRequest('DEFAULT', 0, 2);
    });

    it('should use a post request when get fails to get a list of cms component data without pagination parameters - 400', () => {
      mockFailedRequest('Bad Request', 400, 'DEFAULT', 0, 2);
    });

    it('should use a post request when get fails to get a list of cms component data without pagination parameters - 405', () => {
      mockFailedRequest('Method Not Allowed', 405, 'DEFAULT', 0, 2);
    });

    it('should get a list of cms component data with pagination parameters', () => {
      mockRequest('FULL', 0, 5);
    });

    it('should use a post request when get fails to get a list of cms component data with pagination parameters - 400', () => {
      mockFailedRequest('Bad Request', 400, 'FULL', 0, 5);
    });

    it('should use a post request when get fails to get a list of cms component data with pagination parameters - 405', () => {
      mockFailedRequest('Method Not Allowed', 405, 'FULL', 0, 5);
    });

    it('should use normalizer', () => {
      spyOn(endpointsService, 'getUrl').and.returnValue(
        endpoint + '/components'
      );

      service.findComponentsByIds(ids, context).subscribe();

      httpMock
        .expectOne(req => req.url === endpoint + '/components')
        .flush(componentList);

      expect(converter.pipeableMany).toHaveBeenCalledWith(
        CMS_COMPONENT_NORMALIZER
      );
    });
  });

  function mockRequest(
    fields?: string,
    currentPage?: number,
    pageSize?: number
  ) {
    spyOn(endpointsService, 'getUrl').and.returnValue(
      endpoint +
        `/components?componentIds=${ids.toString()}&productCode=${context.id}`
    );

    service
      .findComponentsByIds(ids, context, fields, currentPage, pageSize)
      .subscribe(result => {
        expect(result).toEqual(componentList.component);
      });

    const testRequest = httpMock.expectOne(req => {
      return (
        req.method === 'GET' &&
        req.url ===
          endpoint +
            `/components?componentIds=${ids.toString()}&productCode=${
              context.id
            }`
      );
    });

    expect(endpointsService.getUrl).toHaveBeenCalledWith(
      'components',
      { fields },
      {
        componentIds: ids.toString(),
        productCode: '123',
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString(),
      }
    );

    expect(testRequest.request.responseType).toEqual('json');
    expect(testRequest.cancelled).toBeFalsy();
    testRequest.flush(componentList);
  }

  function mockFailedRequest(
    statusText: string,
    statusCode: number,
    fields?: string,
    currentPage?: number,
    pageSize?: number
  ) {
    spyOn(endpointsService, 'getUrl').and.returnValues(
      endpoint +
        `/components?componentIds=${ids.toString()}&productCode=${context.id}`,
      endpoint + `/components?productCode=${context.id}`
    );

    service
      .findComponentsByIds(ids, context, fields, currentPage, pageSize)
      .subscribe(result => {
        expect(result).toEqual(componentList.component);
      });

    const testRequest = httpMock.expectOne(req => {
      return (
        req.method === 'GET' &&
        req.url ===
          endpoint +
            `/components?componentIds=${ids.toString()}&productCode=${
              context.id
            }`
      );
    });

    testRequest.flush(
      { error: statusText },
      { status: statusCode, statusText: statusText }
    );

    const testRequestPOST = httpMock.expectOne(req => {
      return (
        req.method === 'POST' &&
        req.url === endpoint + `/components?productCode=${context.id}`
      );
    });

    expect(testRequestPOST.request.body).toEqual({ idList: ids });
    expect(endpointsService.getUrl).toHaveBeenCalledWith(
      'components',
      { fields },
      {
        productCode: '123',
        currentPage: currentPage.toString(),
        pageSize: pageSize.toString(),
      }
    );

    expect(testRequestPOST.cancelled).toBeFalsy();
    expect(testRequestPOST.request.responseType).toEqual('json');
    testRequestPOST.flush(componentList);
  }
});
