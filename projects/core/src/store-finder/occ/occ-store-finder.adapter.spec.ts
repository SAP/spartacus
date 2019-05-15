import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { OccConfig, Occ } from '../../occ';
import { StoreFinderSearchConfig } from '../model/search-config';
import { GeoPoint } from '../../model/misc.model';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';

const queryText = 'test';
const searchResults = { stores: [{ name: 'test' }] };
const mockSearchConfig: StoreFinderSearchConfig = { pageSize: 5 };
const longitudeLatitude: GeoPoint = {
  longitude: 10.1,
  latitude: 20.2,
};

const storeCountResponseBody: Occ.StoreCountList = {
  countriesAndRegionsStoreCount: [
    { count: 1, name: 'name1' },
    { count: 2, name: 'name2' },
  ],
};

const storeId = 'test';

export class MockOccModuleConfig {
  server = {
    baseUrl: '',
    occPrefix: '',
  };
  site = {
    baseSite: '',
    language: '',
    currency: '',
  };
}

describe('OccStoreFinderAdapter', () => {
  let adapter: OccStoreFinderAdapter;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderAdapter,
        { provide: OccConfig, useClass: MockOccModuleConfig },
      ],
    });

    adapter = TestBed.get(OccStoreFinderAdapter);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      adapter
        .search(queryText, mockSearchConfig)
        .toPromise()
        .then(result => {
          expect(result).toEqual(searchResults);
        });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url:
          '/stores?fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL))' +
          ',geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email),%20features)' +
          ',pagination(DEFAULT),sorts(DEFAULT)&query=test&pageSize=5',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });

  describe('longitudeLatitude search', () => {
    it('should return search results for given longitudeLatitude', () => {
      adapter
        .search('', mockSearchConfig, longitudeLatitude)
        .toPromise()
        .then(result => {
          expect(result).toEqual(searchResults);
        });

      const mockReq = httpMock.expectOne({
        method: 'GET',
        url:
          '/stores?fields=stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL))' +
          ',geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country,email),%20features)' +
          ',pagination(DEFAULT),sorts(DEFAULT)&longitude=10.1&latitude=20.2&pageSize=5',
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
    });
  });

  it('should request stores count', () => {
    adapter.loadCount().subscribe(result => {
      expect(result).toEqual([
        { count: 1, name: 'name1' },
        { count: 2, name: 'name2' },
      ]);
    });

    httpMock
      .expectOne({ method: 'GET', url: '/stores/storescounts' })
      .flush(storeCountResponseBody);
  });

  describe('query by store id', () => {
    it('should request stores by store id', () => {
      adapter.load(storeId).subscribe(result => {
        expect(result).toEqual(searchResults.stores[0]);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: '/stores/' + storeId + '?fields=FULL',
        })
        .flush(searchResults.stores[0]);
    });
  });
});
