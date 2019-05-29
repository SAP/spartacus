import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { OccConfig } from '../../config/occ-config';
import { Occ } from '../../occ-models/occ.models';
import { ConverterService, OccSiteAdapter } from '@spartacus/core';
import {
  CURRENCY_NORMALIZER,
  LANGUAGE_NORMALIZER,
} from '../../../site-context/connectors/converters';

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
