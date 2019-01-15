import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccStoreFinderService } from './store-finder.service';
import { OccConfig } from '@spartacus/core';
import { StoreFinderSearchConfig } from '../model/search-config';
import { LongitudeLatitude } from '../model/longitude-latitude';

const queryText = 'test';
const searchResults = { stores: [{ name: 'test' }] };
const mockSearchConfig: StoreFinderSearchConfig = { pageSize: 5 };
const longitudeLatitude: LongitudeLatitude = {
  longitude: 10.1,
  latitude: 20.2
};

const storeCountResponseBody = { CA: 50 };

const countryIsoCode = 'CA';
const regionIsoCode = 'CA-QC';
const storeId = 'test';

export class MockOccModuleConfig {
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

describe('OccStoreFinderService', () => {
  let service: OccStoreFinderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderService,
        { provide: OccConfig, useClass: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccStoreFinderService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      service
        .findStores(queryText, mockSearchConfig)
        .toPromise()
        .then(result => {
          expect(result).toEqual(searchResults);
        });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url:
          '/stores?fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL))' +
          ',geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email),%20features)' +
          ',pagination(DEFAULT),sorts(DEFAULT)&query=test&pageSize=5'
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });

  describe('longitudeLatitude search', () => {
    it('should return search results for given longitudeLatitude', () => {
      service
        .findStores('', mockSearchConfig, longitudeLatitude)
        .toPromise()
        .then(result => {
          expect(result).toEqual(searchResults);
        });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url:
          '/stores?fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL))' +
          ',geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email),%20features)' +
          ',pagination(DEFAULT),sorts(DEFAULT)&longitude=10.1&latitude=20.2&pageSize=5'
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });

  it('should request stores count', () => {
    service.storesCount().subscribe(result => {
      expect(result).toEqual(storeCountResponseBody);
    });

    httpMock
      .expectOne({ method: 'GET', url: '/stores/count' })
      .flush(storeCountResponseBody);
  });

  describe('query by store id', () => {
    it('should request stores by store id', () => {
      service.findStoreById(storeId).subscribe(result => {
        expect(result).toEqual(searchResults.stores[0]);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: '/stores/' + storeId + '?fields=FULL'
        })
        .flush(searchResults.stores[0]);
    });
  });

  describe('query by country', () => {
    it('should request stores by country', () => {
      service.findStoresByCountry(countryIsoCode).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      httpMock
        .expectOne({ method: 'GET', url: '/stores/country/' + countryIsoCode })
        .flush(searchResults);
    });
  });

  describe('query by region', () => {
    it('should request stores by region', () => {
      service
        .findStoresByRegion(countryIsoCode, regionIsoCode)
        .subscribe(result => {
          expect(result).toEqual(searchResults);
        });

      httpMock
        .expectOne({
          method: 'GET',
          url: '/stores/country/' + countryIsoCode + '/region/' + regionIsoCode
        })
        .flush(searchResults);
    });
  });
});
