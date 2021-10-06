import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OccStoreFinderAdapter } from './occ-store-finder.adapter';
import {
  BaseOccUrlProperties,
  ConverterService,
  DynamicAttributes,
  GeoPoint,
  Occ,
  OccEndpointsService,
  POINT_OF_SERVICE_NORMALIZER,
  SearchConfig,
} from '@spartacus/core';
import {
  STORE_COUNT_NORMALIZER,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
} from '@spartacus/storefinder/core';

const queryText = 'test';
const searchResults = { stores: [{ name: 'test' }] };
const mockSearchConfig: SearchConfig = { pageSize: 5 };
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

const mockRadius = 50000;

const storeId = 'test';

class MockOccEndpointsService {
  buildUrl(
    endpoint: string,
    _attributes?: DynamicAttributes,
    _propertiesToOmit?: BaseOccUrlProperties
  ) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccStoreFinderAdapter', () => {
  let occStoreFinderAdapter: OccStoreFinderAdapter;
  let converterService: ConverterService;
  let httpMock: HttpTestingController;
  let occEndpointsService: OccEndpointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderAdapter,
        { provide: OccEndpointsService, useClass: MockOccEndpointsService },
      ],
    });

    occStoreFinderAdapter = TestBed.inject(OccStoreFinderAdapter);
    httpMock = TestBed.inject(HttpTestingController);
    converterService = TestBed.inject(ConverterService);
    occEndpointsService = TestBed.inject(OccEndpointsService);
    spyOn(converterService, 'pipeable').and.callThrough();
    spyOn(converterService, 'pipeableMany').and.callThrough();
    spyOn(occEndpointsService, 'buildUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('search', () => {
    describe('with text query', () => {
      it('should return search results for given query text', () => {
        occStoreFinderAdapter
          .search(queryText, mockSearchConfig)
          .subscribe()
          .unsubscribe();

        httpMock.expectOne({
          method: 'GET',
          url: 'stores',
        });

        expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('stores', {
          queryParams: {
            query: queryText,
            pageSize: mockSearchConfig.pageSize.toString(),
          },
        });
      });
    });

    describe('with longitudeLatitude', () => {
      it('should return search results for given longitudeLatitude', () => {
        occStoreFinderAdapter
          .search('', mockSearchConfig, longitudeLatitude, mockRadius)
          .subscribe()
          .unsubscribe();

        httpMock.expectOne({
          method: 'GET',
          url: 'stores',
        });

        expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('stores', {
          queryParams: {
            longitude: longitudeLatitude.longitude.toString(),
            latitude: longitudeLatitude.latitude.toString(),
            radius: mockRadius.toString(),
            pageSize: mockSearchConfig.pageSize.toString(),
          },
        });
      });
    });

    it('should use converter', () => {
      occStoreFinderAdapter.search('', mockSearchConfig).subscribe();
      httpMock.expectOne({});
      expect(converterService.pipeable).toHaveBeenCalledWith(
        STORE_FINDER_SEARCH_PAGE_NORMALIZER
      );
    });
  });

  describe('loadCounts', () => {
    it('should request stores count', () => {
      occStoreFinderAdapter.loadCounts().subscribe((result) => {
        expect(result).toEqual([
          { count: 1, name: 'name1' },
          { count: 2, name: 'name2' },
        ]);
      });

      httpMock
        .expectOne({ method: 'GET', url: 'storescounts' })
        .flush(storeCountResponseBody);

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('storescounts');
    });

    it('should use converter', () => {
      occStoreFinderAdapter.loadCounts().subscribe();
      httpMock.expectOne({});
      expect(converterService.pipeableMany).toHaveBeenCalledWith(
        STORE_COUNT_NORMALIZER
      );
    });
  });

  describe('load', () => {
    it('should request stores by store id', () => {
      occStoreFinderAdapter.load(storeId).subscribe((result) => {
        expect(result).toEqual(searchResults.stores[0]);
      });

      httpMock
        .expectOne({
          method: 'GET',
          url: 'store',
        })
        .flush(searchResults.stores[0]);

      expect(occEndpointsService.buildUrl).toHaveBeenCalledWith('store', {
        urlParams: { storeId },
      });
    });

    it('should use converter', () => {
      occStoreFinderAdapter.load(storeId).subscribe();
      httpMock.expectOne({});
      expect(converterService.pipeable).toHaveBeenCalledWith(
        POINT_OF_SERVICE_NORMALIZER
      );
    });
  });
});
