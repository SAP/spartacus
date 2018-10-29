import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccMiscsService } from './miscs.service';
import { OccConfig } from '@spartacus/core';

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

describe('OccMiscsService', () => {
  let service: OccMiscsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccMiscsService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccMiscsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return delivery countries list', () => {
    const endpoint = 'countries';

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

  it('should return cardTypes', () => {
    const endpoint = 'cardtypes';

    const cardTypesList = {
      cardTypes: [
        {
          code: 'amex',
          name: 'American Express'
        },
        {
          isocode: 'maestro',
          name: 'Maestro'
        }
      ]
    };

    service.loadCardTypes().subscribe(result => {
      expect(result).toEqual(cardTypesList);
    });

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET' && req.url === '/' + endpoint;
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(cardTypesList);
  });

  it('should return regions', () => {
    const endpoint = 'countries/CA/regions';

    const regions = {
      regions: [
        {
          isocode: 'CA-AB',
          name: 'Alberta'
        },
        {
          isocode: 'CA-BC',
          name: 'British Columbia'
        },
        {
          isocode: 'CA-MB',
          name: 'Manitoba'
        }
      ]
    };

    service.loadRegions('CA').subscribe(result => {
      expect(result).toEqual(regions);
    });

    const mockReq = httpMock.expectOne(req => {
      return req.method === 'GET' && req.url === '/' + endpoint;
    });

    expect(mockReq.cancelled).toBeFalsy();
    expect(mockReq.request.responseType).toEqual('json');
    mockReq.flush(regions);
  });
});
