import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CMS_COMPONENT_NORMALIZER } from 'projects/core/src/cms/connectors/component/converters';
import { CmsComponent, PageType } from 'projects/core/src/model/cms.model';
import { PageContext } from 'projects/core/src/routing/models/page-context.model';
import { CmsStructureConfigService } from '../../../cms/services';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../occ-models/occ.models';
import { OccEndpointsService } from '../../services/occ-endpoints.service';
import { LegacyOccCmsComponentAdapter } from './legacy-occ-cms-component.adapter';
import { OccCmsComponentAdapter } from './occ-cms-component.adapter';

const ids = ['comp_uid1', 'comp_uid2'];

class OccEndpointsServiceMock {
  buildUrl(_endpoint: string, _urlParams?: any, _queryParams?: any): string {
    return '';
  }
}

const componentList: Occ.ComponentList = {
  component: [{ uid: 'comp_uid1' }, { uid: 'comp_uid2' }],
};

class CmsStructureConfigServiceMock {}

const pageContext: PageContext = {
  id: '123',
  type: PageType.PRODUCT_PAGE,
};

const spyOnPostEndpoint = `/cms/components?productCode=123`;

describe('LegacyOccCmsComponentAdapter', () => {
  let service: LegacyOccCmsComponentAdapter;
  let httpMock: HttpTestingController;
  let converter: ConverterService;
  let endpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LegacyOccCmsComponentAdapter,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
      ],
    });
    service = TestBed.inject(LegacyOccCmsComponentAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converter = TestBed.inject(ConverterService);
    endpointsService = TestBed.inject(OccEndpointsService);

    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get a list of cms component data without pagination', () => {
    spyOnEndpoint(spyOnPostEndpoint);

    assertPostSubscription(service);

    const testRequest = mockHttpRequest(
      'POST',
      '/cms/components?productCode=123'
    );

    assertPostTestRequestBody(testRequest);

    assertPostRequestGetUrl('DEFAULT', '2');

    assertTestRequest(testRequest, componentList);
  });

  it('should get a list of cms component data with pagination', () => {
    spyOnEndpoint(spyOnPostEndpoint);

    assertPostSubscription(service, 'FULL', 0, 5);

    const testRequest = mockHttpRequest('POST', spyOnPostEndpoint);

    assertPostTestRequestBody(testRequest);

    assertPostRequestGetUrl('FULL', '5');

    assertTestRequest(testRequest, componentList);
  });

  it('should use normalizer', () => {
    spyOnEndpoint(spyOnPostEndpoint);

    assertPostSubscription(service);

    assertNormalizer(spyOnPostEndpoint);
    assertConverterPipeableMany();
  });

  function assertPostSubscription(
    adapter: OccCmsComponentAdapter,
    fields?: string,
    currentPage?: number,
    pageSize?: number
  ) {
    adapter
      .findComponentsByIds(ids, pageContext, fields, currentPage, pageSize)
      .subscribe((result) => {
        expect(result).toEqual(componentList.component);
      });
  }

  function assertPostTestRequestBody(testRequest: TestRequest) {
    expect(testRequest.request.body).toEqual({ idList: ids });
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

  function assertConverterPipeableMany() {
    expect(converter.pipeableMany).toHaveBeenCalledWith(
      CMS_COMPONENT_NORMALIZER
    );
  }

  function assertNormalizer(requestUrl: string) {
    httpMock.expectOne((req) => req.url === requestUrl).flush(componentList);
  }

  function spyOnEndpoint(requestUrl: string): jasmine.Spy {
    return spyOn(endpointsService, 'buildUrl').and.returnValue(requestUrl);
  }

  function assertPostRequestGetUrl(fields: string, pageSize: string) {
    expect(endpointsService.buildUrl).toHaveBeenCalledWith('components', {
      queryParams: { fields, productCode: '123', currentPage: '0', pageSize },
    });
  }
});
