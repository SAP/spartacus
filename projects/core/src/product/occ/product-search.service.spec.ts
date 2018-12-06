import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { SearchConfig } from '../model/search-config';
import { OccConfig } from '../../occ/config/occ-config';
import { OccProductSearchService } from './product-search.service';

const queryText = 'test';
const searchResults = { products: [{ code: '123' }] };
const suggestions = ['test'];
const mockSearchConfig: SearchConfig = {
  pageSize: 5
};
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
const endpoint = '/products';

describe('OccProductSearchService', () => {
  let service: OccProductSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductSearchService,
        { provide: OccConfig, useValue: MockOccModuleConfig }
      ]
    });

    service = TestBed.get(OccProductSearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      service.query(queryText, mockSearchConfig).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/search';
      });
      expect(mockReq.request.params.get('query')).toEqual(queryText);
      expect(mockReq.request.params.get('pageSize')).toEqual(
        mockSearchConfig.pageSize.toString()
      );
      expect(mockReq.request.params.get('fields')).toEqual(
        'products(code,name,summary,price(FULL),images(DEFAULT),stock(FULL)' +
          ',averageRating),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT)'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(searchResults);
    });
  });

  describe('query product suggestions', () => {
    it('should return suggestions for given term', () => {
      service
        .queryProductSuggestions(queryText, mockSearchConfig.pageSize)
        .subscribe(result => {
          expect(result).toEqual(suggestions);
        });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/suggestions';
      });
      expect(mockReq.request.params.get('term')).toEqual(queryText);
      expect(mockReq.request.params.get('max')).toEqual(
        mockSearchConfig.pageSize.toString()
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(suggestions);
    });
  });
});
