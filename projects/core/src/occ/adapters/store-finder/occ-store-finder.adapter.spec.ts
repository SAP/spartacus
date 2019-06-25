import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Occ, OccConfig } from '../../index';
import { StoreFinderSearchConfig } from '../../../store-finder/model/search-config';
import { GeoPoint } from '../../../model/misc.model';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';
import { ConverterService } from '../../../util/converter.service';
import {
  POINT_OF_SERVICE_NORMALIZER,
  STORE_COUNT_NORMALIZER,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
} from '../../../store-finder/connectors';

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
  context = {
    parameters: {
      baseSite: { default: 'test-site' },
      language: { default: '' },
      currency: { default: '' },
    },
  };
}

describe('OccStoreFinderAdapter', () => {
  let adapter: OccStoreFinderAdapter;
  let converter: ConverterService;
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
    converter = TestBed.get(ConverterService);
    httpMock = TestBed.get(HttpTestingController);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('search', () => {
    describe('with text query', () => {
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

    describe('with longitudeLatitude', () => {
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

    it('should use converter', () => {
      adapter.search('', mockSearchConfig).subscribe();
      httpMock.expectOne({});
      expect(converter.pipeable).toHaveBeenCalledWith(
        STORE_FINDER_SEARCH_PAGE_NORMALIZER
      );
    });
  });

  describe('loadCounts', () => {
    it('should request stores count', () => {
      adapter.loadCounts().subscribe(result => {
        expect(result).toEqual([
          { count: 1, name: 'name1' },
          { count: 2, name: 'name2' },
        ]);
      });

      httpMock
        .expectOne({ method: 'GET', url: '/stores/storescounts' })
        .flush(storeCountResponseBody);
    });

    it('should use converter', () => {
      adapter.loadCounts().subscribe();
      httpMock.expectOne({});
      expect(converter.pipeableMany).toHaveBeenCalledWith(
        STORE_COUNT_NORMALIZER
      );
    });
  });

  describe('load', () => {
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

    it('should use converter', () => {
      adapter.load(storeId).subscribe();
      httpMock.expectOne({});
      expect(converter.pipeable).toHaveBeenCalledWith(
        POINT_OF_SERVICE_NORMALIZER
      );
    });
  });
});
