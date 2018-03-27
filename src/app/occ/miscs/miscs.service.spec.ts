import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccMiscsService } from './miscs.service';
import { ConfigService } from '../config.service';

export class MockConfigService {
  server = {
    baseUrl: '',
    occPrefix: ''
  };

  site = {
    baseSite: '',
    language: '',
    currency: ''
  };
}

describe('OccMiscsService', () => {
  let service: OccMiscsService;
  let config: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccMiscsService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccMiscsService);
    httpMock = TestBed.get(HttpTestingController);
    config = TestBed.get(ConfigService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return delivery countries list', () => {
    const endpoint = 'deliverycountries';

    const countryList = {
      countries: [
        {
          isocode: 'AL',
          name: 'Albania'
        },
        {
          isocode: 'AD',
          name: 'Andorra'
        }
      ]
    };

    service.loadDeliveryCountries().subscribe(result => {
      expect(result).toEqual(countryList);
    });

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET' && req.url === '/' + endpoint;
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(countryList);
  });

  it('should return titles list', () => {
    const endpoint = 'titles';

    const titlesList = {
      titles: [
        {
          code: 'mr',
          name: 'Mr.'
        },
        {
          code: 'mrs',
          name: 'Mrs.'
        }
      ]
    };

    service.loadTitles().subscribe(result => {
      expect(result).toEqual(titlesList);
    });

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET' && req.url === '/' + endpoint;
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(titlesList);
  });
});
