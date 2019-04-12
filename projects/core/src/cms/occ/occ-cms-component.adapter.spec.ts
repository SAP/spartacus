import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  CmsComponent,
  CmsComponentList,
  PageType,
} from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsStructureConfigService } from '../services';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';
import { HttpRequest } from '@angular/common/http';
import {
  CMS_COMPONENT_LIST_NORMALIZER,
  CMS_COMPONENT_NORMALIZER,
  ConverterService,
} from '@spartacus/core';
import createSpy = jasmine.createSpy;

const components: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' },
];

const component: CmsComponent = components[1];

const componentList: CmsComponentList = {
  component: [{ uid: 'comp_uid1' }, { uid: 'comp_uid2' }],
  pagination: { count: 10 },
};

class CmsStructureConfigServiceMock {}

const endpoint = '/cms';

class OccEndpointsServiceMock {
  getEndpoint(): string {
    return endpoint;
  }
}

class MockConverterService {
  pipeable = createSpy().and.returnValue(x => x);
}

const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

const ids = ['comp_uid1', 'comp_uid2'];

describe('OccCmsComponentAdapter', () => {
  let service: OccCmsComponentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsComponentAdapter,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        { provide: ConverterService, useClass: MockConverterService },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
      ],
    });

    service = TestBed.get(OccCmsComponentAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load', () => {
    it('Should get cms component data', () => {
      service.load('comp1', context).subscribe(result => {
        expect(result).toEqual(component);
      });

      const testRequest = httpMock.expectOne(req => {
        return (
          req.method === 'GET' && req.url === endpoint + '/components/comp1'
        );
      });

      expect(testRequest.request.params.get('productCode')).toEqual('123');
      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(component);
    });

    it('should use normalizer', () => {
      service.load('comp1', context).subscribe();
      httpMock
        .expectOne(req => req.url === endpoint + '/components/comp1')
        .flush(component);

      expect(converter.pipeable).toHaveBeenCalledWith(CMS_COMPONENT_NORMALIZER);
    });
  });

  describe('Load list of cms component data', () => {
    it('Should get a list of cms component data without pagination parameters', () => {
      service.loadList(ids, context).subscribe(result => {
        expect(result).toEqual(componentList);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint + '/components';
      });

      expect(testRequest.request.body).toEqual({ idList: ids });
      expect(testRequest.request.params.get('productCode')).toEqual('123');

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(componentList);
    });

    it('Should get a list of cms component data with pagination parameters', () => {
      service.loadList(ids, context, 'FULL', 0, 5).subscribe(result => {
        expect(result).toEqual(componentList);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint + '/components';
      });

      const request: HttpRequest<any> = testRequest.request;
      expect(request.body).toEqual({ idList: ids });
      expect(request.params.get('productCode')).toEqual('123');
      expect(request.params.get('fields')).toEqual('FULL');
      expect(request.params.get('currentPage')).toEqual('0');
      expect(request.params.get('pageSize')).toEqual('5');

      expect(request.responseType).toEqual('json');

      expect(testRequest.cancelled).toBeFalsy();
      testRequest.flush(componentList);
    });

    it('should use normalizer', () => {
      service.loadList(ids, context).subscribe();

      httpMock
        .expectOne(req => req.url === endpoint + '/components')
        .flush(componentList);

      expect(converter.pipeable).toHaveBeenCalledWith(
        CMS_COMPONENT_LIST_NORMALIZER
      );
    });
  });
});
