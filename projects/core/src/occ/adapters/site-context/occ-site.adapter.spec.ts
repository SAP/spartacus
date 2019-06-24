import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ConverterService,
  CountryType,
  COUNTRY_NORMALIZER,
  OccSiteAdapter,
  REGION_NORMALIZER,
} from '@spartacus/core';
import {
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
} from '../../../site-context/connectors/converters';
import { OccConfig } from '../../config/occ-config';
import { Occ } from '../../occ-models/occ.models';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'base-url',
      prefix: '/rest/v2/',
    },
  },

  site: {
    baseSite: 'test-site',
    language: '',
    currency: '',
  },
};

describe('OccSiteAdapter', () => {
  let service: OccSiteAdapter;
  let converter: ConverterService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSiteAdapter,
        { provide: OccConfig, useValue: MockOccModuleConfig },
      ],
    });

    service = TestBed.get(OccSiteAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load languages', () => {
    it('should retrieve two languages', () => {
      const languages: Occ.LanguageList = {
        languages: [{ isocode: 'en' }, { isocode: 'de' }],
      };

      service.loadLanguages().subscribe(result => {
        expect(result).toEqual(languages.languages);
      });

      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'base-url/rest/v2/test-site/languages',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(languages);
    });

    it('should use converter', () => {
      service.loadLanguages().subscribe();
      httpMock.expectOne('base-url/rest/v2/test-site/languages').flush([]);
      expect(converter.pipeableMany).toHaveBeenCalledWith(LANGUAGE_NORMALIZER);
    });
  });

  describe('load currencies', () => {
    it('should retrieve two currencies', () => {
      const currencies: Occ.CurrencyList = {
        currencies: [{ isocode: 'USD' }, { isocode: 'JPY' }],
      };

      service.loadCurrencies().subscribe(result => {
        expect(result).toEqual(currencies.currencies);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'base-url/rest/v2/test-site/currencies',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(currencies);
    });

    it('should use converter', () => {
      service.loadCurrencies().subscribe();
      httpMock.expectOne('base-url/rest/v2/test-site/currencies').flush([]);
      expect(converter.pipeableMany).toHaveBeenCalledWith(CURRENCY_NORMALIZER);
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

      service.loadCountries().subscribe(result => {
        expect(result).toEqual(countryList.countries);
      });

      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'GET' &&
          req.url === 'base-url/rest/v2/test-site/countries'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(countryList);
    });

    it('should take type into account', () => {
      service.loadCountries(CountryType.BILLING).subscribe();
      httpMock
        .expectOne(
          req =>
            req.method === 'GET' &&
            req.url === 'base-url/rest/v2/test-site/countries' &&
            req.params.get('type') === CountryType.BILLING
        )
        .flush({});
    });

    it('should use converter', () => {
      service.loadCountries().subscribe();
      httpMock.expectOne('base-url/rest/v2/test-site/countries').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(COUNTRY_NORMALIZER);
    });
  });

  describe('loadRegions', () => {
    it('should return regions', () => {
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

      service.loadRegions('CA').subscribe(result => {
        expect(result).toEqual(regions.regions);
      });

      const mockReq = httpMock.expectOne(
        req =>
          req.method === 'GET' &&
          req.url ===
            'base-url/rest/v2/test-site/countries/CA/regions?fields=regions(name,isocode,isocodeShort)'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(regions);
    });

    it('should use converter', () => {
      service.loadRegions('CA').subscribe();
      httpMock
        .expectOne(
          'base-url/rest/v2/test-site/countries/CA/regions?fields=regions(name,isocode,isocodeShort)'
        )
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(REGION_NORMALIZER);
    });
  });

  describe('load the active base site data', () => {
    it('should retrieve the active base site', () => {
      const baseSite = {
        uid: 'test-site',
        defaultPreviewCategoryCode: 'test category code',
        defaultPreviewProductCode: 'test product code',
      };

      service.loadBaseSite().subscribe(result => {
        expect(result).toEqual(baseSite);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: 'base-url/rest/v2/basesites?fields=FULL',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({ baseSites: [baseSite] });
    });
  });
});
