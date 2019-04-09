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
import { IdList } from '../model/idList.model';
import { HttpRequest } from '@angular/common/http';

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

fdescribe('OccCmsComponentAdapter', () => {
  let service: OccCmsComponentAdapter;
  let httpMock: HttpTestingController;

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
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Should get cms component data', () => {
    const context: PageContext = {
      id: 'testProductCode',
      type: PageType.PRODUCT_PAGE,
    };

    service.load('comp1', context).subscribe(result => {
      expect(result).toEqual(component);
    });

    const testRequest = httpMock.expectOne(req => {
      return req.method === 'GET' && req.url === endpoint + '/components/comp1';
    });

    expect(testRequest.request.params.get('productCode')).toEqual(
      'testProductCode'
    );
    expect(testRequest.cancelled).toBeFalsy();
    expect(testRequest.request.responseType).toEqual('json');
    testRequest.flush(component);
  });

  describe('Load list of cms component data', () => {
    it('Should get a list of cms component data without pagination parameters', () => {
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE,
      };

      service.loadList(ids, context).subscribe(result => {
        expect(result).toEqual(componentList);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint + '/components';
      });

      expect(testRequest.request.body).toEqual(ids);
      expect(testRequest.request.params.get('productCode')).toEqual('123');

      expect(testRequest.cancelled).toBeFalsy();
      expect(testRequest.request.responseType).toEqual('json');
      testRequest.flush(componentList);
    });

    it('Should get a list of cms component data with pagination parameters', () => {
      const ids: IdList = { idList: ['comp_uid1', 'comp_uid2'] };
      const context: PageContext = {
        id: '123',
        type: PageType.PRODUCT_PAGE,
      };

      service.loadList(ids, context, 'FULL', 0, 5).subscribe(result => {
        expect(result).toEqual(componentList);
      });

      const testRequest = httpMock.expectOne(req => {
        return req.method === 'POST' && req.url === endpoint + '/components';
      });

      const request: HttpRequest<any> = testRequest.request;
      expect(request.body).toEqual(ids);
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
