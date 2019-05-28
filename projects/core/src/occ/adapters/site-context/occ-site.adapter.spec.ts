import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { OccConfig } from '../../config/occ-config';
import { Occ } from '../../occ-models/occ.models';
import {
  ConverterService,
  COUNTRY_NORMALIZER,
  OccSiteAdapter,
  REGION_NORMALIZER,
} from '@spartacus/core';
import {
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
} from '../../../site-context/connectors/converters';

const MockOccModuleConfig: OccConfig = {
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
        url: '/languages',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(languages);
    });

    it('should use converter', () => {
      service.loadLanguages().subscribe();
      httpMock.expectOne('/languages').flush([]);
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
        url: '/currencies',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(currencies);
    });

    it('should use converter', () => {
      service.loadCurrencies().subscribe();
      httpMock.expectOne('/currencies').flush([]);
      expect(converter.pipeableMany).toHaveBeenCalledWith(CURRENCY_NORMALIZER);
    });
  });

  describe('loadDeliveryCountries', () => {
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

      service.loadDeliveryCountries().subscribe(result => {
        expect(result).toEqual(countryList.countries);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === '/countries';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(countryList);
    });

    it('should use converter', () => {
      service.loadDeliveryCountries().subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'GET' && req.url === '/countries';
        })
        .flush({});
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

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === '/countries/CA/regions';
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(regions);
    });

    it('should use converter', () => {
      service.loadRegions('CA').subscribe();
      httpMock
        .expectOne(req => {
          return req.method === 'GET' && req.url === '/countries/CA/regions';
        })
        .flush({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(REGION_NORMALIZER);
    });
  });
});
