import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { GeoPoint } from '../../../model/misc.model';
import {
  POINT_OF_SERVICE_NORMALIZER,
  STORE_COUNT_NORMALIZER,
  STORE_FINDER_SEARCH_PAGE_NORMALIZER,
} from '../../../store-finder/connectors';
import { StoreFinderSearchConfig } from '../../../store-finder/model/search-config';
import { ConverterService } from '../../../util/converter.service';
import { Occ } from '../../index';
import { OccEndpointsService } from '../../services';
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

class MockOccEndpointsService {
  getUrl(endpoint: string, _urlParams?: object, _queryParams?: object) {
    return this.getEndpoint(endpoint);
  }
  getEndpoint(url: string) {
    return url;
  }
}

describe('OccStoreFinderAdapter', () => {
  let adapter: OccStoreFinderAdapter;
  let converter: ConverterService;
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

    adapter = TestBed.get(OccStoreFinderAdapter);
    converter = TestBed.get(ConverterService);
    httpMock = TestBed.get(HttpTestingController);
    occEndpointsService = TestBed.get(OccEndpointsService);
    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
    spyOn(occEndpointsService, 'getUrl').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('search', () => {
    describe('with text query', () => {
      it('should return search results for given query text', () => {
        adapter
          .search(queryText, mockSearchConfig)
          .subscribe()
          .unsubscribe();

        httpMock.expectOne({
          method: 'GET',
          url: 'stores',
        });

        expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
          'stores',
          undefined,
          { query: queryText, pageSize: mockSearchConfig.pageSize.toString() }
        );
      });
    });

    describe('with longitudeLatitude', () => {
      it('should return search results for given longitudeLatitude', () => {
        adapter
          .search('', mockSearchConfig, longitudeLatitude)
          .subscribe()
          .unsubscribe();

        httpMock.expectOne({
          method: 'GET',
          url: 'stores',
        });

        expect(occEndpointsService.getUrl).toHaveBeenCalledWith(
          'stores',
          undefined,
          {
            longitude: longitudeLatitude.longitude.toString(),
            latitude: longitudeLatitude.latitude.toString(),
            pageSize: mockSearchConfig.pageSize.toString(),
          }
        );
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
        .expectOne({ method: 'GET', url: 'storescounts' })
        .flush(storeCountResponseBody);

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('storescounts');
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
          url: 'store',
        })
        .flush(searchResults.stores[0]);

      expect(occEndpointsService.getUrl).toHaveBeenCalledWith('store', {
        storeId,
      });
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
