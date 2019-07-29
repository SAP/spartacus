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
import { OccEndpointsService } from '../../services';

const MockOccModuleConfig: OccConfig = {
  backend: {
    occ: {
      baseUrl: 'base-url',
      prefix: '/rest/v2/',
    },
  },

  context: {
    baseSite: ['test-site'],
  },
};

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
  getBaseEndpoint() {
    return (
      MockOccModuleConfig.backend.occ.baseUrl +
      MockOccModuleConfig.backend.occ.prefix +
      MockOccModuleConfig.context.baseSite
    );
  }
}

describe('OccSiteAdapter', () => {
  let service: OccSiteAdapter;
  let converter: ConverterService;
  let httpMock: HttpTestingController;
  let occEnpointsService: OccEndpointsService;

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

    service = TestBed.get(OccSiteAdapter);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);
    occEnpointsService = TestBed.get(OccEndpointsService);
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(occEnpointsService, 'getUrl').and.callThrough();
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
        url: 'languages',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('languages');
      mockReq.flush(languages);
    });

    it('should use converter', () => {
      service.loadLanguages().subscribe();
      httpMock.expectOne('languages').flush([]);
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
        url: 'currencies',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('currencies');
      mockReq.flush(currencies);
    });

    it('should use converter', () => {
      service.loadCurrencies().subscribe();
      httpMock.expectOne('currencies').flush([]);
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
        req => req.method === 'GET' && req.url === 'countries'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(countryList);
    });

    it('should take type into account', () => {
      service.loadCountries(CountryType.BILLING).subscribe();
      httpMock
        .expectOne(req => req.method === 'GET' && req.url === 'countries')
        .flush({});
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith(
        'countries',
        undefined,
        { type: CountryType.BILLING }
      );
    });

    it('should use converter', () => {
      service.loadCountries().subscribe();
      httpMock.expectOne('countries').flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(COUNTRY_NORMALIZER);
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

      service.loadRegions(countryIsoCode).subscribe(result => {
        expect(result).toEqual(regions.regions);
      });

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === 'regions'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(occEnpointsService.getUrl).toHaveBeenCalledWith('regions', {
        isoCode: countryIsoCode,
      });
      mockReq.flush(regions);
    });

    it('should use converter', () => {
      service.loadRegions('CA').subscribe();
      httpMock.expectOne('regions').flush({});
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
