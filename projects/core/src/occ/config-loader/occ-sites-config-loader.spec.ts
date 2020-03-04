import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BaseSite } from '../../model/misc.model';
import { OccConfig } from '../config/occ-config';
import { OccSitesConfigLoader } from './occ-sites-config-loader';

describe(`OccSitesConfigLoader`, () => {
  let loader: OccSitesConfigLoader;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const mockConfig: OccConfig = {
      backend: {
        occ: {
          baseUrl: 'baseUrl',
          prefix: '/prefix/',
        },
      },
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: OccConfig, useValue: mockConfig }],
    });

    loader = TestBed.inject(OccSitesConfigLoader);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('load', () => {
    it('should load configuration of all base sites', () => {
      const mockBaseSites: BaseSite[] = [{ uid: 'test-site' }];

      loader.load().subscribe(result => {
        expect(result).toEqual(mockBaseSites);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url:
          'baseUrl/prefix/basesites?fields=baseSites(uid,defaultLanguage(isocode),urlEncodingAttributes,urlPatterns,stores(currencies(isocode),defaultCurrency(isocode),languages(isocode),defaultLanguage(isocode)))',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({ baseSites: mockBaseSites });
    });
  });
});
