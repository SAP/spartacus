import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from '@angular/common/http/testing';
import { OccConfig } from '../../occ/config/occ-config';
import { Occ } from '../../occ/occ-models/occ.models';
import { OccSiteAdapter } from '@spartacus/core';

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

fdescribe('OccSiteAdapter', () => {
  let service: OccSiteAdapter;
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
  });
});
