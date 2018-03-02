import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccProductSearchService } from './product-search.service';
import { ConfigService } from '../config.service';

const queryText = 'test';
const pageSize = 5;
const searchResults = { products: [{ code: '123' }] };
const suggestions = ['test'];

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
const endpoint = '/products';

describe('OccProductSearchService', () => {
  let service: OccProductSearchService;
  let config: ConfigService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductSearchService,
        { provide: ConfigService, useClass: MockConfigService }
      ]
    });

    service = TestBed.get(OccProductSearchService);
    httpMock = TestBed.get(HttpTestingController);
    config = TestBed.get(ConfigService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('query text search', () => {
    it('should return search results for given query text', () => {
      service.query(queryText, pageSize).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/search';
      });
      expect(mockReq.request.params.get('query')).toEqual(queryText);
      expect(mockReq.request.params.get('pageSize')).toEqual(
        pageSize.toString()
      );
      expect(mockReq.request.params.get('fields')).toEqual(
        'products(code,name,summary,price(FULL),images(DEFAULT)),facets,breadcrumbs,pagination(DEFAULT)'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(searchResults);
    });
  });

  describe('query product suggestions', () => {
    it('should return suggestions for given term', () => {
      service.queryProductSuggestions(queryText, pageSize).subscribe(result => {
        expect(result).toEqual(suggestions);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint + '/suggestions';
      });
      expect(mockReq.request.params.get('term')).toEqual(queryText);
      expect(mockReq.request.params.get('max')).toEqual(pageSize.toString());

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(suggestions);
    });
  });
});
