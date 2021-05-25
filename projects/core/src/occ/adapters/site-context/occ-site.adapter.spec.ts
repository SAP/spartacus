import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ConverterService, CountryType } from '@spartacus/core';
import {
  BASE_SITE_NORMALIZER,
  COUNTRY_NORMALIZER,
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
  REGION_NORMALIZER,
} from '../../../site-context/connectors/converters';
import { defaultOccConfig } from '../../config/default-occ-config';
import { OccConfig } from '../../config/occ-config';
import { Occ } from '../../occ-models/occ.models';
import {
  BaseOccUrlProperties,
  DynamicAttributes,
  OccEndpointsService,
} from '../../services';
import { OccSiteAdapter } from './occ-site.adapter';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'base-url',
      prefix: defaultOccConfig.backend.occ.prefix,
    },
  },

  context: {
    baseSite: ['test-site'],
  },
};

class MockOccEndpointsService implements Partial<OccEndpointsService> {
  getEndpoint(url: string) {
    return url;
  }
  getBaseUrl() {
    return (
      MockOccModuleConfig.backend.occ.baseUrl +
      MockOccModuleConfig.backend.occ.prefix +
      MockOccModuleConfig.context.baseSite
    );
  }
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return endpoint;
  }
}

describe('OccSiteAdapter', () => {
  let occSiteAdapter: OccSiteAdapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSiteAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });
    occSiteAdapter = TestBed.inject(OccSiteAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converterService, 'pipeableMany').and.callThrough();
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load languages', () => {
    it('should retrieve two languages', () => {
      const languages: Occ.LanguageList = {
        languages: [{ isocode: 'en' }, { isocode: 'de' }],
      };

      occSiteAdapter.loadLanguages().subscribe((result) => {
        expect(result).toEqual(languages.languages);
      });

      const mockRequest: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'languages',
      });

      expect(mockRequest.cancelled).toBeFalsy();
      expect(mockRequest.request.responseType).toEqual('json');
      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('languages');
      mockRequest.flush(languages);
    });

    it('should use converter', () => {
      occSiteAdapter.loadLanguages().subscribe();
      httpMock.expectOne('languages').flush([]);
      expect(converterService.pipeableMany).toHaveBeenCalledWith(
        LANGUAGE_NORMALIZER
      );
    });
  });

  describe('load currencies', () => {
    it('should retrieve two currencies', () => {
      const currencies: Occ.CurrencyList = {
        currencies: [{ isocode: 'USD' }, { isocode: 'JPY' }],
      };

      occSiteAdapter.loadCurrencies().subscribe((result) => {
        expect(result).toEqual(currencies.currencies);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'currencies',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('currencies');
      mockReq.flush(currencies);
    });

    it('should use converter', () => {
      occSiteAdapter.loadCurrencies().subscribe();
      httpMock.expectOne('currencies').flush([]);
      expect(converterService.pipeableMany).toHaveBeenCalledWith(
        CURRENCY_NORMALIZER
      );
    });
  });

  describe('loadCountries', () => {
    it('should return delivery countries list', () => {
      const countryList: Occ.CountryList = {
        countries: [
          {
            isocode: 'AL',
            name: 'Albania',
          },
          {
            isocode: 'AD',
            name: 'Andorra',
          },
        ],
      };

      occSiteAdapter.loadCountries().subscribe((result) => {
        expect(result).toEqual(countryList.countries);
      });

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'countries'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(countryList);
    });

    it('should take type into account', () => {
      occSiteAdapter.loadCountries(CountryType.BILLING).subscribe();
      httpMock
        .expectOne((req) => req.method === 'GET' && req.url === 'countries')
        .flush({});
      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('countries', {
        queryParams: { type: CountryType.BILLING },
      });
    });

    it('should use converter', () => {
      occSiteAdapter.loadCountries().subscribe();
      httpMock.expectOne('countries').flush({});
      expect(converterService.pipeableMany).toHaveBeenCalledWith(
        COUNTRY_NORMALIZER
      );
    });
  });

  describe('loadRegions', () => {
    it('should return regions', () => {
      const countryIsoCode = 'CA';
      const regions: Occ.RegionList = {
        regions: [
          {
            isocode: 'CA-AB',
            name: 'Alberta',
          },
          {
            isocode: 'CA-BC',
            name: 'British Columbia',
          },
          {
            isocode: 'CA-MB',
            name: 'Manitoba',
          },
        ],
      };

      occSiteAdapter.loadRegions(countryIsoCode).subscribe((result) => {
        expect(result).toEqual(regions.regions);
      });

      const mockReq = httpMock.expectOne(
        (req) => req.method === 'GET' && req.url === 'regions'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('regions', {
        urlParams: { isoCode: countryIsoCode },
      });
      mockReq.flush(regions);
    });

    it('should use converter', () => {
      occSiteAdapter.loadRegions('CA').subscribe();
      httpMock.expectOne('regions').flush({});
      expect(converterService.pipeableMany).toHaveBeenCalledWith(
        REGION_NORMALIZER
      );
    });
  });

  describe('load the active base site data', () => {
    const baseSite1 = {
      uid: 'test-site',
      defaultPreviewCategoryCode: 'test category code',
      defaultPreviewProductCode: 'test product code',
    };
    const baseSite2 = {
      uid: 'some-other-site',
      defaultPreviewCategoryCode: 'test category code',
      defaultPreviewProductCode: 'test product code',
    };
    const siteList = [baseSite1, baseSite2];

    it('should retrieve the active base site', () => {
      occSiteAdapter.loadBaseSite().subscribe((result) => {
        expect(result).toEqual(baseSite1);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'baseSitesForConfig',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({ baseSites: siteList });
    });

    it('should retrieve the active base site based on siteUid', () => {
      occSiteAdapter.loadBaseSite('some-other-site').subscribe((result) => {
        expect(result).toEqual(baseSite2);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'baseSitesForConfig',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({ baseSites: siteList });
    });
  });

  describe('load all base sites data', () => {
    it('should retrieve all base sites', () => {
      const baseSites = [
        {
          uid: 'test-site',
          defaultPreviewCategoryCode: 'test category code',
          defaultPreviewProductCode: 'test product code',
        },
      ];

      occSiteAdapter.loadBaseSites().subscribe((result) => {
        expect(result).toEqual(baseSites);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'baseSitesForConfig',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith(
        'baseSitesForConfig',
        {},
        { baseSite: false }
      );
      mockReq.flush({ baseSites: baseSites });
    });
  });

  it('should use converter', () => {
    occSiteAdapter.loadBaseSites().subscribe();
    httpMock.expectOne('baseSitesForConfig').flush({});
    expect(converterService.pipeableMany).toHaveBeenCalledWith(
      BASE_SITE_NORMALIZER
    );
  });
});
