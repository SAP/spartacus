import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
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
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FeatureConfigService, UserIdService } from '@spartacus/core';

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

const userEndpoint = '/users/${userId}/cms';

class OccEndpointsServiceMock {
  buildUrl(_endpoint: string, _urlParams?: any, _queryParams?: any): string {
    return '';
  }
}

const context: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

const ids = ['comp_uid1', 'comp_uid2'];

const spyOnLoadEndpoint = (_endpoint = endpoint) =>
  _endpoint + `/components/comp1?productCode=${context.id}`;

const spyOnGetEndpoint = (_endpoint = endpoint) =>
  _endpoint +
  `/components?componentIds=${ids.toString()}&productCode=${context.id}`;

describe('OccCmsComponentAdapter', () => {
  let service: OccCmsComponentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let endpointsService: OccEndpointsService;
  let userIdService: UserIdService;
  let featureConfigService: FeatureConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsComponentAdapter,
        UserIdService,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
      ],
    });
    service = TestBed.inject(OccCmsComponentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    endpointsService = TestBed.inject(OccEndpointsService);
    userIdService = TestBed.inject(UserIdService);
    featureConfigService = TestBed.inject(FeatureConfigService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('user endpoints', () => {
    beforeEach(() => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(true);
    });

    describe('load', () => {
      it('should get cms component data', (done) => {
        spyOn(userIdService, 'getUserId').and.returnValue(of('anonymous'));
        spyOnEndpoint(spyOnLoadEndpoint(userEndpoint));

        service.load('comp1', context).subscribe((result) => {
          expect(result).toEqual(component);
        });

        const testRequest = mockHttpRequest(
          'GET',
          spyOnLoadEndpoint(userEndpoint)
        );

        expect(endpointsService.buildUrl).toHaveBeenCalledWith('component', {
          urlParams: { id: 'comp1', userId: 'anonymous' },
          queryParams: { productCode: '123' },
        });

        assertTestRequest(testRequest, component);
        done();
      });

      it('should use normalizer', (done) => {
        spyOn(userIdService, 'getUserId').and.returnValue(of('anonymous'));
        spyOnEndpoint(spyOnLoadEndpoint(userEndpoint));

        service.load('comp1', context).subscribe();

        assertNormalizer(spyOnLoadEndpoint(userEndpoint));

        expect(converter.pipeable).toHaveBeenCalledWith(
          CMS_COMPONENT_NORMALIZER
        );
        done();
      });
    });

    describe('load list of cms component data using GET request', () => {
      it('should get a list of cms component data using GET request without pagination parameters', (done) => {
        spyOn(userIdService, 'getUserId').and.returnValue(of('anonymous'));
        spyOnEndpoint(spyOnGetEndpoint(userEndpoint));

        assertGetSubscription(service).subscribe();
        const testRequest = mockHttpRequest(
          'GET',
          spyOnGetEndpoint(userEndpoint)
        );

        assertGetRequestGetUrl('DEFAULT', '2', true);

        assertTestRequest(testRequest, componentList);
        done();
      });

      it('should get a list of cms component data using GET request with pagination parameters', (done) => {
        spyOn(userIdService, 'getUserId').and.returnValue(of('anonymous'));
        spyOnEndpoint(spyOnGetEndpoint(userEndpoint));

        assertGetSubscription(service, 'FULL', 0, 5).subscribe();
        const testRequest = mockHttpRequest(
          'GET',
          spyOnGetEndpoint(userEndpoint)
        );

        assertGetRequestGetUrl('FULL', '5', true);

        assertTestRequest(testRequest, componentList);
        done();
      });

      it('should use normalizer', (done) => {
        spyOn(userIdService, 'getUserId').and.returnValue(of('anonymous'));
        spyOnEndpoint(spyOnGetEndpoint(userEndpoint));

        assertGetSubscription(service).subscribe();
        assertNormalizer(spyOnGetEndpoint(userEndpoint));
        assertConverterPipeableMany();
        done();
      });
    });
  });

  describe('default endpoints', () => {
    beforeEach(() => {
      spyOn(featureConfigService, 'isEnabled').and.returnValue(false);
    });

    describe('load', () => {
      it('should get cms component data', (done) => {
        spyOnEndpoint(spyOnLoadEndpoint());

        service.load('comp1', context).subscribe((result) => {
          expect(result).toEqual(component);
        });

        const testRequest = mockHttpRequest('GET', spyOnLoadEndpoint());

        expect(endpointsService.buildUrl).toHaveBeenCalledWith('component', {
          urlParams: { id: 'comp1' },
          queryParams: { productCode: '123' },
        });

        assertTestRequest(testRequest, component);
        done();
      });

      it('should use normalizer', (done) => {
        spyOnEndpoint(spyOnLoadEndpoint());

        service.load('comp1', context).subscribe();

        assertNormalizer(spyOnLoadEndpoint());

        expect(converter.pipeable).toHaveBeenCalledWith(
          CMS_COMPONENT_NORMALIZER
        );
        done();
      });
    });

    describe('load list of cms component data using GET request', () => {
      it('should get a list of cms component data using GET request without pagination parameters', (done) => {
        spyOnEndpoint(spyOnGetEndpoint());

        assertGetSubscription(service).subscribe();

        const testRequest = mockHttpRequest('GET', spyOnGetEndpoint());

        assertGetRequestGetUrl('DEFAULT', '2');

        assertTestRequest(testRequest, componentList);
        done();
      });

      it('should get a list of cms component data using GET request with pagination parameters', (done) => {
        spyOnEndpoint(spyOnGetEndpoint());

        assertGetSubscription(service, 'FULL', 0, 5).subscribe();

        const testRequest = mockHttpRequest('GET', spyOnGetEndpoint());

        assertGetRequestGetUrl('FULL', '5');

        assertTestRequest(testRequest, componentList);
        done();
      });

      it('should use normalizer', (done) => {
        spyOnEndpoint(spyOnGetEndpoint());

        assertGetSubscription(service).subscribe();

        assertNormalizer(spyOnGetEndpoint());
        assertConverterPipeableMany();
        done();
      });
    });
  });

  function spyOnEndpoint(requestUrl: string): jasmine.Spy {
    return spyOn(endpointsService, 'buildUrl').and.returnValue(requestUrl);
  }

  function mockHttpRequest(
    requestMethod: string,
    requestUrl: string
  ): TestRequest {
    return httpMock.expectOne((req) => {
      return req.method === requestMethod && req.url === requestUrl;
    });
  }

  function assertTestRequest(
    testRequest: TestRequest,
    componentObj: CmsComponent | Occ.ComponentList
  ) {
    expect(testRequest.cancelled).toBeFalsy();
    expect(testRequest.request.responseType).toEqual('json');
    testRequest.flush(componentObj);
  }

  function assertGetRequestGetUrl(
    fields: string,
    pageSize: string,
    isUserId = false
  ) {
    const queryParams = {
      fields,
      componentIds: ids.toString(),
      productCode: '123',
      currentPage: '0',
      pageSize,
    };

    expect(endpointsService.buildUrl).toHaveBeenCalledWith(
      'components',
      isUserId
        ? {
            queryParams,
            urlParams: { userId: 'anonymous' },
          }
        : {
            queryParams,
          }
    );
  }

  function assertConverterPipeableMany() {
    expect(converter.pipeableMany).toHaveBeenCalledWith(
      CMS_COMPONENT_NORMALIZER
    );
  }

  function assertNormalizer(requestUrl: string) {
    httpMock.expectOne((req) => req.url === requestUrl).flush(componentList);
  }

  function assertGetSubscription(
    adapter: OccCmsComponentAdapter,
    fields?: string,
    currentPage?: number,
    pageSize?: number
  ): Observable<CmsComponent[]> {
    return adapter
      .findComponentsByIds(ids, context, fields, currentPage, pageSize)
      .pipe(
        tap((result) => {
          expect(result).toEqual(componentList.component);
        })
      );
  }
});
