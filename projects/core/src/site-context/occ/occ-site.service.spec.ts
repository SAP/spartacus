import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  HttpClientTestingModule,
  TestRequest
} from '@angular/common/http/testing';
import { OccSiteService } from './occ-site.service';
import { OccConfig } from '../../occ/config/occ-config';
import { LanguageList, CurrencyList } from '../../occ/occ-models/occ.models';

const MockOccModuleConfig: OccConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  },

  site: {
    baseSite: '',
    language: '',
    currency: ''
  }
};

describe('OccSiteService', () => {
  let service: OccSiteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccSiteService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccSiteService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('load languages', () => {
    it('should retrieve two languages', () => {
      const languages: LanguageList = {
        languages: [{ isocode: 'en' }, { isocode: 'de' }]
      };

      service.loadLanguages().subscribe(result => {
        expect(result).toEqual(languages);
      });

      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: '/languages'
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(languages);
    });
  });

  describe('load currencies', () => {
    it('should retrieve two currencies', () => {
      const currencies: CurrencyList = {
        currencies: [{ isocode: 'USD' }, { isocode: 'JPY' }]
      };

      service.loadCurrencies().subscribe(result => {
        expect(result).toEqual(currencies);
      });
      const mockReq: TestRequest = httpMock.expectOne({
        method: 'GET',
        url: '/currencies'
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(currencies);
    });
  });
});
