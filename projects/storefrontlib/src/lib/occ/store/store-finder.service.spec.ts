import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { OccStoreFinderService } from './store-finder.service';
import { ConfigService } from '../config.service';
import { SearchConfig } from '../../store-finder/search-config';

const queryText = 'test';
const searchResults = { stores: [{ name: 'test' }] };
const mockSearchConfig: SearchConfig = { pageSize: 5 };
const endpoint = '/stores';

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

describe('OccStoreFinderService', () => {
  let service: OccStoreFinderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccStoreFinderService,
        { provide: ConfigService, useClass: MockConfigService }
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
      service.findStores(queryText, mockSearchConfig).subscribe(result => {
        expect(result).toEqual(searchResults);
      });

      const mockReq = httpMock.expectOne(req => {
        return req.method === 'GET' && req.url === endpoint;
      });
      expect(mockReq.request.params.get('query')).toEqual(queryText);
      expect(mockReq.request.params.get('pageSize')).toEqual(
        mockSearchConfig.pageSize.toString()
      );
      expect(mockReq.request.params.get('fields')).toEqual(
        'stores(name,displayName,openingHours(weekDayOpeningList(FULL),specialDayOpeningList(FULL)),' +
          'geoPoint(latitude,longitude),address(line1,line2,town,region(FULL),postalCode,phone,country) ),' +
          'pagination(DEFAULT),' +
          'sorts(DEFAULT)'
      );

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(searchResults);
    });
  });
});
