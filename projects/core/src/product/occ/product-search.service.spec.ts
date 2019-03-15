import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { SearchConfig } from '../model/search-config';
import {
  ProductSearchPage,
  SuggestionList
} from '../../occ/occ-models/occ.models';

import { OccProductSearchService } from './product-search.service';
import { OccProductConfig, defaultOccProductConfig } from './product-config';
import { DynamicTemplate } from '../../config/utils/dynamic-template';

const queryText = 'test';
const searchResults: ProductSearchPage = { products: [{ code: '123' }] };
const suggestions: SuggestionList = { suggestions: [{ value: 'test' }] };
const mockSearchConfig: SearchConfig = {
  pageSize: 5
};
const MockOccModuleConfig: OccProductConfig = {
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

describe('OccProductSearchService', () => {
  let service: OccProductSearchService;
  let httpMock: HttpTestingController;
  let dynamicTemplate: DynamicTemplate;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductSearchService,
        {
          provide: OccProductConfig,
          useValue: Object.assign(MockOccModuleConfig, defaultOccProductConfig)
        }
      ]
    });

    dynamicTemplate = TestBed.get(DynamicTemplate);
    service = TestBed.get(OccProductSearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      service.loadSearch(queryText, mockSearchConfig).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            `/${dynamicTemplate.resolve(
              defaultOccProductConfig.occProduct.productSearch,
              { query: queryText, searchConfig: mockSearchConfig }
            )}&pageSize=${mockSearchConfig.pageSize.toString()}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(searchResults);
    });
  });

  describe('query product suggestions', () => {
    it('should return suggestions for given term', () => {
      service
        .loadSuggestions(queryText, mockSearchConfig.pageSize)
        .subscribe(suggestionList => {
          expect(suggestionList).toEqual(suggestions);
        });

      const mockReq = httpMock.expectOne(req => {
        return (
          req.method === 'GET' &&
          req.url ===
            `/${dynamicTemplate.resolve(
              defaultOccProductConfig.occProduct.productSuggestions,
              { term: queryText, max: mockSearchConfig.pageSize }
            )}`
        );
      });

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(suggestions);
    });
  });
});
