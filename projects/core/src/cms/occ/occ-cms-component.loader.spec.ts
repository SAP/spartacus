import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CmsComponent, PageType } from '../../occ/occ-models/index';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { PageContext } from '../../routing/index';
import { CmsStructureConfig } from '../config';
import { CmsStructureConfigService } from '../services';
import { OccCmsComponentLoader } from './occ-cms-component.loader';

const components: CmsComponent[] = [
  { uid: 'comp1', typeCode: 'SimpleBannerComponent' },
  { uid: 'comp2', typeCode: 'CMSLinkComponent' },
  { uid: 'comp3', typeCode: 'NavigationComponent' },
];

const component: CmsComponent = components[1];

const CmsStructureConfigMock: CmsStructureConfig = {
  backend: {
    occ: {
      baseUrl: '',
      prefix: '',
    },
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

const endpoint = '/cms';

class OccEndpointsServiceMock {
  getEndpoint(): string {
    return endpoint;
  }
  getUrl(_endpoint: string, _urlParams?: any, _queryParams?: any): string {
    return `/cms/components/${_urlParams.id}?${this.flattentParams(
      _queryParams
    )}`;
  }
  private flattentParams(_queryParams?: any) {
    let flat = '';
    if (_queryParams) {
      for (const key in _queryParams) {
        if (key) {
          flat += `${key}=${_queryParams[key]}`;
        }
      }
    }
    return flat;
  }
}

describe('OccCmsComponentLoader', () => {
  let service: OccCmsComponentLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccCmsComponentLoader,
        { provide: OccEndpointsService, useClass: OccEndpointsServiceMock },
        {
          provide: CmsStructureConfig,
          useValue: CmsStructureConfigMock,
        },
        {
          provide: CmsStructureConfigService,
          useClass: CmsStructureConfigServiceMock,
        },
      ],
    });

    service = TestBed.get(OccCmsComponentLoader);
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
      return (
        req.method === 'GET' &&
        req.url === endpoint + `/components/comp1?productCode=${context.id}`
      );
    });

    expect(testRequest.cancelled).toBeFalsy();
    expect(testRequest.request.responseType).toEqual('json');
    testRequest.flush(component);
  });
});
