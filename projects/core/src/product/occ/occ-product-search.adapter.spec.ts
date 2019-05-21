import { TestBed } from '@angular/core/testing';

import { OccProductSearchAdapter } from './occ-product-search.adapter';
import {
  ConverterService,
  PRODUCT_SEARCH_PAGE_NORMALIZER,
  PRODUCT_SUGGESTION_NORMALIZER,
} from '@spartacus/core';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OccEndpointsService } from '../../occ/services/occ-endpoints.service';
import { SearchConfig } from '../model/search-config';
import createSpy = jasmine.createSpy;
import { ProductSearchPage } from '../../model/product-search.model';
import { Occ } from '../../occ/occ-models/occ.models';

class MockOccEndpointsService {
  getUrl = createSpy('MockOccEndpointsService.getEndpoint').and.callFake(
    // tslint:disable-next-line:no-shadowed-variable
    (url, { term, query }) => url + (term || query)
  );
}

const queryText = 'test';
const searchResults: ProductSearchPage = { products: [{ code: '123' }] };
const suggestionList: Occ.SuggestionList = { suggestions: [{ value: 'test' }] };
const mockSearchConfig: SearchConfig = {
  pageSize: 5,
};

describe('OccProductSearchAdapter', () => {
  let service: OccProductSearchAdapter;
  let httpMock: HttpTestingController;
  let endpoints: OccEndpointsService;
  let converter: ConverterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductSearchAdapter,
        {
          provide: OccEndpointsService,
          useClass: MockOccEndpointsService,
        },
      ],
    });

    service = TestBed.get(OccProductSearchAdapter);
    endpoints = TestBed.get(OccEndpointsService);
    httpMock = TestBed.get(HttpTestingController);
    converter = TestBed.get(ConverterService);

    spyOn(converter, 'pipeable').and.callThrough();
    spyOn(converter, 'pipeableMany').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      service.search(queryText, mockSearchConfig).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === 'productSearchtest'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(endpoints.getUrl).toHaveBeenCalledWith(
        'productSearch',
        { query: queryText },
        {
          pageSize: mockSearchConfig.pageSize,
          currentPage: undefined,
          sort: undefined,
        }
      );
      mockReq.flush(searchResults);
    });

    it('should call converter', () => {
      service.search(queryText, mockSearchConfig).subscribe();
      httpMock.expectOne('productSearchtest').flush(searchResults);

      expect(converter.pipeable).toHaveBeenCalledWith(
        PRODUCT_SEARCH_PAGE_NORMALIZER
      );
    });
  });

  describe('query product suggestions', () => {
    it('should return suggestions for given term', () => {
      service
        .loadSuggestions(queryText, mockSearchConfig.pageSize)
        .subscribe(suggestions => {
          expect(suggestions).toEqual(suggestionList.suggestions);
        });

      const mockReq = httpMock.expectOne(
        req => req.method === 'GET' && req.url === 'productSuggestionstest'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      expect(endpoints.getUrl).toHaveBeenCalledWith('productSuggestions', {
        term: queryText,
        max: mockSearchConfig.pageSize.toString(),
      });
      mockReq.flush(suggestionList);
    });

    it('should call converter', () => {
      service.loadSuggestions(queryText, mockSearchConfig.pageSize).subscribe();
      httpMock.expectOne('productSuggestionstest').flush(suggestionList);

      expect(converter.pipeableMany).toHaveBeenCalledWith(
        PRODUCT_SUGGESTION_NORMALIZER
      );
    });
  });
});
